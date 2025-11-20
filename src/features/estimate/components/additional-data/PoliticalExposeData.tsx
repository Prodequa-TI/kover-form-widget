import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { AdditionalDataFormData } from './AdditionalDataFormWrapper';
import { Input } from '@/components/ui/input';
import { Kinship, RelationShip } from '../../type/types';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { useEffect } from 'react';

interface PoliticalExposeDataProps {
  form: UseFormReturn<AdditionalDataFormData>;
}
const kingOptions = Object.values(Kinship);
export const PoliticalExposeData = ({ form }: PoliticalExposeDataProps) => {
  const IsACloseRelative = form.watch('customer.dueDiligence.isItACloseRelative');

  useEffect(() => {
    if (IsACloseRelative === RelationShip.IAM) {
      form.setValue('customer.dueDiligence.familyName', ' ');
      form.setValue('customer.dueDiligence.familyName', ' ');
      form.setValue('customer.dueDiligence.familyName', ' ');
      form.clearErrors([
        'customer.dueDiligence.familyName',
        'customer.dueDiligence.kinship',
        'customer.dueDiligence.positionFamily',
      ]);
    } else if (IsACloseRelative === RelationShip.FAMILY) {
      form.setValue('customer.dueDiligence.position', ' ');
      form.clearErrors(['customer.dueDiligence.position'])
    }
  },[IsACloseRelative,form]);

  return (
    <div className="col-span-2 space-y-4">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-semibold text-kover-widget-primary">
            Información de Exposición Política
          </h3>
        </div>
        <Controller
          control={form.control}
          name="customer.dueDiligence.isItACloseRelative"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="customer.dueDiligence.isItACloseRelative">
                ¿Eres tú o algún familiar cercano?
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value || ''}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="customer.dueDiligence.isItACloseRelative"
                  className="bg-white data-[invalid=true]:border-red-500"
                  aria-invalid={fieldState.invalid}
                  data-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value={RelationShip.FAMILY}>Es un familiar</SelectItem>
                  <SelectItem value={RelationShip.IAM}>Soy yo</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {IsACloseRelative === RelationShip.FAMILY && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-200">
            <Controller
              control={form.control}
              name="customer.dueDiligence.familyName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer.dueDiligence.familyName">
                    Nombre del familiar
                  </FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="Nombre completo"
                    className="bg-white text-sm"
                    value={field.value || ''}
                    onChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="customer.dueDiligence.kinship"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer.dueDiligence.kinship">
                    Relación familiar
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value || ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="customer.dueDiligence.kinship"
                      className="bg-white data-[invalid=true]:border-red-500"
                      aria-invalid={fieldState.invalid}
                      data-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {kingOptions.map((kinship) => (
                        <SelectItem key={kinship} value={kinship}>
                          {kinship}
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
                name="customer.dueDiligence.positionFamily"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="customer.dueDiligence.positionFamily">
                      ¿Qué cargo ocupa tu familiar?
                    </FieldLabel>
                    <Input
                      id={field.name}
                      placeholder="Ej: Ministro de Salud, Senador, etc."
                      className="bg-white text-sm"
                      value={field.value || ''}
                      onChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </div>
        )}

        {IsACloseRelative === RelationShip.IAM && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <Controller
              control={form.control}
              name="customer.dueDiligence.position"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer.dueDiligence.position">
                    ¿Qué cargo público ocupas?
                  </FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="Ej: Alcalde, Diputado, Director de institución pública, etc."
                    className="bg-white"
                    value={field.value || ''}
                    onChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};
