import { Controller, type UseFormReturn } from "react-hook-form";
import type { AdditionalDataFormData } from "./AdditionalDataFormWrapper";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { SelectCustom } from "./SelectCustom";
import { installationMunicipalities, InstallationTypes, installationTypes, municipalityLocations } from "@/mocks/installation.mock";

interface SmartDeviceProps {
  form: UseFormReturn<AdditionalDataFormData | Omit<AdditionalDataFormData, 'smartDevice'>>;
}

export const SmartDeviceField = ({ form }: SmartDeviceProps) => {
  const installationCenter = form.watch('smartDevice.installationCenter');
  const installationType = form.watch('smartDevice.installationType');


  return (
    <>
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-kover-widget-primary">
          Dispositivo Smart
        </h3>
      </div>
      <div className="col-span-2 flex flex-col gap-4">
        <Controller
          control={form.control}
          name="smartDevice.installationType"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>¿Cómo deseas instalar el dispositivo smart?</FieldLabel>
              <SelectCustom
                items={installationTypes}
                value={field.value ?? ''}
                name="smartDevice.installationType"
                placeHolder="Seleccionar tipo de dispositivo"
                onChange={(value) => {
                  field.onChange(value);
                }}
                invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
                  control={form.control}
                  name="smartDevice.installationCenter"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
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
                        invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                {installationCenter && (
                  <div className="text-center text-sm text-slate-500">
                    Nuestro servicio al cliente se comunicará contigo para coordinar la cita en el
                    horario que más te convenga.
                    {installationType ===
                      InstallationTypes.CENTRO_ESPECIALIZADO && (
                      <p>
                        Lunes a Viernes: 8:30 a.m. a 6:00 p.m <br />
                        Sábado: 9:00am a 1:00pm <br />
                        {
                          municipalityLocations[installationCenter]
                            .location
                        }{' '}
                        <br />
                        Teléfono:{' '}
                        <b>
                          {
                            municipalityLocations[installationCenter]
                              .phone
                          }
                        </b>
                      </p>
                    )}
                  </div>
                )}
    </div>
    </>
  )
}