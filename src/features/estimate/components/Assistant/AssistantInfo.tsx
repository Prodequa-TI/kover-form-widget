
export const Assistantinfo = () => {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg">
      {/* Título con precio */}
      <h4 className="text-center text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Por tan solo
        <br />
        <span className="text-kover-widget-primary font-bold text-lg sm:text-xl md:text-2xl">
          RD$238/MENSUAL
        </span>
      </h4>

      {/* Subtítulo */}
      <p className="font-medium text-sm sm:text-base mb-3 sm:mb-4 text-gray-700">
        Ayuda en caso que requieras:
      </p>

      {/* Lista de beneficios - Mobile: 1 col, Desktop: 2 cols */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-3 text-sm sm:text-base ">
        <li className="flex items-start">
          <span className="text-kover-widget-primary mr-2 shrink-0">•</span>
          <span>Avería mecánica ligera</span>
        </li>
        <li className="flex items-start">
          <span className="text-kover-widget-primary mr-2 shrink-0">•</span>
          <span>Remolque</span>
        </li>
        <li className="flex items-start">
          <span className="text-kover-widget-primary mr-2 shrink-0">•</span>
          <span>Cambio de neumático</span>
        </li>
        <li className="flex items-start">
          <span className="text-kover-widget-primary mr-2 shrink-0">•</span>
          <span>Cerrajería vehicular</span>
        </li>
        <li className="flex items-start sm:col-span-2">
          <span className="text-kover-widget-primary mr-2 shrink-0">•</span>
          <span>Envío de combustible</span>
        </li>
      </ul>
    </div>
  );
};
