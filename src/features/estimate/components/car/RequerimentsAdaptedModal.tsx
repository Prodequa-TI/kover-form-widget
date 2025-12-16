export const RequirimentsAdaptedModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  if(!open) return null;

  const GLPrequeriments = [
    'Equipos de fabricación italiana exclusivamente.',
    'Equipos con Solenoide de sistema secuencial por inyección electrónica exclusivamente. No equipos convencionales.',
    'Mangueras, Tuberías Externas y Conexiones Interiores pueden ser de Bronce o PVC. Instalación de las tuberías externas por fuera exclusivamente.',
    'Tanques sobre base fijas con abrazaderos y la base fija al chasis exclusivamente.',
    'Instalación realizada por los Distribuidores Exclusivos. No se aceptarán instalaciones de terceros.',
  ];

  const GNVrequeriments = [
    'Instalación por empresas aprobada por industria y comercio con equipos de 5ta. Generación en adelante.',
  ];

  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onClose()}
          ></div>

          <div className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <button
              id="button-close"
              type="button"
              onClick={() => onClose()}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 cursor-pointer"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-900">Requisitos</h1>
              </div>

              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-xl font-bold text-[#301fe6] mb-6">
                    Sistema de gas GLP:
                  </h2>
                  <ul className="space-y-4">
                    {GLPrequeriments.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#301fe6] mb-6">
                    Sistema de Gas Natural para Vehículo (GNV):
                  </h2>
                  <ul className="space-y-4">
                    {GNVrequeriments.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};
