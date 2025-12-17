import { Field, FieldDescription } from '@/components/ui/field';
import { CarInsurances } from '../../type/types';

import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Plan = {
  id: CarInsurances;
  title: string;
  price: string;
  summary: string;
};

const PLANS: Plan[] = [
  {
    id: CarInsurances.BASE,
    title: 'Base',
    price: 'RD$463/mes',
    summary: 'Seguro de Ley con cobertura de $500/$500/$1MM.',
  },
  {
    id: CarInsurances.PLUS,
    title: 'Plus',
    price: 'RD$513/mes',
    summary: 'Seguro de Ley con el doble de cobertura que el Plan Base $1MM/$1MM/$2MM.',
  },
  {
    id: CarInsurances.AUTO_EXCESO,
    title: 'Auto Exceso',
    price: 'RD$655/mes',
    summary:
      'Máxima protección. Este plan aumenta en $5MM tu cobertura de Responsabilidad Civil, en exceso sobre la cobertura del plan Plus.',
  },
];

interface PlansAccordionProps {
  form: UseFormReturn<EstimateFormData>;
}
export const LawInsuranceForm = ({ form }: PlansAccordionProps) => {
  return (
    <>
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        <Controller
          control={form.control}
          name="car.terms.insuranceType"
          render={({ field, fieldState }) => {
            const isInvalid = fieldState.invalid;
            const selectedPlan = PLANS.find((p) => String(p.id) === field.value);

            return (
              <Field data-invalid={isInvalid}>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`w-full ${isInvalid ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Selecciona un plan..." />
                  </SelectTrigger>

                  <SelectContent>
                    {PLANS.map((plan) => (
                      <SelectItem key={plan.id} value={String(plan.id)}>
                        <span className="font-medium ">{plan.title}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPlan && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-md border text-sm text-slate-600 animate-in fade-in zoom-in-95 duration-200">
                    <p className="font-semibold text-kover-widget-primary mb-1">
                      {selectedPlan.title} - {selectedPlan.price}
                    </p>
                    <p>{selectedPlan.summary}</p>
                  </div>
                )}

                {/* Mensaje de Error */}
                {isInvalid && (
                  <FieldDescription className="text-red-500 mt-2">
                    {fieldState.error?.message}
                  </FieldDescription>
                )}
              </Field>
            );
          }}
        />
      </div>
    </>
  );
};
