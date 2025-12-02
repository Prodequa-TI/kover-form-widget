import { Button } from '@/components/ui/button';
import { AlertCircleIcon, AlertTriangle } from 'lucide-react';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { sendInspectionEmail } from '../services/insurance.service';
import { useCallback, useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PaymentConfirmationProps {
  insuranceData: InsurancesData;
  onFinish?: () => void;
}

export default function PaymentConfirmation({
  insuranceData,
  onFinish,
}: PaymentConfirmationProps) {
  const [emailWasSent, setEmailWasSent] = useState<boolean>(false);
  const [finishResendingEmail, setFinishResendingEmail] = useState<boolean>(false);

  const sendEmail = useCallback(() => {
    console.log('Enviando email...');
    return sendInspectionEmail(insuranceData.id);
  }, [insuranceData.id]);

  const resendEmail = async () => {
    const result = await sendEmail();
    setEmailWasSent(result);
    setFinishResendingEmail(true);
  };

  useEffect(() => {
    sendEmail();
  }, [sendEmail]);

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="rounded-xl overflow-hidden bg-white">
        <div className="p-2">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-10 text-center">
            Método de pago aceptado
          </h1>
          <p className="text-slate-700 text-base leading-relaxed max-w-2xl mx-auto text-center mb-10">
            Hemos realizado una pre-autorización en tu tarjeta, una vez que inspecciones
            tu vehículo, el cobro se completará y la cobertura quedará activa.
          </p>
          <Alert variant={'warning'} className="mb-10 p-4">
            <AlertTriangle className="size-6 text-amber-600" />
            <AlertTitle>Inspección requerida en 72 horas</AlertTitle>
            <AlertDescription>
              Si no completas la inspección en este plazo, tu cotización será cancelada
              automáticamente.
            </AlertDescription>
          </Alert>

          <p className="text-slate-700 text-base leading-relaxed mb-2 max-w-2xl mx-auto text-center">
            Te hemos enviado un email y SMS con un link para que realices la inspección en
            linea desde tu celular.
          </p>
          <p className="text-slate-700 text-base leading-relaxed mb-8 max-w-2xl mx-auto text-center">
            ¿No lo recibiste?{' '}
            <span
              className="text-kover-widget-primary cursor-pointer"
              onClick={resendEmail}
            >
              Has click para reenviar
            </span>
          </p>
          <div className="flex justify-center items-center">
            {finishResendingEmail && (
              <Alert
                variant={'default'}
                className={`mb-8 w-[70%] md:w-[50%] text-left ${
                  emailWasSent
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <AlertCircleIcon
                  className={emailWasSent ? 'text-green-700' : 'text-green-700'}
                />
                <AlertTitle className={emailWasSent ? 'text-green-800' : 'text-red-800'}>
                  {emailWasSent && 'Envio exitoso'}
                  {!emailWasSent && 'Envio fallido'}
                </AlertTitle>
                <AlertDescription>
                  {emailWasSent && 'Por favor, revisa tu bandeja de entrada'}
                  {!emailWasSent && 'Por favor, vuelva a intentarlo'}
                </AlertDescription>
                <button
                  type="button"
                  onClick={() => setFinishResendingEmail(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </Alert>
            )}
          </div>
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="outline"
              onClick={onFinish}
              className="px-12 h-12 text-base font-semibold border-2 border-kover-widget-primary text-blue-900 hover:bg-kover-widget-primary-50 cursor-pointer"
            >
              SALIR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
