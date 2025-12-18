import { Controller, type UseFormReturn } from 'react-hook-form';
import { ReplacementsCar } from '../type/types';
import type { EstimateFormData } from '../config/EstimeFormConfig';
import { Field, FieldDescription } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Plan = {
  id: ReplacementsCar;
  title: string;
  price?: string;
  summary?: string;
};

const REPLACEMENT_CAR: Plan[] = [
  {
    id: ReplacementsCar.UBER,
    title: 'Uber',
    price: 'RD$133/mes',
    summary: 'Seguro de Ley con cobertura de $500/$500/$1MM.',
  },
  {
    id: ReplacementsCar.RENT_A_CAR,
    title: 'Rent-a-Car',
    price: 'RD$329/mes',
    summary: 'Recibirás un auto compacto por hasta 15 días en un año.',
  },
  {
    id: ReplacementsCar.NONE,
    title: 'No',
  },
];

type ReplaceCarProps = {
  form: UseFormReturn<EstimateFormData>;
};
export const ReplaceCar = ({ form }: ReplaceCarProps) => {
  return (
    <>
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        <Controller
          control={form.control}
          name="car.terms.replacementCar"
          render={({ field, fieldState }) => {
            const isInvalid = fieldState.invalid;
            return (
              <Field>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger
                    className={`w-full ${isInvalid ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Selecciona un auto..." />
                  </SelectTrigger>
                  <SelectContent>
                    {REPLACEMENT_CAR.map((replace) => (
                      <SelectItem key={replace.id} value={String(replace.id)}>
                        <span className="font-medium ">{replace.title}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
