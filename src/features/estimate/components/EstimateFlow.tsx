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
import { QuoteSummary } from './QuoteSummary';

type FlowStep =
    | 'estimate'
    | 'emit'
    | 'additional-data'
    | 'confirmation'
    | 'quote-summary';
interface FlowProps {
    storeToken?: string;
}

// Mock data temporal para desarrollo
const mockInsuranceData: InsurancesData = {
    companyId: '68fbf86399f1ecfe2c04f532',
    quoteNumber: 199213,
    product: 'auto-insurance',
    status: 'quoted',
    customer: {
        firstName: 'María',
        lastName: 'González',
        gender: 'F',
        documentType: 'Cédula',
        documentNumber: '40220043307',
        phone: '8091234567',
        email: 'raul.g.quispe@gmail.com',
        occupation: 'Vendedor o Comerciante',
        address: {
            province: 'Distrito Nacional / Santo Domingo',
            municipality: 'Santo Domingo de Guzmán',
            street: '1',
        },
        _id: '691cebdbc267e2de159d3cde',
    },

    vehicle: {
        modelId: 1,
        year: 2025,
        fuelType: 'Gasolina / Diesel',
        isPersonalUse: true,
        value: 2000000,
        plate: 'G320734',
        color: 'BLANCO',
        displacement: 4,
        doors: 4,
        chassis: '123123',
        engine: '25874',
        _id: '691cebdbc267e2de159d3ce0',
    },

    terms: {
        paymentFraction: 'M',
        paymentMethod: 't/c',
        lawInsurance: 'Auto Exceso',
        vehicularAssistance: true,
        substituteAuto: 'Rent-a-Car',
        premium: 0,
        tax: 0,
        totalAmount: 1000,
        _id: '691cebdbc267e2de159d3ce1',
    },
    requestDate: new Date(),
    quoteDate: new Date(),
    quotationRequest: {} as any,
    quotationResponse: {} as any,

    createdAt: new Date(),
    updatedAt: new Date(),
    id: '691ce464ed1b1d03ca5d5140',
};

export const EstimateFlow = ({ storeToken }: FlowProps) => {
    const [currentStep, setCurrentStep] = useState<FlowStep>('estimate');
    const [insuranceData, setInsuranceData] = useState<InsurancesData | null>(
        mockInsuranceData // Usar mock temporal
    );
    const [paymentData, setPayment] =
        useState<InsurancePaymentStatusResponse | null>(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
    const [paymentErrorMessage, setPaymentErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isPayment, setIsPayment] = useState<boolean>(false);
    const [isDataSaved, setIsDataSaved] = useState<boolean>(false);

    const handleEstimateSuccess = (data: InsurancesData) => {
        setIsPayment(false);
        setInsuranceData(data);
        setCurrentStep('emit');
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
        const updatePayload = {
            occupation: data.customer.occupation,
            address: {
                street: data.customer.address.street,
                province: data.customer.address.province,
                municipality: data.customer.address.municipality,
                sector: data.customer.address.sector,
            },
        };
        const success = await updateInsurance(insuranceData.id, data);

        if (success) {
            setIsDataSaved(true);
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
            //  " _blank"
        );

        if (!popup) {
            alert(
                'Popup bloqueado, por favor habilite las ventanas emergentes'
            );
            return;
        }

        const interval = setInterval(async () => {
            const payment = await checkStatusPayment(insuranceId);
            if (!payment.isPaid && popup.closed) {
                clearInterval(interval);
                setIsCheckoutOpen(false);
                setPaymentErrorMessage(
                    'Ha cancelado el pago. Por favor inténtalo nuevamente.'
                );
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
                    isCheckoutOpen={isCheckoutOpen}
                    paymentErrorMessage={paymentErrorMessage}
                    successMessage={successMessage}
                    onEmit={handleEmitClick}
                    insuranceData={insuranceData}
                    isPayment={isPayment}
                />
            )}
            {currentStep === 'additional-data' && (
                <AdditionalDataFormWrapper
                    insuranceData={insuranceData as InsurancesData}
                    onBack={handleBackFromAdditionalData}
                    onSubmit={handleSaveAdditionalData}
                    onProcessPayment={handleProcessPayment}
                    isDataSaved={isDataSaved}
                />
            )}
            {currentStep === 'quote-summary' && insuranceData && (
                <QuoteSummary insuranceData={insuranceData} />
            )}
            {currentStep === 'confirmation' && paymentData && insuranceData && (
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
