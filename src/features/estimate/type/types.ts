export const enum Documents {
    ID = 1,
    PASSPORT = 2,
}
export const enum Gender {
    MALE = 1,
    FEMALE = 2,
}

export const enum FuelsType {
    GASOLINE = 'Gasolina / Diesel',
    GAS = 'Gas',
    ELECTRIC = 'Vehículo Electrico',
}
export const enum CarInsurances {
    BASE = 'Base',
    PLUS = 'Plus',
    AUTO_EXCESO = 'AutoExceso',
}

export const enum Gas {
    GLP = 'GLP',
    GNV = 'GNV',
}

export const enum ReplacementsCar {
    UBER = 'Uber',
    RENT_A_CAR = 'Rent a car',
    NONE = 'No',
}
export const enum InstallatationType {
    ADAPTED = 'Adaptado',
    TO_BUILD = 'De Fábrica',
}

export interface EstimateFormData {
    customer: Customer;
    car: Car;
}
export interface Car {
    brand?: string;
    modelId: number;
    year: number;
    isNew?: boolean;
    fuelType?: FuelsType;
    gasType?: Gas;
    installationType?: InstallatationType;
    isPersonalUse?: boolean;
    worth: number;
    terms: Term;
}

interface Term {
    insuranceType: CarInsurances;
    vehicleAssistance: boolean;
    replacementCar: ReplacementsCar;
}

export interface Customer {
    email: string;
    phone: string;
    documentType?: Documents;
    documentNumber: string;
    firstName?: string;
    lastname?: string;
    gender?: Gender;
    birthDate?: string;
    occupation?: string;
    address?: Address;
    politicallyExposed?: boolean;
    requiresFiscalReceipt?: boolean;
}
export interface Address {
    street?: string;
    province?: string;
    municipality?: string;
    sector?: string;
}
export interface Province {
    id: number;
    nombre: string;
}

export interface Municipality {
    id: number;
    provinciaId: number;
    nombre: string;
}

export interface Occupations {
    idOccupation: number;
    occupation: string;
}
export interface CarModels {
    idModelo: number;
    modelo: string;
}

export interface CarListResponse {
    marca: string;
    modelos: CarModels[];
}

export interface FuelType {
    id: number;
    name: string;
}

export interface UpdateInsuranceRequest {
    customer: Partial<Customer>;
}

export const NOT_ALLOWED_CORPORATE_EMAIL_DOMAINS = [
    'prodequa.com',
    'mytikray.com',
    'nohaysinsuerte.com',
];
