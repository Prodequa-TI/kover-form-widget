import { SelectCarYear } from './SelectType';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { useState, type ChangeEvent } from 'react';
import {
  FuelsType,
  Gas,
  InstallatationType,
  type CarListResponse,
  type CarModels,
} from '../../type/types';
import { SelectFuelType } from './SelectFuelType';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { SelectCarModel } from './SelectBrancModel';
import { Input } from '@/components/ui/input';
import { SelectBrandCar } from './SearchBrandCar';
import { Checkbox } from '@/components/ui/checkbox';
import { formatNumber } from '@/utils';

import { CustomSelect } from '@/shared/CustomSelected';
import { RequerimentsAdaptedInstallationType } from './RequirementAdaptedInstallationType';

interface CarFormProps {
  form: UseFormReturn<EstimateFormData>;
}
const boolOptions = [
  { value: 'true', label: 'Sí' },
  { value: 'false', label: 'No' },
];
const gasOptions = [
  { value: Gas.GLP, label: 'GLP' },
  { value: Gas.GNV, label: 'GNV' },
];
const installationOptions = [
  {
    value: InstallatationType.ADAPTED,
    label: 'Adaptado',
  },
  { value: InstallatationType.TO_BUILD, label: 'De fabrica' },
];
export function CarForm({ form }: CarFormProps) {
  const [models, setModels] = useState<CarModels[]>([]);
  const actualYear = new Date().getFullYear();
  const years = Array.from({ length: 16 }, (_, i) => actualYear - i);
  const brand = form.watch('car.brand');
  const fuelType = form.watch('car.fuelType');
  const installationType = form.watch('car.installationType');
  const gasEnabled = fuelType === FuelsType.GAS;
  const MIN_WORTH = 200_000;
  const MAX_WORTH = 7_000_000;
  const handleGetModels = (brand: string, rawCarList: CarListResponse[]) => {
    const models = rawCarList.find((car) => car.marca === brand)?.modelos ?? [];
    if (!models) return [];
    setModels(models);
    form.setValue('car.modelId', 0);
    form.clearErrors('car.modelId');
  };

  const handleWorthChange = (
    e: ChangeEvent<HTMLInputElement> | string,
    onChange: (value: number | '') => void
  ) => {
    const rawValue = typeof e === 'string' ? e : e.target.value;
    const cleanValue = rawValue.replace(/[^0-9.]/g, '');
    onChange(cleanValue === '' ? '' : Number(cleanValue));
  };

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 ">
        <Controller
          control={form.control}
          name="car.brand"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.brand">Marca</FieldLabel>
              <SelectBrandCar
                field={field}
                handelGetModels={handleGetModels}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.modelId"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.modelId">Modelo</FieldLabel>
              <SelectCarModel
                name={field.name}
                value={field.value === 0 ? undefined : String(field.value)}
                items={models}
                onValueChange={(value) => field.onChange(Number(value))}
                invalid={fieldState.invalid}
                disabled={!brand}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.year"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.year">Año</FieldLabel>
              <SelectCarYear
                items={years}
                name={field.name}
                value={field.value || 0}
                onValueChange={(value) => field.onChange(Number(value))}
                invalid={fieldState.invalid}
                disabled={!brand}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.isNew"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.isNew">Cero km</FieldLabel>
              <CustomSelect
                placeholder="¿Es nuevo?"
                name={field.name}
                value={
                  field.value !== undefined && field.value !== null
                    ? String(field.value)
                    : ''
                }
                options={boolOptions}
                onValueChange={(val) => field.onChange(val === 'true')}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.fuelType"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.fuelType">Combustible</FieldLabel>
              <SelectFuelType
                name={field.name}
                value={field.value || ''}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value !== FuelsType.GAS) {
                    form.setValue('car.gasType', undefined);
                    form.setValue('car.installationType', undefined);
                    form.setValue('car.meetsRequirements', undefined);
                    form.clearErrors(['car.gasType', 'car.installationType']);
                  }
                }}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* 6. TIPO DE GAS (Renderizado Condicional INTEGRADO en el Grid) */}
        {fuelType === FuelsType.GAS && (
          <Controller
            control={form.control}
            name="car.gasType"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Tipo de gas</FieldLabel>
                <CustomSelect
                  placeholder="Selecciona el tipo de gas"
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!gasEnabled}
                  invalid={fieldState.invalid}
                  options={gasOptions}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )}

        {/* 7. TIPO DE INSTALACIÓN (Renderizado Condicional INTEGRADO en el Grid) */}
        {fuelType === FuelsType.GAS && (
          <Controller
            control={form.control}
            name="car.installationType"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Tipo de instalación</FieldLabel>
                <CustomSelect
                  placeholder="Seleccione el tipo de instalación"
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!gasEnabled}
                  invalid={fieldState.invalid}
                  options={installationOptions}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )}
        {installationType === InstallatationType.ADAPTED && (
          <RequerimentsAdaptedInstallationType form={form} />
        )}
        {/* 8. VALOR DEL VEHÍCULO */}
        <Controller
          control={form.control}
          name="car.worth"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.worth">Valor del vehículo</FieldLabel>
              <div className="relative w-full">
                <Input
                  type="text"
                  id="car.worth"
                  inputMode="numeric"
                  placeholder="0.00"
                  value={field.value ? formatNumber(field.value) : ''}
                  onChange={(e) => handleWorthChange(e, field.onChange)}
                  className="mb-2 pl-10"
                  aria-invalid={fieldState.invalid}
                />
                <span
                  className={`pointer-events-none absolute left-3 top-0 flex h-10 items-center text-sm ${
                    fieldState.invalid ? 'text-red-500' : 'text-muted-foreground'
                  }`}
                >
                  RD$
                </span>
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Desde{' '}
                    <span className="font-medium">
                      RD$ {MIN_WORTH.toLocaleString('es-DO')}
                    </span>{' '}
                    hasta{' '}
                    <span className="font-medium">
                      RD$ {MAX_WORTH.toLocaleString('es-DO')}
                    </span>
                  </FieldDescription>
                )}
              </div>
            </Field>
          )}
        />
      </div>

      <div className="col-start-1 col-end-3 mt-4">
        <Controller
          control={form.control}
          name="car.isPersonalUse"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <div className="flex flex-row items-center space-x-3 space-y-0">
                <Checkbox
                  id="car.isPersonalUse"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  className={`data-[state=checked]:bg-kover-widget-primary data-[state=checked]:border-kover-widget-primary ${
                    fieldState.invalid ? 'border-red-500' : 'border-gray-400'
                  }`}
                />
                <label
                  htmlFor="car.isPersonalUse"
                  className="text-sm font-bold text-kover-widget-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Por favor, confirme que es de uso particular y no deportivo ni de uso
                  público/comercial.
                </label>
              </div>

              {/* Mensaje de error justo debajo si no lo marcan */}
              {fieldState.invalid && (
                <p className="text-sm font-medium text-red-500 ml-1">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
}
