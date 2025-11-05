import { Controller, type UseFormReturn } from 'react-hook-form';
import { ReplacementsCar } from '../type/types';
import type { EstimateFormData } from '../config/EstimeFormConfig';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field';

type Plan = {
    id: ReplacementsCar;
    title: string;
    price?: string;
    summary?: string;
};

const REPLACEMENT_CAR: Plan[] = [
    {
        id: ReplacementsCar.UBER,
        title: 'UBER',
        price: 'RD$133/mes',
        summary: 'Seguro de Ley con cobertura de $500/$500/$1MM.',
    },
    {
        id: ReplacementsCar.RENT_A_CAR,
        title: 'RENTA UN AUTO',
        price: 'RD$329/mes',
        summary: 'Recibirás un auto compacto por hasta 15 días en un año.',
    },
    {
        id: ReplacementsCar.NONE,
        title: 'NO, GRACIAS',
    },
];

type ReplaceCarProps = {
    form: UseFormReturn<EstimateFormData>;
};
export const ReplaceCar = ({ form }: ReplaceCarProps) => {
    return (
        <>
            <div className='space-y-6 animate-in fade-in-50 duration-500'>
                <Controller
                    control={form.control}
                    name='car.terms.replacementCar'
                    render={({ field, fieldState }) => {
                        const isInvalid = fieldState.invalid;
                        return (
                            <RadioGroup
                                name={field.name}
                                value={field.value || ''}
                                onValueChange={(value) => field.onChange(value)}
                                aria-invalid={isInvalid}
                                className='flex flex-col gap-4'>
                                {REPLACEMENT_CAR.map((replace) => {
                                    const inputId = `replacement-${replace.id}`;
                                    return (
                                        <div
                                            key={replace.id}
                                            className='relative rounded-lg border-widget-primary border bg-card p-4 transition-all hover:shadow-sm '>
                                            <div className='absolute right-3 top-3'>
                                                <RadioGroupItem
                                                    id={inputId}
                                                    value={String(replace.id)}
                                                    className='text-blue-700'
                                                />
                                            </div>
                                            <label
                                                htmlFor={inputId}
                                                className='cursor-pointer select-none'>
                                                <Field>
                                                    <FieldContent>
                                                        <FieldLabel
                                                            htmlFor={inputId}
                                                            className='text-md'>
                                                            {replace.title}
                                                        </FieldLabel>
                                                        <div className='text-sm text-muted-foreground'>
                                                            {replace.price}
                                                        </div>
                                                        <FieldDescription className='text-[15px] leading-relaxed'>
                                                            {replace.summary}
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
