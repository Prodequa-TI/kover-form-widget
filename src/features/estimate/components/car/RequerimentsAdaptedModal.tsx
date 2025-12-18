import { Modal } from '@/shared/Modal';

interface RequirimentsAdaptedModalProps {
  open: boolean;
  onClose: () => void;
}

export const RequirimentsAdaptedModal = ({
  open,
  onClose,
}: RequirimentsAdaptedModalProps) => {
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

  // Función adaptadora para onOpenChange del Dialog
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      size="3xl"
      onCancel={onClose}
      cancelText="Cerrar"
    >
      <h1 className="text-center text-2xl mb-4">Requisitos de Instalación</h1>
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 pt-4">
        <div>
          <h2 className="text-xl font-bold text-[#301fe6] mb-6">Sistema de gas GLP:</h2>
          <ul className="space-y-4">
            {GLPrequeriments.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="shrink-0 w-2 h-2 bg-kover-widget-primary rounded-full mt-2"></div>
                <span className="text-gray-700 text-sm leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#301fe6] mb-6">
            Sistema de Gas Natural (GNV):
          </h2>
          <ul className="space-y-4">
            {GNVrequeriments.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="shrink-0 w-2 h-2 bg-kover-widget-primary rounded-full mt-2"></div>
                <span className="text-gray-700 text-sm leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};
