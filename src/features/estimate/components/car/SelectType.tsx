import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectData {
  items: (number | string)[];
  value?: number;
  name: string;
  onValueChange: (value: string) => void;
  invalid?: boolean;
  disabled: boolean;
}

export function SelectCarYear({
  items,
  onValueChange,
  value,
  name,
  invalid,
  disabled,
}: SelectData) {
  return (
    <Select
      disabled={disabled}
      name={name}
      onValueChange={onValueChange}
      value={value ? String(value) : ''}
    >
      <SelectTrigger
        aria-invalid={invalid}
        className={`max-h-40 overflow-y-auto w-full select-none bg-[#F8FAFC] border border-slate-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    data-[invalid=true]:border-red-500
                    ${disabled ? 'opacity-50 pointer-events-none' : ''} `}
        id={name}
      >
        <SelectValue placeholder="Año" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item, i) => (
            <SelectItem key={i} value={item.toString()}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
