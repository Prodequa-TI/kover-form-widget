'use client';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getCars } from '../../services/car-estimate.service';
import type { CarListResponse } from '../../type/types';
import { type ControllerRenderProps } from 'react-hook-form';
import { useDebounce } from '../../hook/useDebounce';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { EstimateFormData } from '../../config/EstimeFormConfig';

interface BrandSelectProps {
  field: ControllerRenderProps<EstimateFormData>;
  handelGetModels: (brand: string, rawCars: CarListResponse[]) => void;
  invalid?: boolean;
}

export function SelectBrandCar({ field, handelGetModels, invalid }: BrandSelectProps) {
  const [cars, setCars] = useState<{ value: string; label: string }[]>([]);
  const [rawCars, setRawCars] = useState<CarListResponse[]>([]);
  const [filteredCars, setFilteredCars] = useState<{ value: string; label: string }[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isGettingCars, setIsGettingCars] = useState(false);
  const [messageError, setMessageError] = useState('');

  const canSearch = value.length >= 2;
  const availableCars = filteredCars.length > 0 ? filteredCars : cars;

  const handleChangeInput = async (event: FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setValue(value);
  };

  const debouncedValue = useDebounce(value, 500);

  const getListCars = useCallback(async () => {
    try {
      const cars = await getCars();
      const mappedCars = cars.map((car) => ({
        value: car.marca,
        label: car.marca,
      }));
      setIsGettingCars(false);
      setCars(mappedCars);
      setRawCars(cars);
    } catch (error) {
      console.error(error);
      setIsGettingCars(false);
      setMessageError('Error al obtener datos, vuelva a intentarlo');
    }
  }, []);

  useEffect(() => {
    getListCars();
  }, []);

  useEffect(() => {
    if (value.length === 0) {
      setFilteredCars([]);
      return;
    }

    if (canSearch) {
      const filtered = cars.filter((car) =>
        car.label.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  }, [debouncedValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={invalid}
          className={cn(
            'select-none w-full justify-between font-normal h-10',
            invalid && 'border-red-500'
          )}
        >
          {value
            ? cars.find((car) => car.value === value)?.label
            : 'Selecciona una marca...'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput onInput={handleChangeInput} placeholder="Buscar marca..." />
          <CommandList>
            {messageError && <CommandEmpty>{messageError}</CommandEmpty>}
            {isGettingCars && <CommandEmpty>Cargando...</CommandEmpty>}
            {!canSearch && !isGettingCars && !messageError && (
              <CommandEmpty>Escriba 2 o más letras...</CommandEmpty>
            )}
            <CommandGroup>
              {availableCars.map((car) => (
                <CommandItem
                  key={car.value}
                  value={car.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    handelGetModels(currentValue, rawCars);
                    field.onChange(currentValue);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === car.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {car.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
