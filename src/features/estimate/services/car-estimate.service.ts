import {
  Documents,
  type CarListResponse,
  CarInsurances,
  ReplacementsCar,
} from '../type/types';
import {
    type Insurances,
    type InsurancesData,
} from '@/features/estimate/type/insurance.types';
import type { EstimateFormData } from '../config/EstimeFormConfig';
import { API_DEFAULTS } from '../config/apiDefaults';
import { LAW_INSURANCE_LABEL, REPLACEMENT_CAR_LABEL } from '../config/mappers';
import { httpClient } from '@/core/httpClient';
import { formatDate } from '@/lib/formatDate';

let counter = Math.floor(Math.random() * 0xffffff);

function generateObjectId(): string {
  const timestamp = Math.floor(Date.now() / 1000)
    .toString(16)
    .padStart(8, '0');

  const randomValue = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  counter = (counter + 1) % 0xffffff;
  const counterHex = counter.toString(16).padStart(6, '0');

  return timestamp + randomValue + counterHex;
}

export const getCars = async (): Promise<CarListResponse[]> => {
  const cars = await httpClient.get<CarListResponse[]>(`/insurances/cars`);
  return cars.data;
};

export async function generateQuota(
  data: EstimateFormData,
  storeToken?: string
): Promise<Insurances> {
  try {
    //CONSTRUIR LA DATA QUE SE VA A ENVIAR A LA API
    const requestData = {
      companyId: storeToken || generateObjectId(),
      product: API_DEFAULTS.product,
      customer: {
        firstName: data.customer.firstName || '',
        lastName: data.customer.lastname || '',
        documentType:
          data.customer.documentType === Documents.ID ? 'Cedula' : 'Pasaporte',
        documentNumber: data.customer.documentNumber.replace(/\D/g, ''),
        phone: data.customer.phone.replace(/\D/g, ''),
        email: data.customer.email,
        gender: data.customer.gender === 1 ? 'M' : 'F',
        birthDate: formatDate(data.customer.birthDate),
        maritalStatus: data.customer.maritalStatus,
        occupation: API_DEFAULTS.customerDefaults.occupation,
        address: {
          province: API_DEFAULTS.customerDefaults.address.province,
          municipality: API_DEFAULTS.customerDefaults.address.municipality,
          sector: API_DEFAULTS.customerDefaults.address.sector,
          street: API_DEFAULTS.customerDefaults.address.street,
          houseNumber: API_DEFAULTS.customerDefaults.address.houseNumber,
          referencePoint: API_DEFAULTS.customerDefaults.address.referencePoint,
        },
      },
      vehicle: {
        modelId: data.car.modelId,
        year: data.car.year,
        fuelType: data.car.fuelType || undefined,
        isPersonalUse: data.car.isPersonalUse,
        meetsRequirements: data.car.meetsRequirements,
        value: data.car.worth,
        isNew: data.car.isNew,
        gasType: data.car.gasType ,
        installationType: data.car.installationType,
        // Datos que se pedirán después
        plate: API_DEFAULTS.vehicleDefaults.plate,
        color: API_DEFAULTS.vehicleDefaults.color,
        displacement: API_DEFAULTS.vehicleDefaults.displacement,
        doors: API_DEFAULTS.vehicleDefaults.doors,
        chassis: API_DEFAULTS.vehicleDefaults.chassis,
        engine: API_DEFAULTS.vehicleDefaults.engine,
      },
      terms: {
        lawInsurance: LAW_INSURANCE_LABEL[data.car.terms.insuranceType as CarInsurances],
        vehicularAssistance: data.car.terms.vehicleAssistance,
        substituteAuto:
          REPLACEMENT_CAR_LABEL[data.car.terms.replacementCar as ReplacementsCar],
        paymentFraction: API_DEFAULTS.paymentDefaults.paymentFraction,
        paymentMethod: API_DEFAULTS.paymentDefaults.paymentMethod,
      },
    };

    const result = await httpClient.post<InsurancesData>('/insurances', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!result.success || !result.data) {
      throw new Error('Respuesta inválida del servidor');
    }

    if (result.data.status === 'pending') {
      throw new Error(
        'Tu cotización está siendo procesada. Te notificaremos por correo electronico.'
      );
    }

    if (!result.data.quoteNumber || result.data.quoteNumber <= 0) {
      throw new Error(
        'Tu cotización está siendo procesada. Te notificaremos por correo electronico.'
      );
    }
    
    return result;
  } catch (error) {
    console.error('Error generating insurance:', error);
    if (error instanceof TypeError) {
      throw new Error('No se pudo conectar con el servidor');
    }
    throw error;
  }
}
