import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import { BenefitsSection } from './BenefitsSection';
import { ExclusionsSection } from './ExclusionsSection';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { Button } from '@/components/ui/button';

import {
  AlertCircleIcon,
  Calendar,
  CarFront,
  CarIcon,
  CheckCircleIcon,
  FileTextIcon,
  Fuel,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserIcon,
} from 'lucide-react';
import type { FlowStep } from '../../type/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { InsurancesType } from '@/mocks/summary.mock';

interface QuoteSummaryProps {
  insuranceData: InsurancesData;
  handlePayment: (insuranceId: string) => Promise<void>;
  handleStep: (step: FlowStep) => void;
  isCheckoutOpen: boolean;
  paymentErrorMessage: string;
  insuranceType: InsurancesType;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
  }).format(amount);
};

const formatDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString('es-DO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function QuoteSummary({
  insuranceData,
  handlePayment,
  handleStep,
  isCheckoutOpen,
  paymentErrorMessage,
  insuranceType,
}: QuoteSummaryProps) {
  const [acceptedTerms, setAcceptedTerms] = useState<CheckedState>(false);
  // const formatYears = (totalMonths: number) => {
  //   const years = Math.floor(totalMonths / 12);
  //   const months = totalMonths % 12; //
  //   if (totalMonths === 0) {
  //     return '0 meses';
  //   }
  //   let result = '';
  //   if (years > 0) {
  //     const yearText = years === 1 ? 'año' : 'años';
  //     result += years + ' ' + yearText;
  //   } else if (months > 0) {
  //     const monthText = months === 1 ? 'mes' : 'meses';
  //     const monthString = months + ' ' + monthText;
  //     if (result.length > 0) {
  //       result += ' y ';
  //     }
  //     result += monthString;
  //   }
  //   return result;
  // };
  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-4">
        <h1 className="text-2xl text-slate-900 font-semibold">
          Por lo que conduces
        </h1>
        <div className="flex flex-col items-center text-slate-500">
          <p className="text-sm">Aquí te mostramos lo que estas contratando,</p>
          <p className="text-sm">por favor revisa que todo este correcto.</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileTextIcon className="h-5 w-5 text-kover-widget-primary" />
                <span className="font-semibold text-lg">Datos de la póliza</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Prima fija mensual
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    {formatCurrency(
                      insuranceData.quotationResponse.data.terminos.primaFija
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tarifa x KM:
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    {formatCurrency(
                      insuranceData.quotationResponse.data.terminos.primaKm
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Plazo de seguro
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    12 meses {/* {formatYears(insuranceData.quotationResponse.data.terminos.plazo)} */}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Monto asegurado
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-foreground">
                      {formatCurrency(
                        insuranceData.quotationResponse.data.terminos.montoAsegurado
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b last:border-b-0">
            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <UserIcon className="h-5 w-5 text-kover-widget-primary" />
                <span className="font-semibold text-lg">Tus datos</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Nombre Completo
                    </p>
                    <p className="text-base font-semibold text-foreground">
                      {insuranceData.quotationResponse.data.cliente.nombre}{' '}
                      {insuranceData.quotationResponse.data.cliente.apellido}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Documento</p>
                    <p className="text-base font-semibold text-foreground">
                      {insuranceData.quotationResponse.data.cliente.tipoDocumento ===
                      'cedula'
                        ? 'Cédula'
                        : insuranceData.quotationResponse.data.cliente.tipoDocumento}
                      : {insuranceData.quotationResponse.data.cliente.numeroDocumento}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Fecha de nacimiento
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base font-semibold text-foreground">
                        {formatDate(
                          insuranceData.quotationResponse.data.cliente.fechaNacimiento
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base font-semibold text-foreground">
                        {insuranceData.quotationResponse.data.cliente.telefono}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <div className="flex items-center gap-2">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base font-semibold text-foreground">
                        {insuranceData.quotationResponse.data.cliente.correo}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    Dirección
                  </p>
                  <div className="pl-6 space-y-1">
                    <p className="text-base text-foreground">
                      {insuranceData.customer.address.street}
                    </p>
                    {insuranceData.customer.address.sector && (
                      <p className="text-base text-foreground">
                        Sector: {insuranceData.customer.address.sector}
                      </p>
                    )}
                    <p className="text-base text-foreground">
                      {insuranceData.customer.address.municipality},{' '}
                      {insuranceData.customer.address.province}
                    </p>
                    {insuranceData.customer.address.referencePoint && (
                      <p className="text-sm text-muted-foreground italic">
                        Referencia: {insuranceData.customer.address.referencePoint}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b last:border-b-0">
            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <CarIcon className="h-5 w-5 text-kover-widget-primary" />
                <span className="font-semibold text-lg">Vehículo</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Marca</p>
                  <div className="flex items-center gap-2">
                    <CarFront className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base font-semibold text-foreground">
                      {insuranceData.quotationResponse.data.vehiculo.marca}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Modelo</p>
                  <div className="flex items-center gap-2">
                    <CarFront className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base font-semibold text-foreground">
                      {insuranceData.quotationResponse.data.vehiculo.modelo}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Año</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base font-semibold text-foreground">
                      {insuranceData.quotationResponse.data.vehiculo.anio}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tipo de Combustible
                  </p>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base font-semibold text-foreground">
                      {insuranceData.quotationResponse.data.vehiculo.combustible}
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-5 w-5 text-kover-widget-primary" />
                <span className="font-semibold text-lg">Beneficios</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <BenefitsSection
                terms={insuranceData.terms}
                typeInsurance={insuranceType}
              ></BenefitsSection>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-5 w-5 text-kover-widget-primary" />
                <span className="font-semibold text-lg">
                  Exclusiones y consideraciones
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <ExclusionsSection typeInsurance={insuranceType}></ExclusionsSection>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="m-5">
        <div className="flex items-center justify-center gap-2">
          <Checkbox id="terms" onCheckedChange={(e) => setAcceptedTerms(e)}></Checkbox>
          <Label htmlFor="terms">
            He leído y acepto los
            <a
              target="_blank"
              href="https://app-unit-corefrontend-desa-eastus.azurewebsites.net/terminos-y-condiciones"
              className="text-kover-widget-primary hover:underline"
            >
              términos y condiciones
            </a>
          </Label>
        </div>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10 w-full">
          <Button
            variant="secondary"
            className="h-11 px-10 cursor-pointer w-full md:w-44"
            onClick={() => handleStep('additional-data')}
            disabled={isCheckoutOpen}
          >
            ATRÁS
          </Button>
          <Button
            disabled={(!acceptedTerms as boolean) || isCheckoutOpen}
            onClick={() => handlePayment(insuranceData.id)}
            className="w-full md:w-44 h-11 px-10 bg-kover-widget-primary hover:bg-kover-widget-primary-hover text-base font-semibold cursor-pointer"
          >
            PAGAR
          </Button>
        </div>

        <div className="flex items-center justify-center ">
          {(isCheckoutOpen || paymentErrorMessage) && (
            <Alert variant="default" className="mt-10 w-[70%] md:w-[50%]">
              <AlertCircleIcon />
              <AlertTitle>
                {isCheckoutOpen && 'Obteniendo enlace de pago...'}
                {paymentErrorMessage && 'Error en el proceso de pago'}
              </AlertTitle>
              <AlertDescription>
                {paymentErrorMessage && paymentErrorMessage}
                {isCheckoutOpen &&
                  'Por favor, complete el proceso de pago antes de cerrarlo!'}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}
