import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field';
import { CarInsurances } from '../type/types';

import { Controller, type UseFormReturn } from 'react-hook-form';
import type { EstimateFormData } from '../config/EstimeFormConfig';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
        summary:
            'Seguro de Ley con el doble de cobertura que el Plan Base $1MM/$1MM/$2MM.',
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
            <div className='space-y-6 animate-in fade-in-50 duration-500'>
                <Controller
                    control={form.control}
                    name='car.terms.insuranceType'
                    render={({ field, fieldState }) => {
                        const isInvalid = fieldState.invalid;
                        return (
                            <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                                aria-invalid={isInvalid}
                                className='flex flex-col gap-4'>
                                {PLANS.map((plan) => {
                                    const inputId = `insurance-${plan.id}`;
                                    return (
                                        <div
                                            key={plan.id}
                                            className={`relative rounded-lg border-2 bg-card p-4 transition-all hover:shadow-sm ${
                                                field.value ===
                                                String(plan.id)
                                                    ? 'border-kover-widget-primary'
                                                    : 'border-gray-200'
                                            }`}>
                                            <div className='absolute right-3 top-3'>
                                                <RadioGroupItem
                                                    id={inputId}
                                                    value={String(plan.id)}
                                                    className='text-blue-500'
                                                />
                                            </div>
                                            <label
                                                htmlFor={inputId}
                                                className='cursor-pointer select-none'>
                                                <Field>
                                                    <FieldContent>
                                                        <FieldLabel className='text-md'>
                                                            {plan.title}
                                                        </FieldLabel>
                                                        <div className='text-sm text-muted-foreground'>
                                                            {plan.price}
                                                        </div>
                                                        <FieldDescription className='text-[15px] leading-relaxed'>
                                                            {plan.summary}
                                                        </FieldDescription>
                                                    </FieldContent>
                                                </Field>
                                            </label>
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                        );
                    }}
                />
            </div>
        </>
    );
};
