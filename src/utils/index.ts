export const formatNumber = (value: number | string): string => {
  if (!value) return ''; // Si está vacío, no retorna nada
  
  return new Intl.NumberFormat('es-DO', {
    style: 'decimal', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value));
};