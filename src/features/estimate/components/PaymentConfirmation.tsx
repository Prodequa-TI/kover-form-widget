import { Button } from '@/components/ui/button';
import { AlertCircleIcon, AlertTriangle, CreditCardIcon } from 'lucide-react';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import {
    sendInspectionEmail,
} from '../services/insurance.service';
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
    const [finishResendingEmail, setFinishResendingEmail] =
        useState<boolean>(false);

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
        <div className='mx-auto max-w-4xl py-10'>
            <div className='rounded-xl overflow-hidden bg-white'>
                <div className='p-2 text-center'>
                    <div className='flex justify-center mb-6'>
                        <CreditCardIcon
                            className='size-12 text-orange-500'
                            strokeWidth={2.5}
                        />
                    </div>

                    <h1 className=' text-2xl md:text-4xl font-bold text-blue-900 mb-6'>
                        Método de pago aceptado
                    </h1>
                    <p className='text-slate-700 text-base leading-relaxed mb-8 max-w-2xl mx-auto'>
                        Hemos realizado una pre-autorización en tu tarjeta, una
                        vez que inspecciones tu vehículo, el cobro se completará
                        y la cobertura quedará activa.
                    </p>

                    <div className='flex items-center justify-center gap-2 mb-6'>
                        <AlertTriangle className='size-6 text-orange-500' />
                    </div>

                    <p className='text-orange-500 font-medium text-base mb-8'>
                        Tienes 72 horas para inspeccionar, de lo contrario la
                        cotización se cancelará.
                    </p>
                    <p className='text-slate-700 text-base leading-relaxed mb-2 max-w-2xl mx-auto'>
                        Te hemos enviado un email y SMS con un link para que
                        realices la inspección en linea desde tu celular.
                    </p>
                    <p className='text-slate-700 text-base leading-relaxed mb-8 max-w-2xl mx-auto'>
                        ¿No lo recibiste?{' '}
                        <span className='text-orange-500 cursor-pointer' onClick={resendEmail}>
                            Has click para reenviar
                        </span>
                    </p>
                    <div className='flex justify-center items-center'>
                    {finishResendingEmail && (
                        <Alert
                            variant={'default'}
                            className={`mb-8 w-[70%] md:w-[50%] text-left ${emailWasSent ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                            <AlertCircleIcon  className={emailWasSent ? 'text-green-700' : 'text-green-700'} />
                            <AlertTitle className={emailWasSent ? 'text-green-800' : 'text-red-800'}>
                                {emailWasSent && 'Envio exitoso'}
                                {!emailWasSent && 'Envio fallido'}
                            </AlertTitle>
                            <AlertDescription>
                                {emailWasSent &&
                                    'Por favor, revisa tu bandeja de entrada'}
                                {!emailWasSent &&
                                    'Por favor, vuelva a intentarlo'}
                            </AlertDescription>
                            <button
                                type='button'
                                onClick={() => setFinishResendingEmail(false)}
                                className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'>
                                ✕
                            </button>
                        </Alert>
                    )}
                </div>
                    <div className='flex items-center justify-center gap-6'>
                        <Button
                            variant='outline'
                            onClick={onFinish}
                            className='px-12 h-12 text-base font-semibold border-2 border-kover-widget-primary text-blue-900 hover:bg-blue-50 cursor-pointer'>
                            SALIR
                        </Button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
