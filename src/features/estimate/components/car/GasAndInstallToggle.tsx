import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { Gas, InstallatationType } from '../../type/types';
import { CustomSelect } from '@/shared/CustomSelected';
import { RequerimentsAdaptedInstallationType } from './RequirementAdaptedInstallationType';
interface CarFormProps {
  form: UseFormReturn<EstimateFormData>;
  gasEnabled: boolean;
}
const gasOptions = [
  { value: Gas.GLP, label: 'GLP (Gas Licuado de Petróleo)' },
  { value: Gas.GNV, label: 'GNV (Gas Natural Vehicular)' },
];
const installationOptions = [
  {
    value: InstallatationType.ADAPTED,
    label: 'Adaptado',
  },
  { value: InstallatationType.TO_BUILD, label: 'De fabrica' },
];
export const GasAndInstallToggle = ({ form, gasEnabled }: CarFormProps) => {
  const installationType = form.watch('car.installationType');
  return (
    <>
      <Controller
        control={form.control}
        name="car.gasType"
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="flex flex-col items-center justify-center gap-4"
          >
            <FieldLabel>Tipo de gas</FieldLabel>
            <CustomSelect
              placeholder="Seleccione su tipo de gas"
              name={field.name}
              value={field.value}
              options={gasOptions}
              invalid={fieldState.invalid}
              onValueChange={(value) => field.onChange(value)}
              disabled={!gasEnabled}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="car.installationType"
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="flex flex-col items-center justify-center gap-4"
          >
            <FieldLabel>Tipo de instalación</FieldLabel>
            <CustomSelect
              name={field.name}
              placeholder="selecciona una instalación"
              value={field.value}
              invalid={fieldState.invalid}
              onValueChange={(value) => field.onChange(value)}
              disabled={!gasEnabled}
              options={installationOptions}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {installationType === InstallatationType.ADAPTED && (
        <RequerimentsAdaptedInstallationType form={form} />
      )}
    </>
  );
};
