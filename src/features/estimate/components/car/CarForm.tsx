import { SelectCarYear } from './SelectType';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { useEffect, useMemo, useState } from 'react';
import {
    FuelsType,
    type CarListResponse,
    type CarModels,
} from '../../type/types';
import { getCars } from '../../services/car-estimate.service';
import { SelectCarBrand } from './SelectBrandCar';
import { fuelTypes } from '@/mocks/car-data.mock';
import { SelectFuelType } from './SelectFuelType';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../../config/EstimeFormConfig';
import { Switch } from '@/components/ui/switch';
import { GasAndInstallToggel } from './GasAndInstallToggel';
import { SelectCarModel } from './SelectBrancModel';
import { CurrencyInput } from '@/components/ui/currency-input';

interface CarFormProps {
    form: UseFormReturn<EstimateFormData>;
}

export function CarForm({ form }: CarFormProps) {
    const [carsList, setCarsList] = useState<CarListResponse[]>([]);
    const [models, setModels] = useState<CarModels[]>([]);

    const actualYear = new Date().getFullYear();
    const years = Array.from({ length: 16 }, (_, i) => actualYear - i);
    const cars = useMemo(() => carsList.map((c) => c.marca), [carsList]);
    const brand = form.watch('car.brand');
    const fuelType = form.watch('car.fuelType');
    // const worth = form.watch('car.worth');
    const gasEnabled = fuelType === FuelsType.GAS;
    const MIN_WORTH = 200_000;
    const MAX_WORTH = 7_000_000;
    const handleGetModels = (brand: string) => {
        const models =
            carsList.find((car) => car.marca === brand)?.modelos ?? [];
        if (!models) return [];
        setModels(models);
        // Limpiar modelo cuando cambias marca
        form.setValue('car.modelId', 0);
        form.clearErrors('car.modelId');
    };

    useEffect(() => {
        getCars().then((cars) => setCarsList(cars));
    }, []);

    return (
        <>
            <div className='space-y-6 animate-in fade-in-50 duration-500'>
                <div className='grid grid-cols-2 gap-4 '>
                    <Controller
                        control={form.control}
                        name='car.brand'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <SelectCarBrand
                                    name={field.name}
                                    value={field.value ?? ''}
                                    items={cars}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        handleGetModels(value);
                                    }}
                                    invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='car.modelId'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <SelectCarModel
                                    name={field.name}
                                    value={
                                        field.value === 0
                                            ? undefined
                                            : String(field.value)
                                    }
                                    items={models}
                                    onValueChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                    invalid={fieldState.invalid}
                                    disabled={!brand}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='car.year'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <SelectCarYear
                                    items={years}
                                    name={field.name}
                                    value={field.value || 0}
                                    onValueChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                    invalid={fieldState.invalid}
                                    disabled={!brand}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <Controller
                        control={form.control}
                        name='car.isNew'
                        render={({ field, fieldState }) => (
                            <Field
                                orientation='horizontal'
                                data-invalid={fieldState.invalid}
                                className='flex flex-row items-center justify-between rounded-lg border p-4 bg-card'>
                                <FieldContent>
                                    <FieldLabel htmlFor='form-rhf-complex-emailNotifications'>
                                        Vehiculo nuevo
                                    </FieldLabel>
                                    <FieldDescription>
                                        ¿Tu auto es nuevo?
                                    </FieldDescription>
                                </FieldContent>
                                <Switch
                                    id='car.isNew'
                                    name={field.name}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                    className='bg-indigo-500'
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='car.isPersonalUse'
                        render={({ field, fieldState }) => (
                            <Field
                                orientation='horizontal'
                                data-invalid={fieldState.invalid}
                                className='flex flex-row items-center justify-between rounded-lg border p-4 bg-card'>
                                <FieldContent>
                                    <FieldLabel htmlFor='form-rhf-complex-emailNotifications'>
                                        Uso Personal
                                    </FieldLabel>
                                    <FieldDescription>
                                        Confirma que es de uso particular, no de
                                        uso comercial ni es un auto deportivo
                                    </FieldDescription>
                                </FieldContent>
                                <Switch
                                    id='car.isPersonalUse'
                                    name={field.name}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                    className='bg-indigo-500'
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <Controller
                    control={form.control}
                    name='car.fuelType'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor='car.fuelType'>
                                Tipo de combustible
                            </FieldLabel>
                            <SelectFuelType
                                items={fuelTypes}
                                name={field.name}
                                value={
                                    field.value !== undefined
                                        ? String(field.value)
                                        : ''
                                }
                                onValueChange={(value) => {
                                    const valueNumber = Number(value);
                                    field.onChange(Number(valueNumber));
                                    if (valueNumber !== FuelsType.GAS) {
                                        form.setValue('car.gasType', undefined);
                                        form.setValue(
                                            'car.installationType',
                                            undefined
                                        );
                                        form.clearErrors([
                                            'car.gasType',
                                            'car.installationType',
                                        ]);
                                    }
                                }}
                            />
                        </Field>
                    )}
                />
                {fuelType === FuelsType.GAS && (
                    <GasAndInstallToggel form={form} gasEnabled={gasEnabled} />
                )}
            </div>
            <div className=''>
                <Controller
                    control={form.control}
                    name='car.worth'
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Valor del vehículo</FieldLabel>
                            <div className='relative w-full'>
                                <CurrencyInput
                                    currency='RD'
                                    thousandsSeparator=','
                                    decimalSeparator='.'
                                    decimalPlaces={2}
                                    min={MIN_WORTH}
                                    max={MAX_WORTH}
                                    placeholder='0.00'
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    className='mb-2'
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid ? (
                                    <FieldError errors={[fieldState.error]} />
                                ) : (
                                    <FieldDescription>
                                        Aseguramos vehículos desde{' '}
                                        <span className='font-medium'>
                                            RD$
                                            {MIN_WORTH.toLocaleString('es-DO')}
                                        </span>{' '}
                                        hasta{' '}
                                        <span className='font-medium'>
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
        </>
    );
}
