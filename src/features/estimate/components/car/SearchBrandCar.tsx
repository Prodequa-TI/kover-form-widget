"use client";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getCars } from '../../services/car-estimate.service';
import type { CarListResponse } from '../../type/types';
import { type ControllerRenderProps } from 'react-hook-form';
import { useDebounce } from '../../hook/useDebounce';
import { useEffect, useState, type FormEvent } from 'react';
import type { EstimateFormData } from '../../config/EstimeFormConfig';

interface BrandSelectProps {
  field: ControllerRenderProps<EstimateFormData>;
  handelGetModels: (brand: string, rawCars: CarListResponse[]) => void;
}

export function SelectBrandCar({ field, handelGetModels }: BrandSelectProps) {
  const [cars, setCars] = useState<{ value: string; label: string }[]>([]);
  const [rawCars, setRawCars] = useState<CarListResponse[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isGettingCars, setIsGettingCars] = useState(false);
  const [messageError, setMessageError] = useState("");

  const debouncedValue = useDebounce(value, 500);

  const handleChangeInput = async (event: FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setValue(value);
  };

  useEffect(() => {
    if (debouncedValue.length < 2) {
      setRawCars([]);
      setIsGettingCars(false);
      return;
    }
    setMessageError("");
    setIsGettingCars(true);
    getCars(debouncedValue)
      .then((cars) => {
        const mappedCars = cars.map((car) => ({
          value: car.marca,
          label: car.marca,
        }));
        setIsGettingCars(false);
        setCars(mappedCars);
        setRawCars(cars);
      })
      .catch((error) => {
        console.error(error);
        setIsGettingCars(false);
        setMessageError("Error al obtener datos, vuelva a intentarlo");
      });
  }, [debouncedValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="select-none w-[200px] justify-between font-normal h-full"
        >
          {value
            ? cars.find((car) => car.value === value)?.label
            : "Selecciona una marca..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            onInput={handleChangeInput}
            placeholder="Buscar marca..."
          />
          <CommandList>
            {messageError && <CommandEmpty>{messageError}</CommandEmpty>}
            {isGettingCars && <CommandEmpty>Cargando...</CommandEmpty>}
            {cars.length === 0 && !isGettingCars && !messageError && (
              <CommandEmpty>No se encontraron marcas.</CommandEmpty>
            )}
            <CommandGroup>
              {cars.map((car) => (
                <CommandItem
                  key={car.value}
                  value={car.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    handelGetModels(currentValue, rawCars);
                    field.onChange(currentValue);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === car.value ? "opacity-100" : "opacity-0"
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
