import { MinusCircle } from "lucide-react";
import { CustomTooltip } from "../../../../shared/CustomTooltip";
import { insuranceConsiderations, InsurancesType } from "@/mocks/summary.mock";
import { InsuranceExlusions } from "@/shared/InsuranceExlusions";


export const ExclusionsSection = ({ typeInsurance }: { typeInsurance: InsurancesType }) => {
    const considerations = insuranceConsiderations[typeInsurance];
    console.log(typeInsurance, considerations, 'considerations')
    const considerationsLength = Math.ceil(considerations.length / 2);
    const considerationsGroupOne = considerations.slice(0, considerationsLength);
    const considerationsGroupTwo = considerations.slice(considerationsLength);
  
  return (
    <div className="px-4 pb-4 space-y-6">
      <InsuranceExlusions title="Se excluye pérdidas ocasionadas por Riesgos no Nombrados o motivados por las siguientes causas:" />
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Consideraciones</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
        {
          considerationsGroupOne.map((consideration, index) => (
            <div key={index}>
              <div className="flex gap-2 text-gray-700">
                <MinusCircle className="mt-[3px] w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{consideration.description}</span>
                {consideration.tooltip && <CustomTooltip message={consideration.tooltip} />}
              </div>  
              {consideration.details && <div className="text-gray-700">
                <div className="ml-6 space-y-1">
                  {consideration.details.map((detail, index) => (
                    <div key={index}><span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-2"></span>{detail}</div>
                  ))}
                </div>
              </div>}
            </div>
          ))
        }
</div>

        <div className="space-y-4">
        {
          considerationsGroupTwo.map((consideration, index) => (
            <div key={index}>
              <div className="flex gap-2 text-gray-700">
                <MinusCircle className="mt-[3px] w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{consideration.description}</span>
                {consideration.tooltip && <CustomTooltip message={consideration.tooltip} />}
              </div>
              {consideration.details && <div className="text-gray-700">
                <div className="ml-6 space-y-1">
                  {consideration.details.map((detail, index) => (
                    <div key={index}><span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-2"></span>{detail}</div>
                  ))}
                </div>
              </div>}
            </div>
          ))
        }
      </div>
      </div>
      </div>
    </div>
  );
};
