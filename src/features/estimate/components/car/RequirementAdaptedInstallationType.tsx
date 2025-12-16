import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { RequirimentsAdaptedModal } from './RequerimentsAdaptedModal';
import { useState } from 'react';

interface RequerimentsAdaptedInstallationTypeProps {
  form: UseFormReturn<EstimateFormData>;
}

export const RequerimentsAdaptedInstallationType = ({
  form,
}: RequerimentsAdaptedInstallationTypeProps) => {
  const selectedStyles = 'bg-kover-widget-primary text-white hover:opacity-95';
  const noSelectedStyles = 'bg-gray-300 text-gray-700 hover:bg-gray-400';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name="car.meetsRequirements"
            render={({ field, fieldState }) => (
              <Field className="flex flex-col items-center justify-center gap-4">
                <FieldLabel>
                  <div className="flex gap-2 justify-center items-center">
                    <p>Exigencias de adaptación</p>

                      <Info className='text-[#301fe6] text-xs cursor-pointer' onClick={() => setIsOpen(true)}></Info>

                  </div>
                </FieldLabel>
                <div className="grid grid-cols-2 gap-3 w-full">
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
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <RequirimentsAdaptedModal open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
};
