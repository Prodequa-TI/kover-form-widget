import * as React from 'react';
import { forwardRef, useState, useEffect, useRef } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@/components/ui/input-group';

export type CurrencyCode = 'PEN' | 'USD' | 'RD' | 'EUR' | 'MXN';

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
    PEN: 'S/',
    USD: '$',
    RD: 'RD$',
    EUR: '€',
    MXN: 'MX$',
};

export interface CurrencyInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    /** Currency code for the prefix */
    currency?: CurrencyCode;
    /** Custom currency symbol (overrides currency code) */
    customSymbol?: string;
    /** Thousands separator character */
    thousandsSeparator?: ',' | '.' | ' ';
    /** Decimal separator character */
    decimalSeparator?: ',' | '.';
    /** Number of decimal places */
    decimalPlaces?: number;
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Current value (numeric) */
    value?: number | string;
    /** Callback when value changes */
    onChange?: (value: number | undefined) => void;
    /** Show error state */
    'aria-invalid'?: boolean;
}

function formatNumber(
    value: number,
    thousandsSeparator: string,
    decimalSeparator: string,
    decimalPlaces: number
): string {
    const [intPart, decPart] = value.toFixed(decimalPlaces).split('.');
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    return decimalPlaces > 0 ? `${formattedInt}${decimalSeparator}${decPart}` : formattedInt;
}

function parseNumber(
    value: string,
    thousandsSeparator: string,
    decimalSeparator: string
): number | undefined {
    if (!value || value.trim() === '') return undefined;

    const cleanValue = value
        .replace(new RegExp(`\\${thousandsSeparator}`, 'g'), '')
        .replace(decimalSeparator, '.');

    const parsed = Number.parseFloat(cleanValue);
    return Number.isNaN(parsed) ? undefined : parsed;
}

function formatWhileTyping(
    value: string,
    thousandsSeparator: string,
    decimalSeparator: string
): string {
    if (!value) return '';

    const parts = value.split(decimalSeparator);
    const intPart = parts[0] || '';
    const decPart = parts[1];

    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    if (decPart !== undefined) {
        return `${formattedInt}${decimalSeparator}${decPart}`;
    }
    return formattedInt;
}

function toFormattedString(
    val: number | string | undefined,
    thousandsSeparator: string,
    decimalSeparator: string,
    decimalPlaces: number
): string {
    if (val === undefined || val === '' || val === null) return '';
    const numVal = typeof val === 'string' ? Number.parseFloat(val) : val;
    if (Number.isNaN(numVal)) return '';
    return formatNumber(numVal, thousandsSeparator, decimalSeparator, decimalPlaces);
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
    (
        {
            currency = 'USD',
            customSymbol,
            thousandsSeparator = ',',
            decimalSeparator = '.',
            decimalPlaces = 2,
            min,
            max,
            value,
            onChange,
            placeholder = '0.00',
            className,
            'aria-invalid': ariaInvalid,
            onBlur,
            ...rest
        },
        ref
    ) => {
        const symbol = customSymbol ?? CURRENCY_SYMBOLS[currency];
        const inputRef = useRef<HTMLInputElement>(null);
        const isFocusedRef = useRef(false);

        React.useImperativeHandle(ref, () => inputRef.current!);

        const getFormatted = (val: number | string | undefined) =>
            toFormattedString(val, thousandsSeparator, decimalSeparator, decimalPlaces);

        // Don't show formatted value if it's 0 (initial/empty state)
        const getInitialDisplay = (val: number | string | undefined) => {
            if (val === 0 || val === '0') return '';
            return getFormatted(val);
        };

        const [displayValue, setDisplayValue] = useState(() => getInitialDisplay(value));

        // Sync when external value changes (only when not focused)
        useEffect(() => {
            if (!isFocusedRef.current) {
                // Don't update to "0.00" if value is 0 (treat as empty)
                if (value === 0 || value === '0') {
                    setDisplayValue('');
                } else {
                    setDisplayValue(getFormatted(value));
                }
            }
        }, [value, thousandsSeparator, decimalSeparator, decimalPlaces]);

        const handleFocus = () => {
            isFocusedRef.current = true;
            // Clear if: no value, value is 0, value equals min, or displayValue is empty/min
            const currentValue = typeof value === 'string' ? Number.parseFloat(value) : value;
            const minFormatted = min !== undefined ? getFormatted(min) : '';

            if (
                currentValue === undefined ||
                currentValue === 0 ||
                currentValue === min ||
                displayValue === '' ||
                displayValue === minFormatted ||
                displayValue === getFormatted(0)
            ) {
                setDisplayValue('');
            }
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawInput = e.target.value;

            const cleanInput = rawInput
                .replace(new RegExp(`[^0-9\\${decimalSeparator}]`, 'g'), '')
                .replace(new RegExp(`\\${decimalSeparator}`, 'g'), (_match: string, offset: number, str: string) => {
                    return str.indexOf(decimalSeparator) === offset ? decimalSeparator : '';
                });

            const parts = cleanInput.split(decimalSeparator);
            let limitedInput = parts[0];
            if (parts[1] !== undefined) {
                limitedInput += decimalSeparator + parts[1].slice(0, decimalPlaces);
            }

            const formatted = formatWhileTyping(limitedInput, thousandsSeparator, decimalSeparator);
            setDisplayValue(formatted);

            const numericValue = parseNumber(limitedInput, thousandsSeparator, decimalSeparator);
            onChange?.(numericValue);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            isFocusedRef.current = false;
            const parsedValue = parseNumber(displayValue, thousandsSeparator, decimalSeparator);

            // If empty or invalid, use minimum value (or 0 if no min)
            let numericValue: number = parsedValue ?? min ?? 0;

            // Apply min/max constraints
            if (min !== undefined && numericValue < min) {
                numericValue = min;
            }
            if (max !== undefined && numericValue > max) {
                numericValue = max;
            }

            const formatted = formatNumber(
                numericValue,
                thousandsSeparator,
                decimalSeparator,
                decimalPlaces
            );
            setDisplayValue(formatted);
            onChange?.(numericValue);

            onBlur?.(e);
        };

        return (
            <InputGroup className={className} aria-invalid={ariaInvalid}>
                <InputGroupAddon align='inline-start'>
                    <InputGroupText>{symbol}</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                    ref={inputRef}
                    type='text'
                    inputMode='decimal'
                    placeholder={placeholder}
                    value={displayValue}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-invalid={ariaInvalid}
                    {...rest}
                />
            </InputGroup>
        );
    }
);

CurrencyInput.displayName = 'CurrencyInput';
