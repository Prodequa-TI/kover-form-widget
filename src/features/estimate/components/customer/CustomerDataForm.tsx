import { Input } from '@/components/ui/input';
import { Documents } from '../../type/types';
import { PersonalPassportForm } from './PersonalPassportForm';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { useCallback, useEffect, useState } from 'react';
import { MaskedInput } from './MaskedInput';
import { fetchPersonDataByCedula } from '../../services/document.service';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

interface CustomDataFormProps {
    form: UseFormReturn<EstimateFormData>;
    onCedulaVerified?: (verified: boolean) => void;
}

export const CustomerDataForm = ({
    form,
    onCedulaVerified,
}: CustomDataFormProps) => {
    const [isLoadingCedula, setIsLoadingCedula] = useState(false);
    const [cedulaFound, setCedulaFound] = useState(false);
    const [cedulaError, setCedulaError] = useState(false);

    const documentType = form.watch('customer.documentType');
    const documentNumber = form.watch('customer.documentNumber');
    const isPassport = documentType === Documents.PASSPORT;
    const isCedula = documentType === Documents.ID;

    const handleChangeDocumentType = useCallback(
        (value: string, fieldOnChange: (v: number | undefined) => void) => {
            const numValue = value === ' ' ? undefined : Number(value);
            fieldOnChange(numValue);
            form.setValue('customer.documentNumber', '');
            form.clearErrors('customer.documentNumber');
            setCedulaFound(false);
            setCedulaError(false);
            onCedulaVerified?.(false);
            if (numValue !== Documents.ID) {
                form.setValue('customer.firstName', '');
                form.setValue('customer.lastname', '');
                form.setValue('customer.birthDate', '');
                form.setValue('customer.gender', undefined);
                form.clearErrors([
                    'customer.firstName',
                    'customer.lastname',
                    'customer.birthDate',
                    'customer.gender',
                ]);
            }
        },
        [form, onCedulaVerified]
    );

    useEffect(() => {
        const autoFillCedula = async () => {
            if (!isCedula || !documentNumber) return;

            const cleanNumber = documentNumber.replace(/\D/g, '');
            // Solo buscar cuando no tenga 11 dígitos completos
            if (cleanNumber.length !== 11) {
                setIsLoadingCedula(false);
                setCedulaFound(false);
                setCedulaError(false);
                return;
            }

            setIsLoadingCedula(true);
            setCedulaFound(false);
            setCedulaError(false);
            try {
                const personData = await fetchPersonDataByCedula(cleanNumber);

                if (personData) {
                    form.setValue('customer.firstName', personData.firstName);
                    form.setValue('customer.lastname', personData.lastName);
                    form.setValue('customer.birthDate', personData.birthDate);
                    form.setValue(
                        'customer.gender',
                        personData.gender === 'M' ? 1 : 2
                    );
                    setCedulaFound(true);
                    setCedulaError(false);
                    onCedulaVerified?.(true);
                }
            } catch (error) {
                console.error('Error consultando cédula:', error);
                form.setValue('customer.firstName', '');
                form.setValue('customer.lastname', '');
                form.setValue('customer.birthDate', '');
                form.setValue('customer.gender', undefined);
                setCedulaFound(false);
                setCedulaError(true);
                onCedulaVerified?.(false);
                form.setError('customer.documentNumber', {
                    type: 'manual',
                    message:
                        'No se encontró información para la cédula ingresada.',
                });
            } finally {
                setIsLoadingCedula(false);
            }
        };

        autoFillCedula();
    }, [documentNumber, isCedula, form, onCedulaVerified]);

    return (
        <>
            <div className='flex flex-col gap-4 md:grid md:grid-cols-2'>
                <Controller
                    control={form.control}
                    name='customer.email'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.email'>
                                Correo electrónico
                            </FieldLabel>
                            <Input
                                type='text'
                                id={field.name}
                                placeholder='hola@unit.com.do'
                                className='  bg-[#F8FAFC]'
                                {...field}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='customer.phone'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.phone'>
                                Teléfono / WhatsApp
                            </FieldLabel>
                            <MaskedInput
                                mask='(###)-###-####'
                                id={field.name}
                                placeholder='(809) - ___ - ____'
                                className=' bg-[#F8FAFC]'
                                aria-invalid={fieldState.invalid}
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value)}
                                saveUnmasked={true}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name='customer.documentType'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Documento</FieldLabel>
                            <Select
                                name={field.name}
                                value={
                                    field.value !== undefined
                                        ? String(field.value)
                                        : ''
                                }
                                onValueChange={(value) =>
                                    handleChangeDocumentType(
                                        value,
                                        field.onChange
                                    )
                                }>
                                <SelectTrigger
                                    id='customer.documentType'
                                    aria-invalid={fieldState.invalid}
                                    className='select-none'>
                                    <SelectValue placeholder='Tipo de documento' />
                                </SelectTrigger>
                                <SelectContent className='bg-popover z-50'>
                                    <SelectItem value={Documents.ID.toString()}>
                                        Cedula de identidad
                                    </SelectItem>
                                    <SelectItem
                                        value={Documents.PASSPORT.toString()}>
                                        Pasaporte
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='customer.documentNumber'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.documentNumber'>
                                Número de documento
                            </FieldLabel>
                            <div className='relative'>
                                <MaskedInput
                                    mask={
                                        documentType === Documents.ID
                                            ? '###-#######-#'
                                            : ''
                                    }
                                    id={field.name}
                                    value={field.value || ''}
                                    onChange={(value) => field.onChange(value)}
                                    placeholder={
                                        documentType === Documents.ID
                                            ? '000-0000000-0'
                                            : documentType ===
                                              Documents.PASSPORT
                                            ? 'A12345678'
                                            : ''
                                    }
                                    className='bg-[#F8FAFC] pr-10 flex items-center'
                                    aria-invalid={fieldState.invalid}
                                    disabled={!documentType}
                                />

                                {isLoadingCedula && (
                                    <div className='absolute right-3 top-1/3 -translate-y-1/2'>
                                        <Loader2 className='h-4 w-4 animate-spin text-blue-500' />
                                    </div>
                                )}
                                {cedulaFound && !isLoadingCedula && (
                                    <div className='absolute right-3 top-1/3 -translate-y-1/2'>
                                        <CheckCircle2 className='h-4 w-4 text-green-500' />
                                    </div>
                                )}
                                {cedulaError && !isLoadingCedula && (
                                    <div className='absolute right-3 top-1/3 -translate-y-1/2'>
                                        <XCircle className='h-4 w-4 text-red-500' />
                                    </div>
                                )}
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
            {isPassport && <PersonalPassportForm form={form} />}
        </>
    );
};
