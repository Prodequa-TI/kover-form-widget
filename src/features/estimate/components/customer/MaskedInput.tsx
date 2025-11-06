import { Input } from '@/components/ui/input';
import { MaskInput } from 'maska';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type MaskedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    mask: string | string[];
    value?: string | number;
    onChange?: (value: string) => void;
    saveUnmasked?: boolean;
};

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
    ({ mask, onChange, value, saveUnmasked , ...rest }, forwardedRef) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const maskInstanceRef = useRef<MaskInput | null>(null);

        useImperativeHandle(forwardedRef, () => inputRef.current!);

        useEffect(() => {
            if (!inputRef.current) return;

             maskInstanceRef.current = new MaskInput(inputRef.current, {
                mask,
                onMaska: (detail) => {
                    if (onChange && inputRef.current) {
                        // ✅ Si saveUnmasked es true, guardar sin formato
                        const valueToSave = saveUnmasked 
                            ? detail.unmasked // "8095551234"
                            : detail.masked;  // "(809)-555-1234"
                        
                        onChange(valueToSave);
                    }
                },
            });

            return () => maskInstanceRef.current?.destroy();
        }, [mask, onChange, saveUnmasked]);

        useEffect(() => {
            if (!inputRef.current) return;
            const next = value ?? '';
            if (inputRef.current.value !== String(next)) {
                inputRef.current.value = String(next);
            }
        }, [value]);

        return (
            <Input
                ref={inputRef}
                value={value ?? ''} 
                onChange={onChange}
                {...rest}
            />
        );
    }
);

MaskedInput.displayName = 'MaskedInput';
