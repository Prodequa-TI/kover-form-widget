import { httpClient } from "../../../core/httpClient";
import type { UpdateInsuranceRequest } from "../type/types";

interface InsurancePaymentResponse {
  paymentUrl: string;
}

export interface InsurancePaymentStatusResponse {
  quoteNumber: string;
  policyNumber: string;
  isPaid: boolean;
}

export interface SendEmailResponse {
  insuranceId: string;
  quoteNumber: number;
  emailToSend: string;
}

export const getUrlPayment = async (insuranceId: string): Promise<string> => {
  const response = await httpClient.post<InsurancePaymentResponse>(`/insurances/${insuranceId}/payment-url`);
  return response.data.paymentUrl;
};

export const checkStatusPayment = async (insuranceId: string): Promise<InsurancePaymentStatusResponse> => {
  const response = await httpClient.get<InsurancePaymentStatusResponse>(`/insurances/${insuranceId}/payment-status`);
  return response.data;
};

export const sendInspectionEmail = async (insuranceId: string): Promise<boolean> => {
  try {
    const response = await httpClient.post<SendEmailResponse>(`/insurances/${insuranceId}/inspection-email`);
    return response.success;  
  } catch (error) {
    console.error('Error al enviar email de inspección', error);
    return false;
  }
};

export const updateInsurance = async (insuranceId: string, data: Partial<UpdateInsuranceRequest>): Promise<boolean> => {
  try {
    const response = await httpClient.put(`/insurances/${insuranceId}`, data, { headers: { 'Content-Type': 'application/json' } });
    return response.success;
  } catch (error) {
    console.error('Error al actualizar la cotización', error);
    return false;
  }
}
