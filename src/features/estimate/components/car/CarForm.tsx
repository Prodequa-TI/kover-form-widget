import { SelectCarYear } from './SelectType';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { useState } from 'react';
import { FuelsType, type CarListResponse, type CarModels } from '../../type/types';
import { SelectFuelType } from './SelectFuelType';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { SelectCarModel } from './SelectBrancModel';
import { Input } from '@/components/ui/input';
import { GasAndInstallToggle } from './GasAndInstallToggle';
import { SelectBrandCar } from './SearchBrandCar';
import { Checkbox } from '@/components/ui/checkbox';

interface CarFormProps {
  form: UseFormReturn<EstimateFormData>;
}

export function CarForm({ form }: CarFormProps) {
  const [models, setModels] = useState<CarModels[]>([]);

  const actualYear = new Date().getFullYear();
  const years = Array.from({ length: 16 }, (_, i) => actualYear - i);
  const brand = form.watch('car.brand');
  const fuelType = form.watch('car.fuelType');
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

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 ">
        <Controller
          control={form.control}
          name="car.brand"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.brand">Marca del vehículo</FieldLabel>
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

        <div className="md:col-start-1 md:col-end-3">
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
        </div>
        <Controller
          control={form.control}
          name="car.isNew"
          render={({ field, fieldState }) => (
            <label htmlFor="car.isNew" className="cursor-pointer select-none">
              <Field
                orientation="horizontal"
                data-invalid={fieldState.invalid}
                className="flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-gray-50 transition-colors "
              >
                <Checkbox
                  id="car.isNew"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldContent>
                  <FieldLabel htmlFor="car.isNew">Vehículo nuevo</FieldLabel>
                  <FieldDescription>
                    Selecciona esta opción si el auto no ha sido previamente registrado o
                    usado.
                  </FieldDescription>
                </FieldContent>
              </Field>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </label>
          )}
        />
        <Controller
          control={form.control}
          name="car.isPersonalUse"
          render={({ field, fieldState }) => {
            const isInvalid = fieldState.invalid;
            return (
              <label htmlFor="car.isPersonalUse" className="cursor-pointer select-none">
                <Field
                  data-invalid={isInvalid}
                  aria-invalid={isInvalid}
                  orientation="horizontal"
                  className="flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-gray-50 transition-colors data-[invalid=true]:border-red-500 mb-2"
                >
                  <Checkbox
                    id="car.isPersonalUse"
                    name={field.name}
                    aria-invalid={isInvalid}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                  />
                  <FieldContent>
                    <FieldLabel>Vehículo de uso personal</FieldLabel>
                    <FieldDescription>
                      Usarás tu vehículo solo para actividades personales, no comerciales.
                    </FieldDescription>
                  </FieldContent>
                </Field>
                {isInvalid && <FieldError errors={[fieldState.error]} />}
              </label>
            );
          }}
        />
        <Controller
          control={form.control}
          name="car.fuelType"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car.fuelType">Tipo de combustible</FieldLabel>
              <SelectFuelType
                name={field.name}
                value={field.value || ''}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value !== FuelsType.GAS) {
                    form.setValue('car.gasType', undefined);
                    form.setValue('car.installationType', undefined);
                    form.clearErrors(['car.gasType', 'car.installationType']);
                  }
                }}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="car.worth"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Valor del vehículo</FieldLabel>
              <div className="relative w-full">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="0.00"
                  value={field.value || ''}
                  onChange={(value) => field.onChange(value)}
                  className="mb-2"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Aseguramos vehículos desde{' '}
                    <span className="font-medium">
                      RD$
                      {MIN_WORTH.toLocaleString('es-DO')}
                    </span>{' '}
                    hasta{' '}
                    <span className="font-medium">
                      RD$
                      {MAX_WORTH.toLocaleString('es-DO')}
                    </span>
                    .
                  </FieldDescription>
                )}
              </div>
            </Field>
          )}
        />
      </div>
      {fuelType === FuelsType.GAS && (
        <GasAndInstallToggle form={form} gasEnabled={gasEnabled} />
      )}
    </>
  );
}
