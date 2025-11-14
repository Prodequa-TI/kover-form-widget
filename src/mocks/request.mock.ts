export interface Insurances {
    success: boolean;
    data:    InsurancesData;
}

export interface InsurancesData {
    companyId:         string;
    quoteNumber:       number;
    product:           string;
    status:            string;
    customer:          DataCustomer;
    vehicle:           Vehicle;
    terms:             DataTerms;
    requestDate:       Date;
    quoteDate:         Date;
    quotationRequest:  QuotationRequest;
    quotationResponse: QuotationResponse;
    createdAt:         Date;
    updatedAt:         Date;
    id:                string;
}

export interface DataCustomer {
    firstName:      string;
    lastName:       string;
    gender:         string;
    documentType:   string;
    documentNumber: string;
    phone:          string;
    email:          string;
    occupation:     string;
    address:        AddressData;
    _id:            string;
}

export interface AddressData {
    province:     string;
    municipality: string;
    street:       string;
}

export interface QuotationRequest {
    companyId: string;
    product:   string;
    customer:  QuotationRequestCustomer;
    vehicle:   Vehicle;
    terms:     QuotationRequestTerms;
}

export interface QuotationRequestCustomer {
    firstName:      string;
    lastName:       string;
    documentType:   string;
    documentNumber: string;
    email:          string;
    phone:          string;
    occupation:     string;
    gender:         string;
    address:        FluffyAddress;
}

export interface FluffyAddress {
    province:       string;
    municipality:   string;
    sector:         string;
    street:         string;
    houseNumber:    string;
    referencePoint: string;
}

export interface QuotationRequestTerms {
    lawInsurance:        string;
    vehicularAssistance: boolean;
    substituteAuto:      string;
    paymentFraction:     string;
    paymentMethod:       string;
}

export interface Vehicle {
    modelId:           number;
    year:              number;
    fuelType:          string;
    gasType?:          string;
    installationType?: string;
    isPersonalUse:     boolean;
    value:             number;
    plate:             string;
    color:             string;
    displacement:      number;
    doors:             number;
    chassis:           string;
    engine:            string;
    _id?:              string;
}

export interface QuotationResponse {
    producto: string;
    data:     QuotationResponseData;
}

export interface QuotationResponseData {
    requestId:             null;
    codigoCliente:         string;
    tipo:                  string;
    numeroCotizacion:      number;
    numeroPoliza:          string;
    codigoIntermediario:   string;
    cotizacionRelacionada: null;
    estaAprobada:          boolean;
    estado:                string;
    estadoCertificado:     string;
    idePol:                null;
    ramo:                  string;
    plan:                  string;
    revPlan:               string;
    cliente:               Cliente;
    vehiculo:              Vehiculo;
    ingreso:               null;
    terminos:              Terminos;
    pago:                  Pago;
    primas:                Prima[];
}

export interface Cliente {
    nombre:                                        string;
    apellido:                                      string;
    genero:                                        string;
    fechaNacimiento:                               Date;
    tipoDocumento:                                 string;
    numeroDocumento:                               string;
    telefono:                                      string;
    nacionalidad:                                  string;
    correo:                                        string;
    correoAlterno:                                 null;
    estadoCivil:                                   string;
    ocupacion:                                     string;
    paisResidencia:                                null;
    direccion:                                     Direccion;
}

export interface Direccion {
    provincia: string;
    municipio: string;
    sector:    string;
    edificio:  string;
    calle:     string;
}

export interface Pago {
    pagado: boolean;
}

export interface Prima {
    fraccionamientoPago: string;
    descripcion:         string;
    prima:               number;
    impuesto:            number;
    primaKm:             number;
    cobro:               number;
}

export interface Terminos {
    cupon:               null;
    cuponTipo:           null;
    cuponMonto:          number;
    fraccionamientoPago: string;
    formaPago:           string;
    seguroLey:           string;
    asistenciaVehicular: boolean;
    autoSustituto:       string;
    montoAsegurado:      number;
    extraPrima:          number;
    primaMinima:         null;
    plazo:               number;
    inicioVigencia:      Date;
    finVigencia:         Date;
    fechaEmision:        null;
    fechaCancelacion:    null;
    incluyeDesempleo:    boolean;
    primaFija:           number;
    primaKm:             number;
    prima:               number;
    impuesto:            number;
    totalCobro:          number;
    planAccidentes:      string;
}

export interface Vehiculo {
    idModelo:                            number;
    idMarca:                             number;
    marca:                               string;
    modelo:                              string;
    anio:                                number;
    esCeroKm:                            boolean;
    combustible:                         string;
    tipoGas:                             string;
    tipoInstalacion:                     string;
    cumpleRequisitos:                    boolean;
    esUsoParticularNoDeportivoNoPublico: boolean;
    valor:                               number;
    sumaAsegurada:                       number;
    inspeccion:                          Inspeccion;
}

export interface Inspeccion {
    tipo:       string;
    placa:      string;
    color:      string;
    cilindraje: number;
    puertas:    number;
    chasis:     string;
    motor:      string;
}

export interface DataTerms {
    paymentFraction:     string;
    paymentMethod:       string;
    lawInsurance:        string;
    vehicularAssistance: boolean;
    substituteAuto:      string;
    premium:             number;
    tax:                 number;
    totalAmount:         number;
    _id:                 string;
}
