import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Info } from 'lucide-react';
import { RequirimentsAdaptedModal } from './RequerimentsAdaptedModal';
import { useState } from 'react';
import { CustomSelect } from '@/shared/CustomSelected';

interface RequerimentsAdaptedInstallationTypeProps {
  form: UseFormReturn<EstimateFormData>;
}
const RequierementAdaptedInstllationOption = [
  { value: 'true', label: 'Si cumple' },
  { value: 'false', label: 'No cumple' },
];
export const RequerimentsAdaptedInstallationType = ({
  form,
}: RequerimentsAdaptedInstallationTypeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Controller
        control={form.control}
        name="car.meetsRequirements"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>
              <div className="flex gap-2 justify-center items-center">
                <p>Exigencias de adaptación</p>

                <Info
                  className="text-kover-widget-primary text-xs cursor-pointer size-4"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </FieldLabel>
            <CustomSelect
              name={field.name}
              value={
                field.value !== undefined && field.value !== null
                  ? String(field.value)
                  : ''
              }
              onValueChange={(value) => field.onChange(value)}
              options={RequierementAdaptedInstllationOption}
            />
            {/* <div className="grid grid-cols-2 gap-3 w-full">
                <Button
                  type="button"
                  onClick={() => field.onChange(true)}
                  className={`py-2.5 px-5 rounded-md border-none transition-colors w-full cursor-pointer
                    ${field.value ? selectedStyles : noSelectedStyles}
                  `}
                >
                  Si cumple
                </Button>
                <Button
                  type="button"
                  onClick={() => field.onChange(false)}
                  className={`py-2.5 px-5 rounded-md border-none transition-colors w-full cursor-pointer
                  ${field.value === false ? selectedStyles : noSelectedStyles}`}
                >
                  No cumple
                </Button>
              </div> */}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <RequirimentsAdaptedModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
