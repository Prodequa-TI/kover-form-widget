import { Controller, type UseFormReturn } from 'react-hook-form';
import type { AdditionalDataFormData } from './AdditionalDataFormWrapper';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { SelectCustom } from './SelectCustom';
import { financialInstitutions } from '@/mocks/emit.mock';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { MaskedInput } from '../customer/MaskedInput';
import { installationMunicipalities, installationTypes } from '@/mocks/installation.mock';

interface PolicyDataProps {
  form: UseFormReturn<AdditionalDataFormData>;
}

export const PolicyData = ({ form }: PolicyDataProps) => {
  // const [hasIntermediary, setHasIntermediary] = useState<boolean>(false);
  const [hasEndorsmentPolicy, setHasEndorsmentPolicy] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-2 flex flex-col gap-4">
        <Controller
          control={form.control}
          name="smartDevice.installationType"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>¿Cómo deseas instalar el dispositivo smart?</FieldLabel>
              <SelectCustom
                items={installationTypes}
                value={field.value ?? ''}
                name="smartDevice.installationType"
                placeHolder="Seleccionar tipo de dispositivo"
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="smartDevice.installationCenter"
          render={({ field, fieldState }) => (
            <Field>
              <SelectCustom
                items={
                  installationMunicipalities[
                    form.watch('smartDevice.installationType')
                  ] ?? []
                }
                value={field.value ?? ''}
                name="smartDevice.installationCenter"
                placeHolder="Seleccionar centro de instalación"
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      {/** Intermediario no es necesario por el momento */}
      {/* <div className="space-y-4">
        <Controller
          control={form.control}
          name="customer.hasIntermediary"
          render={({ field }) => (
            <Field>
              <FieldLabel>¿Tienes intermediario?</FieldLabel>
              <SelectCustom
                items={['Si', 'No']}
                value={hasIntermediary ? 'Si' : 'No'}
                name="hasIntermediary"
                onChange={(value) => {
                  setHasIntermediary(value === 'Si');
                  field.onChange(value === 'Si');
                }}
              />
            </Field>
          )}
        />

        {hasIntermediary && (
          <div className="pl-4 border-l-2 border-slate-200">
            <Controller
              control={form.control}
              name="customer.intermediary"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer.intermediary">
                    Selecciona intermediario
                  </FieldLabel>
                  <SelectCustom
                    items={intermediaries}
                    value={field.value ?? ''}
                    name={field.name}
                    onChange={(value) => field.onChange(value)}
                    invalid={fieldState.invalid}
                    required={true}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        )}
      </div> */}

      <div className="space-y-4 col-span-2">
        <Controller
          control={form.control}
          name="endorsmentPolicy.hasEndorsmentPolicy"
          render={({ field }) => (
            <Field>
              <FieldLabel>¿Requieres endoso de cesión?</FieldLabel>
              <SelectCustom
                items={['Si', 'No']}
                value={hasEndorsmentPolicy ? 'Si' : 'No'}
                name={field.name}
                onChange={(value) => {
                  setHasEndorsmentPolicy(value === 'Si');
                  field.onChange(value === 'Si');
                }}
              />
            </Field>
          )}
        />

        {hasEndorsmentPolicy && (
          <div className="space-y-3 pl-4 border-l-2 border-slate-200">
            <Controller
              control={form.control}
              name="endorsmentPolicy.institution"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="endorsmentPolicy.institution">
                    Institución financiera
                  </FieldLabel>
                  <SelectCustom
                    items={financialInstitutions}
                    value={field.value ?? ''}
                    name={field.name}
                    onChange={(value) => field.onChange(value)}
                    invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="endorsmentPolicy.subsidiary"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="endorsmentPolicy.subsidiary">Sucursal</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="Ej: Sucursal Centro"
                    className="bg-[#F8FAFC]"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="endorsmentPolicy.executiveName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="endorsmentPolicy.executiveName">
                    Nombre del ejecutivo
                  </FieldLabel>
                  <Input
                    id={field.name}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="Nombre completo"
                    className="bg-[#F8FAFC]"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="endorsmentPolicy.executiveEmail"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="endorsmentPolicy.executiveEmail">
                    Correo electrónico
                  </FieldLabel>
                  <Input
                    id={field.name}
                    type="email"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="ejecutivo@banco.com"
                    className="bg-[#F8FAFC]"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="endorsmentPolicy.executivePhoneNumber"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="endorsmentPolicy.executivePhoneNumber">
                    Teléfono
                  </FieldLabel>
                  <MaskedInput
                    mask="(###)-###-####"
                    id={field.name}
                    placeholder="(809)-565-5673"
                    className="bg-[#F8FAFC]"
                    aria-invalid={fieldState.invalid}
                    value={field.value || ''}
                    onChange={(value) => field.onChange(value)}
                    saveUnmasked={true}
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
