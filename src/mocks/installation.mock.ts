export const InstallationTypes = {
  DOMICILIO: 'Visita de un técnico a domicilio',
  CENTRO_ESPECIALIZADO: 'Instalación en un centro especializado',
} as const;


export const installationTypes = [
  'Instalación en un centro especializado',
  'Visita de un técnico a domicilio',
];

export const installationMunicipalities: Record<string, string[]> = {
  'Instalación en un centro especializado': [
    'Santo Domingo',
    'Santo Domingo Este',
    'Santiago',
    'Punta Cana / Bávaro',
    'Puerto Plata',
    'San Francisco de Macoris',
    'San Pedro de Macoris',
  ],
  'Visita de un técnico a domicilio': ['Santo Domingo', 'Santo Domingo Este', 'Santiago'],
};

export const municipalityLocations: Record<string, { location: string; phone: string }> = {
  'Santo Domingo': {
    location: 'Av. 27 de Febrero No. 301, Evaristo Morales',
    phone: '(809) 620-2002',
  },
  'Santo Domingo Este': {
    location: 'Av. San Vicente de Paul Marginal Sur #3',
    phone: '(809) 331-2002',
  },
  'Santiago': {
    location: 'Av. Juan Pablo Duarte No. 192, Villa Olga',
    phone: '(809) 226-1717',
  },
  'Punta Cana / Bávaro': {
    location: 'Av. Barceló, Plaza Paseo Colonial, Local No.10',
    phone: '(809) 669-5521',
  },
  'Puerto Plata': {
    location: 'Av. Manolo Tavárez Justo No. 70',
    phone: '(809) 669-6677',
  },
  'San Francisco de Macoris': {
    location: 'Av. Presidente Antonio Guzmán Fdez., Km 3, Centro de la Ciudad',
    phone: '(809) 294-1221',
  },
  'San Pedro de Macoris': {
    location: 'Plaza Las Nietas, Calle General Cabral #58',
    phone: '(809) 669-9197',
  },
};
