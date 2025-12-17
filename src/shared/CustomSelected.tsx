import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Definimos la estructura estándar para cualquier opción
export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[]; // Recibe un array estándar
  value?: string | number; // Acepta string o number
  onValueChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  invalid?: boolean;
  disabled?: boolean;
}

export function CustomSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Seleccionar...',
  name,
  invalid = false,
  disabled = false,
}: CustomSelectProps) {
  return (
    <Select
      name={name}
      value={value ? String(value) : ''}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        id={name}
        data-invalid={invalid}
        aria-invalid={invalid}
        className={`w-full h-11 bg-[#F8FAFC] border border-slate-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    data-[invalid=true]:border-red-500 select-none
                    ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
