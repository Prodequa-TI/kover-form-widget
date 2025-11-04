import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { Gas, InstallatationType } from '../../type/types';
interface CarFormProps {
    form: UseFormReturn<EstimateFormData>;
    gasEnabled: boolean;
}
export const GasAndInstallToggle = ({ form, gasEnabled }: CarFormProps) => {
    return (
        <>
            <div className='flex flex-col md:grid md:grid-cols-2 gap-4'>
                <Controller
                    control={form.control}
                    name='car.gasType'
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className='flex flex-col items-center justify-center gap-4'>
                            <FieldLabel>Tipo de gas</FieldLabel>
                            <div className='grid grid-cols-2 gap-3 w-full'>
                                <Button
                                    type='button'
                                    disabled={!gasEnabled}
                                    aria-pressed={field.value === Gas.GLP}
                                    onClick={() => field.onChange(Gas.GLP)}
                                    className={`py-2.5 px-5 rounded-md border-none transition-colors w-full ${
                                        field.value === Gas.GLP
                                            ? 'bg-indigo-500 text-white hover:opacity-95'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                    }${
                                        !gasEnabled
                                            ? 'opacity-50 pointer-events-none'
                                            : ' '
                                    } cursor-pointer`}>
                                    GLP
                                </Button>

                                <Button
                                    type='button'
                                    disabled={!gasEnabled}
                                    aria-pressed={field.value === Gas.GNV}
                                    onClick={() => field.onChange(Gas.GNV)}
                                    className={`py-2.5 px-5 rounded-md border-none transition-colors w-full ${
                                        field.value === Gas.GNV
                                            ? 'bg-indigo-500 text-white hover:opacity-95'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                    } ${
                                        !gasEnabled
                                            ? 'opacity-50 pointer-events-none'
                                            : ''
                                    } cursor-pointer`}>
                                    GNV
                                </Button>
                            </div>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name='car.installationType'
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className='flex flex-col items-center justify-center gap-4'>
                            <FieldLabel>Tipo de instalación</FieldLabel>
                            <div className='grid grid-cols-2 gap-3 w-full'>
                                <Button
                                    type='button'
                                    disabled={!gasEnabled}
                                    aria-pressed={
                                        field.value ===
                                        InstallatationType.ADAPTED
                                    }
                                    onClick={() =>
                                        field.onChange(
                                            InstallatationType.ADAPTED
                                        )
                                    }
                                    className={`py-2.5 px-5 rounded-md border-none transition-colors w-full ${
                                        field.value ===
                                        InstallatationType.ADAPTED
                                            ? 'bg-indigo-500 text-white hover:opacity-95'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                    } ${
                                        !gasEnabled
                                            ? 'opacity-50 pointer-events-none'
                                            : ''
                                    } cursor-pointer`}>
                                    Adaptado
                                </Button>

                                <Button
                                    type='button'
                                    disabled={!gasEnabled}
                                    aria-pressed={
                                        field.value ===
                                        InstallatationType.TO_BUILD
                                    }
                                    onClick={() =>
                                        field.onChange(
                                            InstallatationType.TO_BUILD
                                        )
                                    }
                                    className={`py-2.5 px-5 rounded-md border-none transition-colors w-full ${
                                        field.value ===
                                        InstallatationType.TO_BUILD
                                            ? 'bg-indigo-500 text-white hover:opacity-95'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                    } ${
                                        !gasEnabled
                                            ? 'opacity-50 pointer-events-none'
                                            : ''
                                    } cursor-pointer`}>
                                    De fábrica
                                </Button>
                            </div>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
        </>
    );
};
