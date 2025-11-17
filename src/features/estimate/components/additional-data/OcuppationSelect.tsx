import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Occupations } from '../../type/types';
interface OccupationProps {
    items: Occupations[];
    name: string;
    invalid?: boolean;
    value?: string;
    onValueChange: (value: string) => void;
}

export const OcuppationInput = ({
    name,
    items,
    value,
    invalid,
    onValueChange,
}: OccupationProps) => {
    return (
        <Select name={name} onValueChange={onValueChange} value={value || ''}>
            <SelectTrigger
                className='w-full h-11 bg-[#F8FAFC] border border-slate-300
                    focus-visible:outline-none focus-visible:ring-2
                    data-[invalid=true]:border-red-500 select-none'  aria-invalid={invalid}>
                <SelectValue placeholder='¿A que te dedicas?'></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className='h-[200px]'>
                    {items.map((i) => (
                        <SelectItem key={i.idOccupation} value={i.occupation}>
                            {i.occupation}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
