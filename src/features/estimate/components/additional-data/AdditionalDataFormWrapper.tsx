import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { AddressForm } from './AdditionalDataForm';
import { FieldGroup } from '@/components/ui/field';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';
import { RelationShip } from '../../type/types';
import LoadingOverlay from '../LoadingOverlay';

interface AdditionalDataFormWrapperProps {
  insuranceData: InsurancesData;
  onBack: () => void;
  onSubmit: (data: AdditionalDataFormData) => Promise<boolean>;
  onProcessPayment: () => Promise<void>;
  nextStep: () => void;
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
      referencePoint: yup.string().optional(),
      province: yup.string().when('referencePoint', {
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
        is: (municipality: string) => !!municipality && municipality.length > 0,
        then: (schema) => schema.required('El sector es requerido.'),
        otherwise: (schema) => schema.optional(),
      }),
    }),
    dueDiligence: yup.object({
      politicallyExposed: yup.boolean().defined().default(false),
      isItACloseRelative: yup.mixed<RelationShip>().when('politicallyExposed', {
        is: true,
        then: (schema) =>
          schema
            .oneOf(
              [RelationShip.FAMILY, RelationShip.IAM],
              'Selecciona una opción válida.'
            )
            .required('Selecciona un tipo de combustible.'),
        otherwise: (schema) => schema.optional(),
      }),
      familyName: yup.string().when(['politicallyExposed', 'isItACloseRelative'], {
        is: (politically: boolean, isRelative: RelationShip) =>
          politically === true && isRelative === RelationShip.FAMILY,
        then: (schema) => schema.required('El nombre del familiar es requerido.'),
        otherwise: (schema) => schema.optional(),
      }),
      kinship: yup.string().when(['politicallyExposed', 'isItACloseRelative'], {
        is: (politically: boolean, isRelative: RelationShip) =>
          politically === true && isRelative === RelationShip.FAMILY,
        then: (schema) => schema.required('La relación familiar es requerida.'),
        otherwise: (schema) => schema.optional(),
      }),
      position: yup.string().when(['politicallyExposed', 'isItACloseRelative'], {
        is: (politically: boolean, isRelative: RelationShip) =>
          politically === true && isRelative === RelationShip.IAM,
        then: (schema) => schema.required('El cargo público es requerido.'),
        otherwise: (schema) => schema.optional(),
      }),
      positionFamily: yup.string().when(['politicallyExposed', 'isItACloseRelative'], {
        is: (politically: boolean, isRelative: RelationShip) =>
          politically === true && isRelative === RelationShip.FAMILY,
        then: (schema) => schema.required('El cargo del familiar es requerido.'),
        otherwise: (schema) => schema.optional(),
      }),
    }),
    requiresFiscalReceipt: yup.boolean().defined().default(false),
    hasIntermediary: yup.boolean().defined().default(false),
    intermediary: yup.string().when('hasIntermediary', {
      is: (hasIntermediary: boolean) => hasIntermediary,
      then: (schema) => schema.required('El intermediario es requerido'),
      otherwise: (schema) => schema.optional(),
    }),
  }),
  endorsmentPolicy: yup.object({
    hasEndorsmentPolicy: yup.boolean().defined().default(false),
    institution: yup.string().when('hasEndorsmentPolicy', {
      is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
      then: (schema) => schema.required('La institución es requerida'),
      otherwise: (schema) => schema.optional(),
    }),
    subsidiary: yup.string().when('hasEndorsmentPolicy', {
      is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
      then: (schema) => schema.required('La subsidiaria es requerida'),
      otherwise: (schema) => schema.optional(),
    }),
    executiveName: yup.string().when('hasEndorsmentPolicy', {
      is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
      then: (schema) => schema.required('El nombre del ejecutivo es requerido'),
      otherwise: (schema) => schema.optional(),
    }),
    executiveEmail: yup
      .string()
      .email('Debe ser un correo válido')
      .when('hasEndorsmentPolicy', {
        is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
        then: (schema) =>
          schema
            .personaleEmail()
            .required('El correo electrónico del ejecutivo es requerido'),
        otherwise: (schema) => schema.optional(),
      }),
    executivePhoneNumber: yup.string().when('hasEndorsmentPolicy', {
      is: (hasEndorsmentPolicy: boolean) => hasEndorsmentPolicy,
      then: (schema) =>
        schema
          .matches(/^\d{10}$/, 'Teléfono debe tener 10 digitos.')
          .dominicPhone('El teléfono debe comenzar con 809, 829 o 849.'),
      otherwise: (schema) => schema.optional(),
    }),
  }),
  smartDevice: yup.object({
    installationType: yup.string().required('Selecciona un tipo de instalación.'),
    installationCenter: yup.string().required('Selecciona el centro de instalación.'),
  }),
});

export type AdditionalDataFormData = yup.InferType<typeof additionalDataSchema>;

export const AdditionalDataFormWrapper = ({
  onBack,
  onSubmit,
  nextStep,
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
          referencePoint: '',
        },
        dueDiligence: {
          politicallyExposed: false,
          isItACloseRelative: undefined,
          familyName: '',
          kinship: '',
          position: '',
          positionFamily: '',
        },
        requiresFiscalReceipt: false,
        hasIntermediary: false,
        intermediary: '',
      },
      endorsmentPolicy: {
        hasEndorsmentPolicy: false,
        institution: '',
        subsidiary: '',
        executiveName: '',
        executiveEmail: '',
        executivePhoneNumber: '',
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
      // return;
      if (success) {
        reset();
        setAlertMessage({
          type: 'success',
          message: '¡Datos guardados exitosamente!',
        });
        setTimeout(() => setAlertMessage(null), 5000);
        nextStep();
      } else {
        setAlertMessage({
          type: 'error',
          message: 'No se pudieron guardar los datos. Por favor intenta nuevamente.',
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
  return (
    <>
      {isSubmitting && <LoadingOverlay message="Actualizando datos" />}
      <div className="px-4 py-6 md:py-10 w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Datos adicionales
          </h1>
          <p className="mt-1 text-slate-500">
            Por favor, completa la siguiente información para continuar con la emisión
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex justify-center w-full"
        >
          <FieldGroup className="w-full max-w-3xl">
            {alertMessage && (
              <Alert variant={alertMessage.type == 'success' ? 'default' : 'destructive'}>
                {alertMessage.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 shrink-0" />
                )}
                {alertMessage.type === 'success' ? (
                  <AlertTitle>Pefecto!, tus cambios se guardaron</AlertTitle>
                ) : (
                  <AlertTitle>Error en la actualización</AlertTitle>
                )}
                <AlertDescription
                  className={`text-sm  ${
                    alertMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {alertMessage.message}
                </AlertDescription>
              </Alert>
            )}
            <div className="w-full">
              <AddressForm form={form} />
              <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                <Button
                  type="button"
                  variant="secondary"
                  className="h-11 px-10 cursor-pointer w-full md:w-44"
                  onClick={onBack}
                  disabled={isSubmitting}
                >
                  ATRÁS
                </Button>
                <Button
                  type="submit"
                  className="h-11 px-10 cursor-pointer w-full md:w-auto bg-kover-widget-primary hover:bg-kover-widget-primary-hover"
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar datos'}
                </Button>
              </div>
            </div>
          </FieldGroup>
        </form>
      </div>
    </>
  );
};
