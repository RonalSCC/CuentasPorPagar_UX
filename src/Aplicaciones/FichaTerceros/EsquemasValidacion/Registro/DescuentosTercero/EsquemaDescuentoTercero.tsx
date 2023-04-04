import { object, string, number, date, InferType } from 'yup';

export const EsquemaDescuentoTercero = object({
    terDesTipo: number().required("El tipo de cuenta es obligatorio"),
    terDesPlazo: number().required("El plazo es requerido").typeError("Solamente puede escribir números en este campo"),
    terDesPorcentaje: number().required("El porcentaje de descuento es requerido").max(100, "El maximo porcentaje es de 100%").min(1, "El minimo porcentaje es 1"),
    terDesObs: string().required("Las observaciones son obligatorias")
});