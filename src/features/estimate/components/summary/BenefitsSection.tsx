
import { CheckCircle2 } from "lucide-react";
import { CustomTooltip } from "../CustomTooltip";
import type { InsurancesData } from "@/mocks/request.mock";

interface BenefitsSectionProps {
  typeInsurance: string;
  terms: InsurancesData['terms'];
}

export const BenefitsSection = ({ terms }: BenefitsSectionProps) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-900">Coberturas</h3>
            </div>
            <div className="ml-7 space-y-2 text-sm text-gray-700">
              <p>• Daños materiales (Todo Riesgo)</p>
              <p>• Seguro de Ley - {terms.lawInsurance}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-900">
                Límite de cobro por Km.
              </h3>
              <CustomTooltip message="¡Los Km que recorras luego de este límite no te los cobraremos!" />
            </div>
            <div className="ml-7 text-sm text-gray-700">
              <p>• 1,050 Km al mes.</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-900">
                Beneficios de Buen Conductor.
              </h3>
              <CustomTooltip message="Podrás recibir hasta un 15% de descuento en tu tarifa por Km dependiendo de tus hábitos de conducción." />
            </div>
            <div className="ml-7 text-sm text-gray-700">
              <p>• A partir del 3er mes.</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-900">
                Gastos de Protección
              </h3>
              <CustomTooltip message="Gastos razonables incluidos en la protección del vehículo asegurado accidentado." />
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-900">
                Coberturas Opcionales
              </h3>
            </div>
            <div className="ml-7 space-y-3">
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <span className="text-sm text-gray-700">•</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      Asistencia Vehicular:{
                        terms.vehicularAssistance
                            ? ' 24/7 los 365 días del año en caso de emergencias a nivel nacional.'
                            : ' No Incluido'
                      } 
                    </p>
                  </div>
                  <CustomTooltip message="Servicios de ayuda inmediata a causa de un evento fortuito." />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <span className="text-sm text-gray-700">•</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">Auto Sustituto</p>
                  </div>
                  <CustomTooltip message="Aplica en siniestros cuyo costos de reparación superen el monto deducible." />
                </div>
                <p className="ml-4 text-sm text-gray-600 pl-2">
                  {
                    terms.substituteAuto === 'No' ? '- No Incluido' : terms.substituteAuto
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
