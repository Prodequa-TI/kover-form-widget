
export const insuranceExclusions = [
  {
    id: 1,
    exclusions: [
      {
        description: 'Los accidentes o pérdidas debido al manifiesto descuido o negligencia en el mantenimiento del vehículo de motor en condiciones de eficiencia.'
      },
      {
        description: 'Los Accidentes ocurridos mientras el vehículo de motor esté destinado a:',
        details: [
          'Prácticas de aprendizaje o de entrenamiento.',
          'Fuese usado para transporte de explosivos.',
        ]
      },
      {
        description: 'Los accidentes ocurridos mientras el vehículo de motor fuese conducido por personas sin licencia de conducir o que no estén capacitadas y autorizadas legalmente para manejar ese tipo de vehículo; o que se encuentre bajo la influencia de bebidas embriagantes o drogas tóxicas o heroicas.'
      },
      {
        description: 'Las lesiones, pérdidas o daños ocurridos mientras se le da al vehículo asegurado un uso distinto al declarado en la solicitud.'
      }
    ]
  },
  {
    id: 2,
    exclusions: [
      {
        description: 'La responsabilidad, así como daños ocasionados al vehículo asegurado como consecuencia de la participación del vehículo asegurado en apuestas, desafíos, carreras o concursos de cualquier naturaleza o en sus propias preparatorias.'
      },
      {
        description: 'Los daños ocasionados al vehículo de motor asegurado, como consecuencia de la imprudencia temeraria del conductor.'
      },
      {
        description: 'Daños o pérdidas ocasionadas a la carrocería del vehículo asegurado o parte de ella, cuando dicha carrocería haya sido modificada para cambiar su uso o apariencia original o por cualquiera otra causa; a menos que dicho cambio haya sido señalado por escrito por el Asegurado y se haga constar en la Póliza mediante endoso.'
      }
    ]
  }
]

interface InsuranceConsiderations {
  description: string;
  details?: string[];
  tooltip?: string;
}

export const driveIsuranceConsiderations: InsuranceConsiderations[] = [
  {
    description: 'Prescripción: 2 años',
    tooltip: 'Es el tiempo máximo, posterior a que se haya presentado un siniestro, después del cual no podrá establecerse ninguna reclamación o acción legal contra Unit.'
  },
  {
    description: 'Período de gracia: 10 días calendario',
    tooltip: 'Tiempo máximo para hacer el pago de la prima, posterior a tu fecha de corte.'
  },
  {
    description: 'Deducible:',
    details: [
      '1% de la Suma Asegurada, mínimo RD$5,000.',
      'En Rotura de Cristales: 10% de la pérdida, mínimo RD$1,000.'
    ]
  },
  {
    description: 'Aviso de Accidente: Inmediatamente, a más tardar 2 días hábiles.'
  },
  {
    description: 'Edad de Aceptación: Antigüedad del vehículo hasta 15 años para ingresar. Puede permanecer por tiempo indefinido.',
    tooltip: 'Antigüedad del vehículo para poder contratar y tope máximo de aceptación de cobertura.'
  },
  {
    description: 'Instalación y Mantenimiento de Dispositivo Inteligente:',
    details: [
      'El Asegurado se compromete a instalar el Dispositivo Inteligente, mantenerlo conectado al vehículo y no manipularlo o destruirlo.',
      'El Asegurado se compromete a instalarlo dentro de los primeros 5 días laborables. En caso contrario se cobrarán 833 km por el primer mes. Si El Asegurado persiste sin instalar El Dispositivo luego de trascurrido el primer mes de vigencia, la póliza quedará automáticamente cancelada.'
    ]
  },
  {
    description: 'En caso de que el seguro sea cancelado por La Compañía o por El Asegurado durante el primer año de vigencia, se hará un cargo de RD$1,250, al medio de pago registrado, por concepto del Dispositivo Inteligente'
  }
]

export const autoInsuranceConsiderations: InsuranceConsiderations[] = [
  {
    description: 'Prescripción: 2 años',
    tooltip: 'Es el tiempo máximo, posterior a que se haya presentado un siniestro, después del cual no podrá establecerse ninguna reclamación o acción legal contra Unit.'
  },
  {
    description: 'Periodo de gracia: 10 días calendario',
    tooltip: 'Tiempo máximo para hacer el pago de la prima, posterior a tu fecha de corte.'
  },
  {
    description: 'Deducible:',
    details: [
      '1% de la Suma Asegurada, mínimo RD$5,000.',
      'En Rotura de Cristales: 10% de la pérdida, mínimo RD$1,000.'
    ]
  },
  {
    description: 'Aviso de Accidente: Inmediatamente, a más tardar 2 días hábiles.'
  },
  {
    description: 'Edad de Aceptación: Antigüedad del vehículo hasta 15 años para ingresar. Puede permanecer por tiempo indefinido.',
    tooltip: 'Antigüedad del vehículo para poder contratar y tope máximo de aceptación de cobertura.'
  }
];

export const driveInsuranceBenefits = [
  {
    description: 'Límite de cobro por Km: ',
    details: [
      '1,050 Km al mes.'
    ],
    tooltip: '¡Los Km que recorras luego de este límite no te los cobraremos!'
  },
  {
    description: 'Beneficios de Buen Conductor: ',
    details:[
      'A partir del 3er mes.'
    ],
    tooltip: 'Podrás recibir hasta un 15% de descuento en tu tarifa por Km dependiendo de tus hábitos de conducción.'
  }
]

export const enum InsurancesType {
  AUTO_INSURANCE = 'auto-insurance',
  DRIVE_INSURANCE = 'drive-insurance',
}

export const insuranceConsiderations: Record<InsurancesType, InsuranceConsiderations[]> = {
  [InsurancesType.AUTO_INSURANCE]: autoInsuranceConsiderations,
  [InsurancesType.DRIVE_INSURANCE]: driveIsuranceConsiderations,
}
