import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CustomTooltip } from '@/shared/CustomTooltip';
import { CheckCircle2, Coins } from 'lucide-react';
import { useState } from 'react';
import type { InsurancesData } from '../estimate/type/insurance.types';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PLAN_CONFIG: Record<string, { label: string; hasInfo: boolean; order: number }> = {
  A: { label: 'Anual', hasInfo: false, order: 1 },
  T: { label: '4 Cuotas', hasInfo: true, order: 2 }, // T = Trimestral (4 al año)
  M: { label: 'Mensual', hasInfo: false, order: 3 },
};

type AutoInsurancesEmit = {
  insuranceData?: InsurancesData;
  onBack: () => void;
  onEmit: () => void;
  successMessage: string | null;
};

export const AutoInsuranceEmit = ({
  insuranceData,
  onBack,
  onEmit,
  successMessage,
}: AutoInsurancesEmit) => {
  const [selectedQuotes, setSelectedQuotes] = useState<string>('A');

  const availablePlans = insuranceData?.quotationResponse.data.primas
    .filter((prima) => PLAN_CONFIG[prima.fraccionamientoPago])
    .map((prima) => {
      const config = PLAN_CONFIG[prima.fraccionamientoPago];
      return {
        id: prima.fraccionamientoPago,
        label: config.label,
        price: prima.cobro,
        hasInfo: config.hasInfo,
        order: config.order,
      };
    })
    .sort((a, b) => a.order - b.order);

  const formatMoney = (amount: number) => {
    const formated = new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
    });
    return formated.format(amount);
  };
  return (
    <>
      <div className="flex flex-col justify-between items-center gap-2 mb-4">
        {successMessage && (
          <Alert
            variant="success"
            className="mb-10 relative border-green-500 bg-green-50"
          >
            <CheckCircle2 className="h-4 w-4 " />
            <AlertTitle className="text-green-700 font-semibold">
              Cotización generada
            </AlertTitle>
            <AlertDescription className="text-green-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}
        <h1 className="text-2xl text-kover-widget-primary">¡Tú eliges como pagas!</h1>
        <p className="text-center mx-auto max-w-[500px] whitespace-normal text-sm">
          ¿Con qué frecuencia deseas pagar el seguro de tu {}?
        </p>
      </div>
      <div className="w-full max-w-4xl mx-auto transition-shadow">
        {/* Header */}
        <div className="bg-kover-widget-primary text-white text-center py-5 md:py-6 rounded-t-xl flex items-center justify-center gap-1 md:gap-2 shadow-lg shadow-indigo-500/20">
          <Coins className="h-6 w-6 md:h-7 md:w-7 text-yellow-400" />
          <h2 className="text-xl font-semibold">Prima a Pagar</h2>
        </div>
        <div className="bg-gray-50 border-2 border-kover-widget-primary border-t-0 rounded-b-xl p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col justify-center items-center gap-4">
              {availablePlans?.map((pay) => {
                const isSelected = selectedQuotes === pay.id;
                return (
                  <div
                    className={cn(
                      'group relative flex items-center justify-between w-full px-8 py-2 rounded-full transition-all duration-200 border cursor-pointer',
                      isSelected
                        ? 'bg-kover-widget-primary text-white border-kover-widget-primary shadow-md'
                        : 'bg-white text-[#0a1f44] border-gray-100 shadow-sm hover:border-gray-300'
                    )}
                    onClick={() => setSelectedQuotes(pay.id)}
                    key={pay.id}
                  >
                    <div className="flex justify-between items-center w-full gap-5">
                      <p>{pay.label}</p>
                      <div
                        className={cn(
                          'h-5 w-px mx-2', // Altura y ancho de la línea
                          isSelected ? 'bg-white/30' : 'bg-gray-300' // Color dinámico
                        )}
                      />

                      {/* 3. Lado Derecho: Precio + Icono */}
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-lg">
                          {formatMoney(pay.price)}
                        </span>

                        {pay.hasInfo && (
                          <CustomTooltip
                            message="Mensajes iguales y consecutivas"
                            iconClassName="ml-1 absolute -top-2 right-1 text-orange-500 hover:text-orange-600"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col justify-center items-center h-full md:border-l md:border-gray-300 md:pl-8">
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
                  className="h-10 md:h-12 text-sm md:text-base border-2 border-slate-400 w-ful mx-auto text-center transition-all duration-200"
                />
              </div>
            </div>
          </div>
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
    </>
  );
};
