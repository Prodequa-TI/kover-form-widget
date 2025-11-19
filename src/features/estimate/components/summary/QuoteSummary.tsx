import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { InsurancesData } from '@/mocks/request.mock';
import { BenefitsSection } from './BenefitsSection';
import { ExclusionsSection } from './ExclusionsSection';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { Button } from '@/components/ui/button';

import {
  CalendarIcon,
  CarIcon,
  CheckCircleIcon,
  FileTextIcon,
  LeafyGreenIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserIcon,
} from 'lucide-react';

interface QuoteSummaryProps {
  insuranceData: InsurancesData;
  handlePayment: (insuranceId: string) => Promise<void>;
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

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'quoted':
      return 'bg-kover-widget-primary text-white';
    case 'active':
      return 'bg-success text-success-foreground';
    case 'pending':
      return 'bg-warning text-warning-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getStatusLabel = (status: string) => {
  switch (status.toLowerCase()) {
    case 'quoted':
      return 'Cotizado';
    case 'active':
      return 'Activo';
    case 'pending':
      return 'Pendiente';
    default:
      return status;
  }
};
export function QuoteSummary({ insuranceData, handlePayment }: QuoteSummaryProps) {
  const [acceptedTerms, setAcceptedTerms] = useState<CheckedState>(false);

  return (
    <>
      <div className="flex flex-col items-center gap-6 mb-4">
        <h1 className="text-3xl text-kover-widget-primary font-semibold">
          Para to que conduces
        </h1>
        <div className="text-green-600 flex justify-center items-center gap-2">
          <LeafyGreenIcon className="size-5" />
          <p className="text-sm">
            Con tu compra ayudarás a sembrar 2 arboles en los bosques de la amazonia.
          </p>
        </div>
        <div className="flex flex-col items-center">
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
                <span className="font-semibold text-lg">Datos de la Póliza</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Número de Cotización
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    #{insuranceData.quoteNumber}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Producto</p>
                  <p className="text-base font-semibold text-foreground">
                    {insuranceData.product}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <div className={`${getStatusColor(insuranceData.status)} w-full p-1`}>
                    {getStatusLabel(insuranceData.status)}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Fecha de Cotización
                  </p>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base font-semibold text-foreground">
                      {formatDate(insuranceData.requestDate)}
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
                <span className="font-semibold text-lg">Tus Datos</span>
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
                      {insuranceData.customer.firstName} {insuranceData.customer.lastName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Documento</p>
                    <p className="text-base font-semibold text-foreground">
                      {insuranceData.customer.documentType === 'cedula'
                        ? 'Cédula'
                        : insuranceData.customer.documentType}
                      : {insuranceData.customer.documentNumber}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base font-semibold text-foreground">
                        {insuranceData.customer.phone}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <div className="flex items-center gap-2">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base font-semibold text-foreground">
                        {insuranceData.customer.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Ocupación</p>
                    <p className="text-base font-semibold text-foreground">
                      {insuranceData.customer.occupation}
                    </p>
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
                    <p className="text-base text-foreground">
                      {insuranceData.customer.address.municipality},{' '}
                      {insuranceData.customer.address.province}
                    </p>
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
                  <p className="text-sm font-medium text-muted-foreground">Placa</p>
                  <p className="text-base font-semibold text-foreground">
                    {insuranceData.vehicle.plate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Año</p>
                  <p className="text-base font-semibold text-foreground">
                    {insuranceData.vehicle.year}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Color</p>
                  <p className="text-base font-semibold text-foreground">
                    {insuranceData.vehicle.color}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tipo de Combustible
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    {insuranceData.vehicle.fuelType}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Valor del Vehículo
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    {formatCurrency(insuranceData.vehicle.value)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Cilindrada</p>
                  <p className="text-base font-semibold text-foreground">
                    {insuranceData.vehicle.displacement} cc
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Puertas</p>
                  <p className="text-base font-semibold text-foreground">
                    {insuranceData.vehicle.doors}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Chasis</p>
                  <p className="text-base font-semibold text-foreground">
                    {insuranceData.vehicle.chassis}
                  </p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Motor</p>
                  <p className="text-base font-semibold text-foreground">
                    {insuranceData.vehicle.engine}
                  </p>
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
                typeInsurance="A-KM"
              ></BenefitsSection>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-5 w-5 text-kover-widget-primary" />
                <span className="font-semibold text-lg">
                  Exlusiones y consideraciones
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <ExclusionsSection></ExclusionsSection>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="m-[20px]">
        <div className="flex items-center justify-center gap-2">
          <Checkbox id="terms" onCheckedChange={(e) => setAcceptedTerms(e)}></Checkbox>
          <Label htmlFor="terms">
            He leído y acepto los
            <a
              target="_blank"
              href="https://app-unit-corefrontend-desa-eastus.azurewebsites.net/terminos-y-condiciones"
              className="text-[#0671AD]"
            >
              términos y condiciones
            </a>
          </Label>
        </div>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10 w-full">
          <Button
            variant="secondary"
            className="h-11 px-10 cursor-pointer w-full md:w-44"
            onClick={() => console.log('click')}
          >
            ATRÁS
          </Button>
          <Button
            disabled={!acceptedTerms as boolean}
            onClick={() => handlePayment(insuranceData.id)}
            className="w-full md:w-44 h-11 px-10 bg-orange-500 hover:bg-orange-600 text-base font-semibold cursor-pointer"
          >
            Ir al pago!
          </Button>
        </div>
      </div>
    </>
  );
}
