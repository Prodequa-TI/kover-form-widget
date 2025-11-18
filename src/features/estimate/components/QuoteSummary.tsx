import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { InsurancesData } from "@/mocks/request.mock";
import { BenefitsSection } from "./summary/BenefitsSection";
import { ExclusionsSection } from "./summary/ExclusionsSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";

interface QuoteSummaryProps {
  insuranceData: InsurancesData;
  handlePayment: (insuranceId: string) => Promise<void>;
}

export function QuoteSummary({ insuranceData, handlePayment }: QuoteSummaryProps) {
  const [acceptedTerms, setAcceptedTerms] = useState<CheckedState>(false);

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Datos de la Póliza</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Datos de la poliza</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Tus Datos</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Info cliente</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Vehículo</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Datos del vehículo</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Beneficios</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <BenefitsSection
              terms={insuranceData.terms}
              typeInsurance="A-KM"
            ></BenefitsSection>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Exclusiones y Consideraciones</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <ExclusionsSection></ExclusionsSection>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex items-center justify-center gap-2">
        <Checkbox
          id="terms"
          onCheckedChange={(e) => setAcceptedTerms(e)}
        ></Checkbox>
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
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <Button
          variant="secondary"
          className="h-11 px-10 cursor-pointer w-full md:w-44"
          onClick={() => console.log("click")}
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
  );
}
