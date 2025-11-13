import { provinces, municipalities } from "@/mocks/directions.mock";

export const getProvinces = () => {
  return provinces;
}

export const getMunicipalities = (provinceId: number) => {
  return municipalities.filter((municipality) => municipality.provinciaId === provinceId);
}
