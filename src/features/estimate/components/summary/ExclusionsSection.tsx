import { FileText, XCircle } from "lucide-react";
import { CustomTooltip } from "../../../../shared/CustomTooltip";

export const ExclusionsSection = () => {
  return (
    <div className="px-4 pb-4 space-y-6">
      <div>
        <h3 className="text-base font-semibold text-kover-widget-primary mb-4">
          Exclusiones (Principales)
        </h3>

        <div className="mb-4">
          <div className="flex items-start gap-2 mb-3">
            <XCircle className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              Se excluye pérdida motivada por las siguientes causas:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 ml-7">
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <p className="mb-2">
                  • Los accidentes o pérdidas debido al manifiesto descuido o
                  negligencia en el mantenimiento del vehículo de motor en
                  condiciones de eficiencia.
                </p>
              </div>

              <div className="text-sm text-gray-700">
                <p className="mb-1">
                  • Los Accidentes ocurridos mientras el vehículo de motor esté
                  destinado a:
                </p>
                <p className="ml-4 mb-1">
                  - Prácticas de aprendizaje o de entrenamiento.
                </p>
                <p className="ml-4">
                  - Fuese usado para transporte de explosivos.
                </p>
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  • Los accidentes ocurridos mientras el vehículo de motor fuese
                  conducido por personas sin licencia de conducir o que no estén
                  capacitadas y autorizadas legalmente para manejar ese tipo de
                  vehículo; o que se encuentre bajo la influencia de bebidas
                  embriagantes o drogas tóxicas o heroicas.
                </p>
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  • Los lesiones, pérdidas o daños ocurridos mientras se le da
                  al vehículo asegurado un uso distinto al declarado en la
                  solicitud.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <p>
                  • La responsabilidad, así como daños ocasionados al vehículo
                  asegurado como consecuencia de la participación del vehículo
                  asegurado en apuestas, desafíos, carreras o concursos de
                  cualquier naturaleza o en sus propias preparatorias.
                </p>
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  • Los daños ocasionados al vehículo de motor asegurado, como
                  consecuencia de la imprudencia temeraria del conductor.
                </p>
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  • Daños o pérdidas ocasionadas a la carrocería del vehículo
                  asegurado o parte de ella, cuando dicha carrocería haya sido
                  modificado para cambiar su uso o apariencia original o por
                  cualquiera otra causa; a menos que dicho cambio haya sido
                  señalado por escrito por el Asegurado y se haga constar en la
                  Póliza mediante endoso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-kover-widget-primary mb-4">
          Consideraciones
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div className="flex-1">
                <span className="text-sm text-gray-700">
                  Prescripción: 2 años
                </span>
                <CustomTooltip message="Es el tiempo máximo, posterior a que se haya presentado un siniestro, después del cual no podrá establecerse ninguna reclamación o acción legal contra Unit." />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div className="flex-1">
                <span className="text-sm text-gray-700">
                  Período de gracia: 10 días calendario
                </span>
                <CustomTooltip message="Tiempo máximo para hacer el pago de la prima, posterior a tu fecha de corte." />
                {/* <Info className="w-4 h-4 text-gray-400 inline-block ml-1 cursor-pointer hover:text-gray-600" /> */}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2">Deducible:</p>
                <p className="text-sm text-gray-700 ml-4 mb-1">
                  • 1% de la Suma Asegurada, mínimo RD$5,000.
                </p>
                <p className="text-sm text-gray-700 ml-4">
                  • En Rotura de Cristales: 10% de la pérdida, mínimo RD$1,000.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div className="flex-1">
                <span className="text-sm text-gray-700">
                  Aviso de Accidente: Inmediatamente, a más tardar 2 días
                  hábiles.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div className="flex-1">
                <span className="text-sm text-gray-700">
                  Edad de Aceptación: Antigüedad del vehículo hasta 15 años para
                  ingresar. Puede permanecer por tiempo indefinido.
                </span>
                <CustomTooltip message="Antigüedad del vehículo para poder contratar y tope máximo de aceptación de cobertura." />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2">
                  Instalación y Mantenimiento de Dispositivo Inteligente:
                </p>
                <p className="text-sm text-gray-700 ml-4 mb-2">
                  • El Asegurado se compromete a instalar el Dispositivo
                  Inteligente, mantenerlo conectado al vehículo y no manipularlo
                  o destruirlo.
                </p>
                <p className="text-sm text-gray-700 ml-4">
                  • El Asegurado se compromete a instalarlo dentro de los
                  primeros 5 días laborables. En caso contrario se cobrarán 833
                  km por el primer mes. Si El Asegurado persiste sin instalar El
                  Dispositivo luego de trascurrido el primer mes de vigencia, la
                  póliza quedará automáticamente cancelada.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  En caso de que el seguro sea cancelado por La Compañía o por
                  El Asegurado durante el primer año de vigencia, se hará un
                  cargo de RD$1,250, al medio de pago registrado, por concepto
                  del Dispositivo Inteligente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
