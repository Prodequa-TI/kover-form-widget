import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { CarModels } from '../../type/types';

interface SelectData {
    items: CarModels[];
    value?: string;
    name: string;
    onValueChange: (value: string) => void;
    invalid?: boolean;
    disabled: boolean;
}

export function SelectCarModel({
    items,
    name,
    onValueChange,
    disabled,
    invalid,
    value,
}: SelectData) {
    return (
        <Select
            name={name}
            onValueChange={onValueChange}
            disabled={disabled}
            value={value || ''}>
            <SelectTrigger
                data-invalid={invalid}
                className={`w-full h-11 bg-[#F8FAFC] border border-slate-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    data-[invalid=true]:border-red-500 select-none
                    ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
                aria-invalid={invalid}>
                <SelectValue placeholder='Tipo de modelo' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((item, i) => (
                        <SelectItem key={i} value={item.idModelo.toString()}>
                            {item.modelo}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
