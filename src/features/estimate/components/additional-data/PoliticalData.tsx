import { Controller, type UseFormReturn } from "react-hook-form";
import type { AdditionalDataFormData } from "./AdditionalDataFormWrapper";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { SelectCustom } from "./SelectCustom";
import { financialInstitutions, intermediaries } from "@/mocks/emit.mock";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MaskedInput } from "../customer/MaskedInput";

interface PolicyDataProps {
  form: UseFormReturn<AdditionalDataFormData>;
}

export const PolicyData = ({ form }: PolicyDataProps) => {
  const [hasIntermediary, setHasIntermediary] = useState<boolean>(false);
  const [hasEndorsmentPolicy, setHasEndorsmentPolicy] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
      <div>
        <FieldGroup>
          <Controller
            control={form.control}
            name="customer.hasIntermediary"
            render={({ field }) => (
              <Field>
                <FieldLabel>¿Tienes intermediario?</FieldLabel>
                <SelectCustom
                  items={["Si", "No"]}
                  value={hasIntermediary ? "Si" : "No"}
                  name="hasIntermediary"
                  onChange={(value) => {
                    setHasIntermediary(value === "Si");
                    field.onChange(value === "Si");
                    console.log(value, field.value, "intermediary");
                  }}
                ></SelectCustom>
              </Field>
            )}
          />

          {hasIntermediary && (
            <Controller
              control={form.control}
              name="customer.intermediary"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer.intermediary">
                    Intemediario
                  </FieldLabel>
                  <SelectCustom
                    items={intermediaries}
                    value={field.value ?? ""}
                    name={field.name}
                    onChange={(value) => field.onChange(value)}
                    invalid={fieldState.invalid}
                    required={true}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}
        </FieldGroup>
      </div>

      <div>
        <FieldGroup>
          <Controller
            control={form.control}
            name="endorsmentPolicy.hasEndorsmentPolicy"
            render={({ field }) => (
              <Field>
                <FieldLabel>¿Requieres endoso de cesión?</FieldLabel>
                <SelectCustom
                  items={["Si", "No"]}
                  value={hasEndorsmentPolicy ? "Si" : "No"}
                  name={field.name}
                  onChange={(value) => {
                    setHasEndorsmentPolicy(value === "Si");
                    field.onChange(value === "Si");
                    console.log(value, field.value);
                  }}
                ></SelectCustom>
              </Field>
            )}
          />

          {hasEndorsmentPolicy && (
            <div className="flex flex-col gap-3">
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
                      value={field.value ?? ""}
                      name={field.name}
                      onChange={(value) => field.onChange(value)}
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
                name="endorsmentPolicy.subsidiary"
                render={({ field, fieldState }) => (
                  <Field>
                    <Input
                      value={field.value}
                      onChange={(value) => field.onChange(value.target.value)}
                      placeholder="Sucursal"
                    ></Input>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="endorsmentPolicy.executiveName"
                render={({ field, fieldState }) => (
                  <Field>
                    <Input
                      value={field.value}
                      onChange={(value) => field.onChange(value.target.value)}
                      placeholder="Nombre del ejecutivo"
                    ></Input>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="endorsmentPolicy.executiveEmail"
                render={({ field, fieldState }) => (
                  <Field>
                    <Input
                      value={field.value}
                      onChange={(value) => field.onChange(value.target.value)}
                      placeholder="Correo electrónico"
                    ></Input>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="endorsmentPolicy.executivePhoneNumber"
                render={({ field, fieldState }) => (
                  <Field>
                    <MaskedInput
                      mask="(###)-###-####"
                      id={field.name}
                      placeholder="(809)-565-5673"
                      className=" bg-[#F8FAFC]"
                      aria-invalid={fieldState.invalid}
                      value={field.value || ""}
                      onChange={(value) => field.onChange(value)}
                      saveUnmasked={true}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          )}
        </FieldGroup>
      </div>
    </div>
  );
};
