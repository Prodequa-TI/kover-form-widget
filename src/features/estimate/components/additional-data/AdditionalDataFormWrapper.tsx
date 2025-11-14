import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { InsurancesData } from '@/mocks/request.mock';
import { AddressForm } from './AdditionalDataForm';
import { FieldGroup } from '@/components/ui/field';

interface AdditionalDataFormWrapperProps {
    insuranceData: InsurancesData;
    onBack: () => void;
    onSubmit: (data: AdditionalDataFormData) => void;
}

// Reutilizamos las validaciones del EstimateFormConfig
const additionalDataSchema = yup.object({
    customer: yup.object({
        occupation: yup.string().required('La ocupación es requerida'),
        address: yup.object({
            street: yup
                .string()
                .required('La calle es requerida.')
                .min(3, 'Mínimo 3 caracteres'),
            province: yup
                .string()
                .required('La provincia es requerida.')
                .min(1, 'Selecciona una provincia válida.'),
            municipality: yup.string().when('province', {
                is: (province: string) => !!province && province.length > 0,
                then: (schema) =>
                    schema
                        .required('El municipio es requerido.')
                        .min(1, 'Selecciona un municipio válido.'),
                otherwise: (schema) => schema.optional(),
            }),
        }),
    }),
});

export type AdditionalDataFormData = yup.InferType<typeof additionalDataSchema>;

export const AdditionalDataFormWrapper = ({
    onBack,
    onSubmit,
}: AdditionalDataFormWrapperProps) => {
    const form = useForm<AdditionalDataFormData>({
        resolver: yupResolver(additionalDataSchema),
        defaultValues: {
            customer: {
                occupation: '',
                address: {
                    street: '',
                    province: '',
                    municipality: '',
                },
            },
        },
        mode: 'onChange',
    });

    const {
        formState: { isValid, isSubmitting },
    } = form;

    const handleSubmit = (data: AdditionalDataFormData) => {
        onSubmit(data);
    };

    return (
        <div className='mx-auto max-w-5xl px-4 py-6 md:py-10 w-full'>
            <div className='mb-8 text-center'>
                <h1 className='text-2xl md:text-3xl font-bold tracking-tight text-slate-900'>
                    Datos Adicionales
                </h1>
                <p className='mt-1 text-slate-500'>
                    Por favor, completa la siguiente información para continuar con la emisión
                </p>
            </div>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FieldGroup>
                    <div className='max-w-2xl mx-auto'>
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
                            <Button
                                type='submit'
                                className='w-full md:w-44 h-11 px-10 bg-orange-500 hover:bg-orange-600 text-base font-semibold cursor-pointer'
                                disabled={!isValid || isSubmitting}>
                                {isSubmitting ? 'PROCESANDO...' : 'CONTINUAR AL PAGO'}
                            </Button>
                        </div>
                    </div>
                </FieldGroup>
            </form>
        </div>
    );
};
