import { Input } from '@/components/ui/input';
import { Controller, type UseFormReturn } from 'react-hook-form';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Gender } from '../../type/types';
import type { EstimateFormData } from '../../config/EstimeFormConfig';

type PersonalPassportFormProps = {
    form: UseFormReturn<EstimateFormData>;
};

export const PersonalPassportForm = ({ form }: PersonalPassportFormProps) => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Controller
                    control={form.control}
                    name='customer.firstName'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.firstName'>
                                Nombres
                            </FieldLabel>
                            <Input
                                id='customer.firstName'
                                placeholder='John'
                                {...field}
                                aria-invalid={fieldState.invalid}
                                className='transition-all bg-[#F8FAFC]'
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name='customer.lastname'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.lastName'>
                                Apellidos
                            </FieldLabel>
                            <Input
                                placeholder='Doe'
                                {...field}
                                aria-invalid={fieldState.invalid}
                                className='transition-all bg-[#F8FAFC]'
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name='customer.gender'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.gender'>
                                Genero
                            </FieldLabel>
                            <Select
                                onValueChange={(value) =>
                                    field.onChange(
                                        value === '' ? undefined : Number(value)
                                    )
                                }
                                value={
                                    field.value !== undefined
                                        ? String(field.value)
                                        : ''
                                }
                                name={field.name}>
                                <SelectTrigger className='transition-all w-[400px] bg-[#F8FAFC]'>
                                    <SelectValue placeholder='Selecciona tu genero' />
                                </SelectTrigger>

                                <SelectContent className='bg-popover z-50 '>
                                    <SelectItem value={Gender.MALE.toString()}>
                                        Masculino
                                    </SelectItem>
                                    <SelectItem
                                        value={Gender.FEMALE.toString()}>
                                        Femenino
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name='customer.birthDate'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='customer.birthDate'>
                                Fecha de nacimiento
                            </FieldLabel>
                            <Input
                                type='date'
                                {...field}
                                className='transition-all bg-[#F8FAFC]'
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
        </>
    );
};
