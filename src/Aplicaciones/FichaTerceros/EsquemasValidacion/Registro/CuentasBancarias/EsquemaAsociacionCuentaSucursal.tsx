import { object, string, number, date, InferType } from 'yup';

export const EsquemaAsociacionCuentaSucursal = object({
    SucursalId: number().required("La sucursal es obligatoria")
});