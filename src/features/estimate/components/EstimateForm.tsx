import { CustomerDataForm } from './customer/CustomerDataForm';
import { CarForm } from './car/CarForm';
import { LawInsuranceForm } from './LawInsuranceForm';
import { AssistantForm } from './AssistantForm';
import { ReplaceCar } from './ReplaceCar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    initialValues,
    schemaEstimate,
    type EstimateFormData,
} from '../config/EstimeFormConfig';
import { Separator } from '@/components/ui/separator';
import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { generateInsurance } from '../services/car-estimate.service';
import type { Insurance } from '@/mocks/request.mock';

interface EstimateFormProps {
    onSuccess: (data: Insurance) => void;
}
export const EstimateForm = ({ onSuccess }: EstimateFormProps) => {
    const form = useForm<EstimateFormData>({
        resolver: yupResolver(schemaEstimate),
        defaultValues: initialValues,
        mode: 'onChange',
        reValidateMode: 'onChange',
    });
    const {
        formState: { isValid, isSubmitting },
    } = form;

    const onSubmit = async (data: EstimateFormData) => {
        try {
            const response = await generateInsurance(data);

            toast.success('¡Cotización exitosa!', {
                description: `Tu número de cotización es: ${response.quoteNumber}`,
                position: 'top-right',
            });

            // Pasar datos al siguiente paso
            onSuccess(response);
        } catch (error) {
            console.log(error);
            toast.error('Error en la cotización', {
                description:
                    error instanceof Error
                        ? error.message
                        : 'Ocurrió un error inesperado. Por favor intenta nuevamente.',
                position: 'top-right',
                action: {
                    label: 'Reintentar',
                    onClick: () => form.handleSubmit(onSubmit)(),
                },
            });
        }
    };

    const canSubmit = isValid && !isSubmitting;

    return (
        <>
            <h1 className='text-center text-2xl font-bold text-gray-900 mb-8'>
                Cotización por lo que conduces
            </h1>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className='flex flex-col gap-8 max-w-4xl'>
                        <div className='space-y-6 animate-in fade-in-50 duration-500'>
                            <h4 className=' font-bold text-indigo-500 mb-6'>
                                Información de contacto
                            </h4>
                            <CustomerDataForm form={form} />
                        </div>
                        <Separator />
                        <div className='space-y-6 animate-in fade-in-50 duration-500'>
                            <h4 className=' font-bold text-indigo-500 mb-6'>
                                Datos del Vehículo
                            </h4>
                            <CarForm form={form} />
                        </div>
                        <Separator />
                        <div className='space-y-6 animate-in fade-in-50 duration-500'>
                            <h4 className=' font-bold text-indigo-500 mb-6'>
                                Seguro de Ley
                            </h4>
                            <LawInsuranceForm form={form} />
                        </div>
                        <Separator />
                        <div className='space-y-6 animate-in fade-in-50 duration-500'>
                            <h4 className=' font-bold text-indigo-500 mb-6'>
                                Asistencia Vehícular
                            </h4>
                            <AssistantForm form={form} />
                        </div>
                        <div className='space-y-6 animate-in fade-in-50 duration-500'>
                            <h4 className=' font-bold text-indigo-500 mb-6'>
                                Auto sustituto
                            </h4>
                            <ReplaceCar form={form} />
                        </div>
                        <Button
                            type='submit'
                            disabled={!canSubmit}
                            className={`
                                h-12 px-12 text-lg rounded-md shadow-md transition-all
                                ${
                                    canSubmit
                                        ? 'bg-orange-500 hover:bg-orange-600 hover:shadow-xl cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                                }
                            `}>
                            {isSubmitting ? 'ENVIANDO...' : 'COTIZAR'}
                        </Button>
                    </div>
                </FieldGroup>
            </form>
        </>
    );
};
