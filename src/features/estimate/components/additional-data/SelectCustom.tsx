import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectProps {
  items: string[];
  value: string;
  name: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
}
export const SelectCustom = ({ items, value, name, disabled, invalid, onChange, required }: SelectProps) => {
  return (
    <div>
      <Select
        name={name}
        value={value || ""}
        onValueChange={onChange}
        disabled={disabled ?? false}
        required={required ?? false}
      >
        <SelectTrigger
          id={name}
          aria-invalid={invalid ?? false}
          className="bg-[#F8FAFC]"
        >
          <SelectValue placeholder="Seleccionar valor" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          {items.map((item, i) => (
            <SelectItem key={i} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
