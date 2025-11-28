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

import { generateQuota } from '../services/car-estimate.service';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';
import { usePreventScrollLock } from '../hook/usePreventSchrollLock';
import LoadingOverlay from '../../../shared/LoadingOverlay';

interface EstimateFormProps {
  onSuccess: (data: InsurancesData) => void;
  setGlobalSuccessMessage: (msg: string | null) => void;
  storeToken?: string;
}

export const EstimateForm = ({
  onSuccess,
  setGlobalSuccessMessage,
  storeToken,
}: EstimateFormProps) => {
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const form = useForm<EstimateFormData>({
    resolver: yupResolver(schemaEstimate),
    defaultValues: initialValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: EstimateFormData) => {
    try {
      setErrorAlert(null);
      // Llamar al servicio que hace fetch a la API
      const response = await generateQuota(data, storeToken);

      // setear el mensaje global de éxito
      setGlobalSuccessMessage(
        `Cotización exitosa. Tu número de cotización es: #${response.data.quoteNumber}`
      );

      onSuccess(response.data);
      reset();
    } catch (error) {
      // Manejar errores
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
      setErrorAlert(errorMessage);
    }
  };
  const onError = () => {
    const message = `
          Faltan por completar o corregir en algunos campos
      `;
    setErrorAlert(message);
  };

  usePreventScrollLock();
  useEffect(() => {
    //SI HAY UN ALERT DE ERROR Y NO HAY ERRORE DE VALIDACIÓN
    if(errorAlert && form.formState.isValid){
      const timer = setTimeout(() => {
        setErrorAlert(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  },[errorAlert, form.formState.isValid]);

  return (
    <>
      {isSubmitting && <LoadingOverlay message="Generando tu cotización" />}
      <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">
        Cotización por lo que conduces
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FieldGroup>
          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Información de contacto
              </h4>
              <CustomerDataForm form={form} />
            </div>
            <Separator />
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Datos del Vehículo
              </h4>
              <CarForm form={form} />
            </div>
            <Separator />
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Planes de seguros
              </h4>
              <LawInsuranceForm form={form} />
            </div>
            <Separator />
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Asistencia Vehicular
              </h4>
              <AssistantForm form={form} />
            </div>
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <h4 className=" font-bold text-kover-widget-primary mb-6">
                Auto sustituto
              </h4>
              <ReplaceCar form={form} />
            </div>
            {errorAlert && (
              <Alert
                variant="destructive"
                className="mb-6 relative border-red-500 bg-red-50"
              >
                <XCircle className="h-4 w-4 " />
                <AlertTitle>Error en la cotización</AlertTitle>
                <AlertDescription>{errorAlert}</AlertDescription>

                <button
                  type="button"
                  onClick={() => setErrorAlert(null)}
                  className="absolute top-1 right-3 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </Alert>
            )}
            <Button
              type="submit"
              className="h-12 px-12 text-lg rounded-md transition-all bg-kover-widget-primary hover:bg-kover-widget-primary-hover cursor-pointer text-white"
            >
              {isSubmitting ? 'ENVIANDO...' : 'COTIZAR'}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </>
  );
};
