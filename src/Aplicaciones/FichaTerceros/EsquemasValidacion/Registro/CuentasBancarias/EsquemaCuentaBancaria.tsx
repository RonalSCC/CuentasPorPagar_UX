import { object, string, number, date, InferType } from 'yup';

export const EsquemaCuentaBancaria = object({
    tcbEntidad: string().required("La entidad es obligatoria"),
    tcbTipo: number().required("El tipo de cuenta es obligatorio"),
    tcbCuentaNo: number().required("El número de cuenta es obligatorio").typeError("Solamente puede escribir números en este campo"),
    tcbEmail: string().email("Debe registrar un email valido").nullable()
});