import type { InsurancesData } from '@/mocks/request.mock';
import { useEffect, useState } from 'react';
import { EstimateForm } from './EstimateForm';
import Emitir from './Emitir';
import {
    checkStatusPayment,
    getUrlPayment,
    type InsurancePaymentStatusResponse,
} from '../services/insurance.service';
import PaymentConfirmation from './PaymentConfirmation';

type FlowStep = 'estimate' | 'emit' | 'emited' | 'confirmation';
interface FlowProps {
  storeToken?: string;
}

export const EstimateFlow = ({ storeToken }: FlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("estimate");
  const [insuranceData, setInsuranceData] = useState<InsurancesData | null>(null);
  const [paymentData, setPayment] = useState<InsurancePaymentStatusResponse | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPayment, setIsPayment] = useState<boolean>(false);

    const handleEstimateSuccess = (data: InsurancesData) => {
        setIsPayment(false);
        setInsuranceData(data);
        setCurrentStep('emit');
    };
    const handleBack = () => {
        setCurrentStep('estimate');
    };

  const handleEmit = async (insuranceId: string) => {
    setIsCheckoutOpen(true);
    setPaymentErrorMessage('');
    let paymentUrl: string = '';

    try {
      const paymentUrlResponse = await getUrlPayment(insuranceId);
      if (!paymentUrlResponse) {
        setPaymentErrorMessage('No se pudo obtener el enlace de pago');
        return;
      }

      paymentUrl = `${paymentUrlResponse}&documento=${insuranceData?.customer?.documentNumber}`;
    } catch (error) {
        console.error('Error!', error);
        setIsCheckoutOpen(false);
        setPaymentErrorMessage('Error al obtener el enlace de pago, por favor inténtalo nuevamente.');
        return;
    }

    const popupHeight = 700;
    const popupWidth = 600;
    const left = (screen.width / 2) - (popupWidth / 2);
    const top = (screen.height / 2) - (popupHeight / 2);

    const popup = window.open(
      paymentUrl,
      "popupPago",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    if (!popup) {
      alert("Popup bloqueado, por favor habilite las ventanas emergentes");
      return;
    }
    
    const interval = setInterval(async () => {
      const payment = await checkStatusPayment(insuranceId);
      if (!payment.isPaid && popup.closed) {
        clearInterval(interval);
        setIsCheckoutOpen(false)
        setPaymentErrorMessage('Ha cancelado el pago. Por favor inténtalo nuevamente.');
        return;
      }

      if (payment.isPaid) {
        popup.close();
        clearInterval(interval);
        setIsCheckoutOpen(false);
        setPayment(payment);
        setIsPayment(true);
        setCurrentStep('confirmation');
        return;
      }
    }, 3000);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(timeoutId);
  }, [currentStep]);

  return (
    <>
      {currentStep === "estimate" && (
        <EstimateForm storeToken={storeToken} onSuccess={handleEstimateSuccess} setGlobalSuccessMessage={setSuccessMessage} />
      )}
      {currentStep === "emit" && insuranceData && (
        <Emitir
          onBack={handleBack}
          isCheckoutOpen={isCheckoutOpen}
          paymentErrorMessage={paymentErrorMessage}
          successMessage={successMessage}
          onEmit={() => handleEmit(insuranceData.id)}
          insuranceData={insuranceData}
          isPayment={isPayment}
        />
      )}
      {currentStep === "confirmation" && paymentData && insuranceData && (
        <PaymentConfirmation
          insuranceData={insuranceData}
          paymentData={paymentData}
          onFinish={() => {
            setCurrentStep('estimate');
            setInsuranceData(null);
            setPayment(null);
            setSuccessMessage(null);
          }}
        />
      )}
    </>
  );
};
