import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { useEffect, useState, useMemo } from 'react';
import type { Municipality, Occupations, Province } from '../../type/types';
import { getMunicipalities, getProvinces } from '../../services/direction.service';
import { OcuppationInput } from './OcuppationSelect';
import { getOccupations } from '../../services/ocupation.service';
import type { AdditionalDataFormData } from './AdditionalDataFormWrapper';
import { Switch } from '@/components/ui/switch';
import { PolicyData } from './PoliticalData';
import { PoliticalExposeData } from './PoliticalExposeData';
interface AddressFormProps {
  form: UseFormReturn<AdditionalDataFormData>;
}

export const AddressForm = ({ form }: AddressFormProps) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [occupation, setOccupation] = useState<Occupations[]>([]);

  // Optimización: usar useMemo para evitar cálculos innecesarios
  const selectedProvince = form.watch('customer.address.province');
  const selectedMunicipality = form.watch('customer.address.municipality');
  const street = form.watch('customer.address.street');
  const isReferencePoint = form.watch('customer.address.referencePoint');
  const isStreetValid = useMemo(() => street && street.length >= 3, [street]);
  const politicallyExposed = form.watch('customer.dueDiligence.politicallyExposed');

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
      const province = provinces.find((p) => p.nombre === selectedProvince);
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
  // Optimización: usar useEffect con un debounce implícito o solo cuando sea necesario
  useEffect(() => {
    if (
      !isReferencePoint &&
      !isStreetValid &&
      (selectedProvince || selectedMunicipality)
    ) {
      form.setValue('customer.address.province', '', { shouldValidate: false });
      form.setValue('customer.address.municipality', '', { shouldValidate: false });
      form.setValue('customer.address.sector', '', { shouldValidate: false });
      form.setValue('customer.address.referencePoint', '', { shouldValidate: false });
      form.clearErrors([
        'customer.address.province',
        'customer.address.municipality',
        'customer.address.sector',
        'customer.address.referencePoint',
      ]);
    }
  }, [isReferencePoint, isStreetValid, selectedProvince, selectedMunicipality, form]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-kover-widget-primary">
            Información Laboral
          </h3>
        </div>

        <Controller
          control={form.control}
          name="customer.occupation"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="customer.occupation">Ocupación</FieldLabel>
              <OcuppationInput
                name={field.name}
                value={field.value === '' ? undefined : String(field.value)}
                onValueChange={field.onChange}
                items={occupation}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-kover-widget-primary">
            Declaraciones y Requisitos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name="customer.dueDiligence.politicallyExposed"
            render={({ field, fieldState }) => (
              <label
                htmlFor="customer.politicallyExposed"
                className="cursor-pointer select-none"
              >
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-slate-50 transition-colors"
                >
                  <FieldContent>
                    <FieldLabel htmlFor="customer.politicallyExposed">
                      ¿Estás políticamente expuesto?
                    </FieldLabel>
                    <FieldDescription>
                      Tengo funciones públicas destacadas
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="customer.politicallyExposed"
                    name={field.name}
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="bg-kover-widget-primary"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              </label>
            )}
          />
          <Controller
            control={form.control}
            name="customer.requiresFiscalReceipt"
            render={({ field, fieldState }) => (
              <label
                htmlFor="customer.requiresFiscalReceipt"
                className="cursor-pointer select-none"
              >
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="flex flex-row items-center justify-between rounded-lg border p-4 bg-card hover:bg-slate-50 transition-colors"
                >
                  <FieldContent>
                    <FieldLabel htmlFor="customer.requiresFiscalReceipt">
                      ¿Requieres comprobante fiscal?
                    </FieldLabel>
                    <FieldDescription>Necesito factura con NCF</FieldDescription>
                  </FieldContent>
                  <Switch
                    id="customer.requiresFiscalReceipt"
                    name={field.name}
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="bg-kover-widget-primary"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              </label>
            )}
          />
        </div>

        {politicallyExposed && <PoliticalExposeData form={form} />}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-kover-widget-primary">
            Dirección de Residencia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Controller
              control={form.control}
              name="customer.address.street"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mb-4">
                  <FieldLabel htmlFor="customer.address.street">
                    Calle y número
                  </FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    placeholder="Ej: Calle Principal #123, Edificio Torre"
                    className="bg-[#F8FAFC]"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="customer.address.referencePoint"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Referencia</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Referencias"
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="customer.address.province"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="address.province">Provincia</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value || ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('customer.address.municipality', '');
                    form.clearErrors(['customer.address.municipality']);
                  }}
                  disabled={!isReferencePoint || !isStreetValid}
                >
                  <SelectTrigger
                    id="address.province"
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}
                    className="data-[invalid=true]:border-red-500 bg-[#F8FAFC]"
                  >
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 h-52">
                    {provinces.map((prov) => (
                      <SelectItem key={prov.id} value={prov.nombre}>
                        {prov.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && isStreetValid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="customer.address.municipality"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="customer.address.municipality">Municipio</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value || ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  disabled={!selectedProvince}
                >
                  <SelectTrigger
                    id="address.municipality"
                    data-invalid={fieldState.invalid}
                    aria-invalid={fieldState.invalid}
                    className="data-[invalid=true]:border-red-500 bg-[#F8FAFC]"
                  >
                    <SelectValue placeholder="Selecciona un municipio" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {municipalities.map((muni) => (
                      <SelectItem key={muni.id} value={muni.nombre}>
                        {muni.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="md:col-span-2">
            <Controller
              control={form.control}
              name="customer.address.sector"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer.address.sector">Sector</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    placeholder="Ej: Centro, Zona Colonial, etc."
                    className="bg-[#F8FAFC]"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    disabled={!selectedMunicipality}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">

        <PolicyData form={form} />
      </div>
    </div>
  );
};
