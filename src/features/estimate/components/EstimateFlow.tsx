import type { InsurancesData } from '@/mocks/request.mock';
import { useEffect, useState } from 'react';
import { EstimateForm } from './EstimateForm';
import Emitir from './Emitir';
import {
  checkStatusPayment,
  getUrlPayment,
  updateInsurance,
  type InsurancePaymentStatusResponse,
} from '../services/insurance.service';
import PaymentConfirmation from './PaymentConfirmation';
import {
  AdditionalDataFormWrapper,
  type AdditionalDataFormData,
} from './additional-data/AdditionalDataFormWrapper';
import { QuoteSummary } from './summary/QuoteSummary';
import type { FlowStep } from '../type/types';

interface FlowProps {
  storeToken?: string;
}

export const EstimateFlow = ({ storeToken }: FlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('estimate');
  const [insuranceData, setInsuranceData] = useState<InsurancesData | null>(null);
  const [paymentData, setPayment] = useState<InsurancePaymentStatusResponse | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleStep = (step: FlowStep) => {
    setCurrentStep(step);
  };

  const handleEstimateSuccess = (data: InsurancesData) => {
    setInsuranceData(data);
    setCurrentStep('emit');
  };

  const handleUpdateInsurance = () => {
    setCurrentStep('quote-summary');
  };

  const handleBack = () => {
    setCurrentStep('estimate');
  };

  const handleEmitClick = () => {
    setCurrentStep('additional-data');
  };

  const handleBackFromAdditionalData = () => {
    setCurrentStep('emit');
  };
  const handleSaveAdditionalData = async (
    data: AdditionalDataFormData
  ): Promise<boolean> => {
    if (!insuranceData) return false;

    // Preparar el payload con solo los campos que el backend acepta
    const updatePayload = {
      customer: {
        occupation: data.customer.occupation,
        address: {
          street: data.customer.address.street,
          province: data.customer.address.province,
          municipality: data.customer.address.municipality,
          sector: data.customer.address.sector,
        },
        requiresFiscalReceipt: data.customer.requiresFiscalReceipt,
        hasIntermediary: data.customer.hasIntermediary,
      },
    };
    const success = await updateInsurance(insuranceData.id, updatePayload);

    if (success) {
      // Actualizar el estado local de los datos momentaniamente
      setInsuranceData({
        ...insuranceData,
        customer: {
          ...insuranceData.customer,
          occupation: data.customer.occupation,
          address: {
            ...insuranceData.customer.address,
            street: data.customer.address.street,
            province: data.customer.address.province || insuranceData.customer.address.province,
            municipality: data.customer.address.municipality || insuranceData.customer.address.municipality,
            sector: data.customer.address.sector,
          },
        },
      });
      return true;
    }
    return false;
  };
  const handleProcessPayment = async () => {
    if (insuranceData) {
      await handleEmit(insuranceData.id);
    }
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
      setPaymentErrorMessage(
        'Error al obtener el enlace de pago, por favor inténtalo nuevamente.'
      );
      return;
    }

    const popupHeight = 700;
    const popupWidth = 600;
    const left = screen.width / 2 - popupWidth / 2;
    const top = screen.height / 2 - popupHeight / 2;

    const popup = window.open(
      paymentUrl,
      'popupPago',
      `width=600,height=700,left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    if (!popup) {
      alert('Popup bloqueado, por favor habilite las ventanas emergentes');
      return;
    }

    const interval = setInterval(async () => {
      const payment = await checkStatusPayment(insuranceId);
      if (!payment.isPaid && popup.closed) {
        clearInterval(interval);
        setIsCheckoutOpen(false);
        setPaymentErrorMessage('Ha cancelado el pago. Por favor inténtalo nuevamente.');
        return;
      }

      if (payment.isPaid) {
        popup.close();
        clearInterval(interval);
        setIsCheckoutOpen(false);
        setPayment(payment);
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
      {currentStep === 'estimate' && (
        <EstimateForm
          storeToken={storeToken}
          onSuccess={handleEstimateSuccess}
          setGlobalSuccessMessage={setSuccessMessage}
        />
      )}
      {currentStep === 'emit' && insuranceData && (
        <Emitir
          onBack={handleBack}
          successMessage={successMessage}
          onEmit={handleEmitClick}
          insuranceData={insuranceData}
        />
      )}
      {currentStep === 'additional-data' && insuranceData && (
        <AdditionalDataFormWrapper
          insuranceData={insuranceData as InsurancesData}
          onBack={handleBackFromAdditionalData}
          onSubmit={handleSaveAdditionalData}
          onProcessPayment={handleProcessPayment}
          nextStep={handleUpdateInsurance}
        />
      )}
      {currentStep === 'quote-summary' && insuranceData && (
        <QuoteSummary
          insuranceData={insuranceData}
          handlePayment={handleEmit}
          handleStep={handleStep}
          isCheckoutOpen={isCheckoutOpen}
          paymentErrorMessage={paymentErrorMessage}
        />
      )}
      {currentStep === 'confirmation' && insuranceData &&  paymentData && (
        <PaymentConfirmation
          insuranceData={insuranceData}
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
