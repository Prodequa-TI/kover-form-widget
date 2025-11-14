import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import type { Municipality, Occupations, Province } from '../../type/types';
import {
    getMunicipalities,
    getProvinces,
} from '../../services/direction.service';
import { OcuppationInput } from './OcuppationSelect';
import { getOccupations } from '../../services/ocupation.service';
import type { AdditionalDataFormData } from './AdditionalDataFormWrapper';
interface AddressFormProps {
    form: UseFormReturn<AdditionalDataFormData>;
}

export const AddressForm = ({ form }: AddressFormProps) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    const [occupation, setOccupation] = useState<Occupations[]>([]);
    const selectedProvince = form.watch('customer.address.province');
    useEffect(() => {
        const provincesList = getProvinces();
        setProvinces(provincesList);
    }, []);
    useEffect(() => {
        const occupations = getOccupations();
        setOccupation(occupations);
    }, []);

    // Cargar municipios cuando cambia la provincia
    useEffect(() => {
        if (selectedProvince) {
            // Buscar el ID de la provincia basado en el nombre
            const province = provinces.find(p => p.nombre === selectedProvince);
            if (province) {
                const municipalitiesList = getMunicipalities(province.id);
                setMunicipalities(municipalitiesList);
            } else {
                setMunicipalities([]);
            }
        } else {
            setMunicipalities([]);
        }
    }, [selectedProvince, provinces]);
    return (
        <div className='flex flex-col gap-4 md:grid md:grid-cols-2'>
            <div className='col-start-1 col-end-3'>
                <Controller
                    control={form.control}
                    name='customer.occupation'
                    render={({ field, fieldState }) => (
                        <Field data-invaliud={fieldState.invalid}>
                            <FieldLabel htmlFor=''>Ocupación</FieldLabel>
                            <OcuppationInput
                                name={field.name}
                                value={
                                    field.value === ''
                                        ? undefined
                                        : String(field.value)
                                }
                                onValueChange={field.onChange}
                                items={occupation}
                            />
                        </Field>
                    )}
                />
            </div>
            <Controller
                control={form.control}
                name='customer.address.street'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='address.street'>
                            Calle y número
                        </FieldLabel>
                        <Input
                            type='text'
                            id={field.name}
                            placeholder='Calle y número'
                            className='bg-[#F8FAFC]'
                            {...field}
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name='customer.address.province'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='address.province'>
                            Provincia
                        </FieldLabel>
                        <Select
                            name={field.name}
                            value={field.value || ''}
                            onValueChange={(value) => {
                                field.onChange(value);
                                form.setValue(
                                    'customer.address.municipality',
                                    ''
                                );
                                form.clearErrors([
                                    'customer.address.municipality',
                                ]);
                            }}>
                            <SelectTrigger
                                id='address.province'
                                aria-invalid={fieldState.invalid}
                                className='bg-[#F8FAFC]'>
                                <SelectValue placeholder='Provincia' />
                            </SelectTrigger>
                            <SelectContent className='bg-popover z-50'>
                                {provinces.map((prov) => (
                                    <SelectItem
                                        key={prov.id}
                                        value={prov.nombre}>
                                        {prov.nombre}
                                    </SelectItem>
                                ))}
                                {/* Agregar más provincias según necesites */}
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name='customer.address.municipality'
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor='customer.address.municipality'>
                            Municipio
                        </FieldLabel>
                        <Select
                            name={field.name}
                            value={field.value || ''}
                            onValueChange={(value) => {
                                field.onChange(value);
                            }}
                            disabled={!form.watch('customer.address.province')}>
                            <SelectTrigger
                                id='address.municipality'
                                aria-invalid={fieldState.invalid}
                                className='bg-[#F8FAFC]'>
                                <SelectValue placeholder='Municipio' />
                            </SelectTrigger>
                            <SelectContent className='bg-popover z-50'>
                                {municipalities.map((muni) => (
                                    <SelectItem
                                        key={muni.id}
                                        value={muni.nombre}>
                                        {muni.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
        </div>
    );
};
