import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FuelsType } from '../../type/types';

interface SelectData {
    name: string;
    value: string;
    onValueChange: (value: string) => void;
    invalid: boolean;
}

export function SelectFuelType({
    name,
    value,
    onValueChange,
    invalid,
}: SelectData) {
    return (
        <Select name={name} onValueChange={onValueChange} value={value}>
            <SelectTrigger
                data-invalid={invalid}
                aria-invalid={invalid}
                className='data-[invalid=true]:border-red-500 select-none'>
                <SelectValue placeholder='Tipo de combustible' />
            </SelectTrigger>
            <SelectContent className='max-h-40 overflow-y-auto'>
                <SelectGroup>
                    <SelectItem value={FuelsType.GASOLINE}>
                        Gasolina / Diesel
                    </SelectItem>
                    <SelectItem value={FuelsType.GAS}>Gas</SelectItem>
                    <SelectItem value={FuelsType.ELECTRIC}>
                        Vehículo Eléctrico
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
