//Datos en duro necesarios para generar el número de cotización.
// Estos valores se reemplazarán con datos reales más adelante.
export const API_DEFAULTS = {
    
    product: 'drive-insurance',
    
    customerDefaults: {
        occupation: 'Vendedor o Comerciante', // O 'A definir'
        address: {
            province: 'Distrito Nacional / Santo Domingo',
            municipality: 'Santo Domingo de Guzmán',
            sector: '16 de Agosto',
            street: '1',
            houseNumber: '25',
            referencePoint: 'Cerca del parque',
        },
    },

    vehicleDefaults: {
        plate: 'G320734',
        color: 'BLANCO',
        displacement: 4,
        doors: 4,
        chassis: '123123',
        engine: '25874',
    },
    paymentDefaults: {
        paymentFraction: 'M', // Mensual por defecto
        paymentMethod: 't/c', // Tarjeta de crédito por defecto
    },
};
