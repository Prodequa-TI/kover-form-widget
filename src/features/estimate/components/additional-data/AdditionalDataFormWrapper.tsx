import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { InsurancesData } from '@/mocks/request.mock';
import { AddressForm } from './AdditionalDataForm';
import { FieldGroup } from '@/components/ui/field';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AdditionalDataFormWrapperProps {
    insuranceData: InsurancesData;
    onBack: () => void;
    onSubmit: (data: AdditionalDataFormData) => Promise<boolean>;
    onProcessPayment: () => Promise<void>;
    isDataSaved: boolean;
}

// Reutilizamos las validaciones del EstimateFormConfig
const additionalDataSchema = yup.object({
    customer: yup.object({
        occupation: yup.string().required('Selecciona una ocupación.'),
        address: yup.object({
            street: yup
                .string()
                .required('La calle es requerida.')
                .min(3, 'Mínimo 3 caracteres'),
            province: yup.string().when('street', {
                is: (street: string) => !!street && street.length >= 3,
                then: (schema) =>
                    schema
                        .required('Selecciona una provincia.')
                        .min(1, 'Selecciona una provincia.'),
                otherwise: (schema) => schema.optional(),
            }),
            municipality: yup.string().when('province', {
                is: (province: string) => !!province && province.length > 0,
                then: (schema) =>
                    schema
                        .required('El municipio es requerido.')
                        .min(1, 'Selecciona un municipio válido.'),
                otherwise: (schema) => schema.optional(),
            }),
            sector: yup.string().when('municipality', {
                is: (municipality: string) =>
                    !!municipality && municipality.length > 0,
                then: (schema) =>
                    schema
                        .required('El sector es requerido.')
                        .min(1, 'Selecciona un sector.'),
                otherwise: (schema) => schema.optional(),
            }),
        }),
        politicallyExposed: yup.boolean().defined().default(false),
        requiresFiscalReceipt: yup.boolean().defined().default(false),
    }),
});

export type AdditionalDataFormData = yup.InferType<typeof additionalDataSchema>;

export const AdditionalDataFormWrapper = ({
    onBack,
    onSubmit,
    onProcessPayment,
    isDataSaved,
}: AdditionalDataFormWrapperProps) => {
    const [alertMessage, setAlertMessage] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);
    const form = useForm<AdditionalDataFormData>({
        resolver: yupResolver(additionalDataSchema),
        defaultValues: {
            customer: {
                occupation: '',
                address: {
                    street: '',
                    province: '',
                    municipality: '',
                    sector: '',
                },
                politicallyExposed: false,
                requiresFiscalReceipt: false,
            },
        },
        mode: 'onChange',
    });

    const {
        reset,
        formState: { isSubmitting },
    } = form;

    const handleSubmit = async (data: AdditionalDataFormData) => {
        try {
            setAlertMessage(null);
            const success = await onSubmit(data);
            if (success) {
                reset();
                setAlertMessage({
                    type: 'success',
                    message: '¡Datos guardados exitosamente!',
                });
                setTimeout(() => setAlertMessage(null), 5000);
            } else {
                setAlertMessage({
                    type: 'error',
                    message:
                        'No se pudieron guardar los datos. Por favor intenta nuevamente.',
                });
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
            setAlertMessage({
                type: 'error',
                message: errorMessage,
            });
        }
    };
    const handleProcessPayment = async () => {
        setAlertMessage(null);
        try {
            await onProcessPayment();
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al procesar el pago. Por favor, inténtalo nuevamente.';
            setAlertMessage({
                type: 'error',
                message: errorMessage,
            });
        }
    };
    return (
        <div className='px-4 py-6 md:py-10 w-full'>
            <div className='mb-8 text-center'>
                <h1 className='text-2xl md:text-3xl font-bold tracking-tight text-slate-900'>
                    Datos Adicionales
                </h1>
                <p className='mt-1 text-slate-500'>
                    Por favor, completa la siguiente información para continuar
                    con la emisión
                </p>
            </div>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='flex justify-center w-full'>
                <FieldGroup className='w-full max-w-3xl'>
                    {alertMessage && (
                        <Alert
                            variant={
                                alertMessage.type == 'success'
                                    ? 'default'
                                    : 'destructive'
                            }>
                            {alertMessage.type === 'success' ? (
                                <CheckCircle2 className='h-5 w-5 text-green-600 shrink-0' />
                            ) : (
                                <XCircle className='h-5 w-5 text-red-600 shrink-0' />
                            )}
                            {
                                (alertMessage.type === 'success' ? (
                                    <AlertTitle>
                                      Pefecto!, tus cambios se guardaron
                                    </AlertTitle>
                                ) : (
                                    <AlertTitle>
                                        Error en la actualización
                                    </AlertTitle>
                                ))
                            }
                            <AlertDescription
                                className={`text-sm  ${
                                    alertMessage.type === 'success'
                                        ? 'text-green-800'
                                        : 'text-red-800'
                                }`}>
                                {alertMessage.message}
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className='w-full'>
                        <AddressForm form={form} />
                        <div className='mt-10 flex flex-col md:flex-row items-center justify-between gap-4 w-full'>
                            <Button
                                type='button'
                                variant='secondary'
                                className='h-11 px-10 cursor-pointer w-full md:w-44'
                                onClick={onBack}
                                disabled={isSubmitting}>
                                ATRÁS
                            </Button>
                            {!isDataSaved ? (
                                <Button
                                    type='submit'
                                    className='h-11 px-10 cursor-pointer w-full md:w-auto bg-[#003D82] hover:bg-[#002855]'>
                                    {isSubmitting
                                        ? 'Guardando...'
                                        : 'GUARDAR DATOS'}
                                </Button>
                            ) : (
                                <Button
                                    type='button'
                                    onClick={handleProcessPayment}
                                    className='h-11 px-10 cursor-pointer w-full md:w-auto bg-green-600 hover:bg-green-700'
                                    disabled={isSubmitting}>
                                    {isSubmitting
                                        ? 'Procesando...'
                                        : 'PROCESAR PAGO'}
                                </Button>
                            )}
                        </div>
                    </div>
                </FieldGroup>
            </form>
        </div>
    );
};
