import { XCircle } from 'lucide-react';
import { insuranceExclusions } from '@/mocks/summary.mock';

export const InsuranceExlusions = ({ title }: { title: string }) => {
  return (
    <div>
      <h3 className="text-base font-semibold text-kover-widget-primary mb-4">
        Exclusiones (Principales)
      </h3>

      <div className="mb-4">
        <div className="flex items-start gap-2 mb-3">
          <XCircle className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            {title}
            {/* Se excluye pérdida motivada por las siguientes causas: */}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 ml-7">
          {insuranceExclusions.map((e, i) => {
            return (
              <div className="space-y-3" key={i}>
                {e.exclusions.map((exclusion, i) => {
                  return (
                    <div className="text-sm text-gray-700" key={i}>
                      <p className="mb-2">• {exclusion.description}</p>
                      {exclusion.details && exclusion.details.length > 0 && (
                        <div>
                          {exclusion.details.map((detail, i) => {
                            return (
                              <p className="ml-4 mb-1" key={i}>
                                - {detail}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
