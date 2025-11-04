import type { EstimateFormData } from '../config/EstimeFormConfig';
import { Controller, type UseFormReturn } from 'react-hook-form';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

type AssistantFormProps = {
    form: UseFormReturn<EstimateFormData>;
};

export const AssistantForm = ({ form }: AssistantFormProps) => {
    return (
        <div className='flex flex-col justify-center gap-4'>
            <div className='flex items-start'>
                <Controller
                    control={form.control}
                    name='car.terms.vehicleAssistance'
                    render={({ field, fieldState }) => (
                        <label
                            htmlFor='car.term.vehicleAssistanceSwitch'
                            className='w-full cursor-pointer select-none'>
                            <Field
                                orientation='horizontal'
                                data-invalid={fieldState.invalid}
                                className='flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-gray-50 transition-colors'>
                                <FieldContent>
                                    <FieldLabel
                                        htmlFor='car.term.vehicleAssistanceSwitch'
                                        className='cursor-pointer'>
                                        Contratar asistencia 24/7
                                    </FieldLabel>
                                    <FieldDescription>
                                        Ayuda inmediata en caso de emergencia en
                                        carretera
                                    </FieldDescription>
                                </FieldContent>
                                <Switch
                                    id='car.term.vehicleAssistanceSwitch'
                                    name={field.name}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                    className='bg-indigo-500'
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        </label>
                    )}
                />
            </div>
            <div className='bg-indigo-50 p-4 sm:p-6 md:p-8 rounded-lg'>
                {/* Título con precio */}
                <h4 className='text-center text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-4 sm:mb-6'>
                    Por tan solo
                    <br />
                    <span className='text-indigo-600 font-bold text-lg sm:text-xl md:text-2xl'>
                        RD$238/MENSUAL
                    </span>
                </h4>

                {/* Subtítulo */}
                <p className='font-medium text-sm sm:text-base mb-3 sm:mb-4 text-gray-700'>
                    Ayuda en caso que requieras:
                </p>

                {/* Lista de beneficios - Mobile: 1 col, Desktop: 2 cols */}
                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-3 text-sm sm:text-base text-gray-700'>
                    <li className='flex items-start'>
                        <span className='text-indigo-500 mr-2 shrink-0'>•</span>
                        <span>Avería mecánica ligera</span>
                    </li>
                    <li className='flex items-start'>
                        <span className='text-indigo-500 mr-2 shrink-0'>•</span>
                        <span>Remolque</span>
                    </li>
                    <li className='flex items-start'>
                        <span className='text-indigo-500 mr-2 shrink-0'>•</span>
                        <span>Cambio de neumático</span>
                    </li>
                    <li className='flex items-start'>
                        <span className='text-indigo-500 mr-2 shrink-0'>•</span>
                        <span>Cerrajería vehicular</span>
                    </li>
                    <li className='flex items-start sm:col-span-2'>
                        <span className='text-indigo-500 mr-2 shrink-0'>•</span>
                        <span>Envío de combustible</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
