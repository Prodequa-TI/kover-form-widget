import { Button } from '@/components/ui/button';
import { AlertTriangle, CreditCardIcon } from 'lucide-react';
import type { InsurancesData } from '@/mocks/request.mock';
import { sendInspectionEmail, type InsurancePaymentStatusResponse } from '../services/insurance.service';
import { useEffect } from 'react';

interface PaymentConfirmationProps {
    insuranceData: InsurancesData;
    paymentData: InsurancePaymentStatusResponse;
    onFinish?: () => void;
}

export default function PaymentConfirmation({
    insuranceData,
    onFinish,
}: PaymentConfirmationProps) {

    useEffect(() => {
        const sendEmail = async () => {
            const result = await sendInspectionEmail(insuranceData.id);
            if (!result) {
                console.error('Error al enviar email de inspección');
            }
        }
        sendEmail();
    }, [])

    return (
        <div className='mx-auto max-w-4xl px-4 py-10'>
            <div className='border-4  rounded-xl overflow-hidden bg-white'>
                <div className='p-12 text-center'>
                    <div className='flex justify-center mb-6'>
                        <CreditCardIcon
                            className='size-12 text-orange-500'
                            strokeWidth={2.5}
                        />
                    </div>

                    <h1 className='text-4xl font-bold text-blue-900 mb-6'>
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

                    <div className='flex items-center justify-center gap-6'>
                        <Button
                            variant='outline'
                            onClick={onFinish}
                            className='px-12 h-12 text-base font-semibold border-2 border-blue-900 text-blue-900 hover:bg-blue-50'>
                            SALIR
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
