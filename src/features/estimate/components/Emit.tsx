import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Coins, CoinsIcon, Plus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { InsurancesData } from '@/features/estimate/type/insurance.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';

interface EmitirProps {
  onBack: () => void;
  onEmit: () => void;
  successMessage: string | null;
  insuranceData?: InsurancesData;
}

export default function Emitir({
  onBack,
  onEmit,
  successMessage,
  insuranceData,
}: EmitirProps) {
  const [kmMes, setKmMes] = useState<number>(0);

  // Validar que existan los datos de la cotización
  const quotationResponse = insuranceData?.quotationResponse;

  const quotationData = quotationResponse?.data;
  const quotationTerms = quotationData?.terminos;
  const vehiculo = quotationData?.vehiculo;

  // Obtener datos de la cotización desde el API
  const primaFija = quotationTerms?.primaFija || 0;
  const precioPorKm = quotationTerms?.primaKm || 0;
  const vehiculoInfo = `${vehiculo?.marca} ${vehiculo?.modelo} ${vehiculo?.anio}`;

  // Mantener compatibilidad con código existente
  const premium = primaFija;

  const formatDOP = (n: number) =>
    new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
    }).format(n);

  const totalMensual = premium + kmMes * precioPorKm;

  const inc = () => setKmMes((v) => Math.min(999999, v + 10));
  const dec = () => setKmMes((v) => Math.max(0, v - 10));
  const onChangeKm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value.replace(/\D/g, ''));
    setKmMes(Number.isFinite(n) ? Math.min(999999, n) : 0);
  };

  return (
    <div className="mx-auto max-w-5xl py-6 md:py-10 w-full">
      {successMessage && (
        <Alert variant="success" className="mb-10 relative border-green-500 bg-green-50">
          <CheckCircle2 className="h-4 w-4 " />
          <AlertTitle className="text-green-700 font-semibold">
            Cotización generada
          </AlertTitle>
          <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
        </Alert>
      )}
      {/* Encabezado */}
      <div className="mb-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Por Lo Que Conduces
          </h1>
          <p className="text-slate-500">
            ¡Listo, mira cuánto ahorrarás con tu{' '}
            <span className="font-medium">{vehiculoInfo}</span>!
          </p>
        </div>
      </div>

      {/* Bloque: Prima a pagar */}
      <div className="w-full max-w-4xl mx-auto transition-shadow ">
        {/* Header */}
        <div className="bg-kover-widget-primary text-white text-center py-5 md:py-6 rounded-t-xl flex items-center justify-center gap-1 md:gap-2 shadow-lg shadow-indigo-500/20">
          <Coins className="h-6 w-6 md:h-7 md:w-7 text-yellow-400" />
          <h2 className="text-xl font-semibold">Prima a Pagar</h2>
        </div>

        {/* Content */}
        <div className="bg-gray-50 border-2 border-kover-widget-primary border-t-0 rounded-b-xl p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="text-center text-slate-700 font-medium mb-4 md:mb-6 text-sm md:text-base">
                Mensualmente
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-kover-widget-primary mb-1">
                    {formatDOP(primaFija)}
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-black uppercase tracking-wider">
                    Fijo
                  </div>
                </div>
                <div className="text-xl md:text-2xl text-kover-widget-primary font-light flex items-center gap-1">
                  <Plus className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-kover-widget-primary mb-1">
                    {formatDOP(precioPorKm)}
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-black uppercase tracking-wider">
                    por Km recorrido
                  </div>
                </div>
              </div>
            </div>

            <Separator className="md:hidden" />
            <div className="flex flex-col justify-between items-center h-full">
              <div className="w-full text-center">
                <Label
                  htmlFor="promo"
                  className="text-indigo-700 font-semibold text-sm md:text-base mb-4 md:mb-6 block text-center"
                >
                  ¿Código Promocional o de Referimiento?
                </Label>
                <Input
                  id="promo"
                  type="text"
                  placeholder="Ingresa tu código"
                  className="h-10 md:h-12 text-sm md:text-base border-2 border-slate-400 w-full md:w-[70%] mx-auto text-center transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CANCULAR TU AHORRO */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 ">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6 py-4 hover:bg-kover-widget-primary-50 rounded-b-none data-[state=closed]:rounded-b-none">
              <div className="flex items-center gap-3">
                <CoinsIcon className="h-5 w-5 text-kover-widget-primary" />
                <span className="font-semibold text-lg"> Calcula tú ahorro</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 ">
              <div className="p-6">
                <div className="mx-auto max-w-2xl">
                  <p className="text-base mb-4 text-center text-slate-600">
                    ¿Cuánto conduces cada mes?
                  </p>

                  {/* Input con botones -/+ */}
                  <div className="mx-auto flex max-w-md items-center gap-3">
                    <button
                      type="button"
                      onClick={dec}
                      className="text-base rounded-md border border-slate-400 px-4 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      –
                    </button>

                    <Input
                      inputMode="numeric"
                      value={kmMes.toString()}
                      onChange={onChangeKm}
                      className="h-10 text-center text-lg font-semibold border-slate-400"
                      placeholder="0"
                      aria-label="Kilómetros al mes"
                    />

                    <button
                      type="button"
                      onClick={inc}
                      className="text-base rounded-md border border-slate-400 px-4 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer flex flex-row items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <Separator
                    orientation="vertical"
                    className="hidden md:block shrink-0 self-stretch"
                  />

                  {/* Resultado */}
                  <div className="mt-4 rounded-lg bg-slate-50 p-3 md:p-4">
                    <div className="mb-3 space-y-2 text-slate-600">
                      <div className="flex justify-between">
                        <span>Prima fija:</span>
                        <span className="font-medium">{formatDOP(premium)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Km recorridos ({kmMes} km):</span>
                        <span className="font-medium"></span>{' '}
                        {formatDOP(kmMes * precioPorKm)}
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="text-center">
                      <div className="mb-1 text-slate-500 text-base">
                        Pagarías en total
                      </div>
                      <div className="text-xl md:text-2xl font-extrabold text-indigo-700">
                        {formatDOP(totalMensual)}/mes{' '}
                        <span className="text-indigo-400">o</span>{' '}
                        {formatDOP(totalMensual * 12)}/año
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <Button
          variant="secondary"
          className="h-11 px-10 cursor-pointer w-full md:w-44"
          onClick={onBack}
        >
          ATRÁS
        </Button>
        <Button
          className=" w-full md:w-44 h-11 px-10 bg-kover-widget-primary hover:bg-kover-widget-primary-hover text-base font-semibold cursor-pointer"
          onClick={onEmit}
        >
          CONTINUAR
        </Button>
      </div>
    </div>
  );
}
