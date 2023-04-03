import * as Yup from "yup";
import IConfigValues from '../../Interfaces/Generales/IConfig';
import {EsquemaCrearTercero} from '../CrearEditarTerceroSchema/EsquemaCrearTercero'

export interface IConfigTercero {
    config: IConfigValues
}

export const EsquemaEditarTercero = ({
    PROV_TELEFONO,
    PROV_CORREO_CTO,
    TER_PERMITECARACTER,
    PROV_CORREO_RLEGAL,
    TER_REQ_REPLEGAL,
    TER_REQ_ACTIVECON,
}: Record<string, IConfigValues>) => {

    return Yup.object().shape({
        ...EsquemaCrearTercero({
                TER_PERMITECARACTER,
                PROV_TELEFONO,
                PROV_CORREO_CTO,
            }).fields,
        terSubTipo: Yup
            .string()
            .required("Debe Seleccionar el subtipo del tercero"),
        terActividadEconomica: Yup
        .mixed()
        .when({
            is: (terActividadEconomica: string) =>
                (terActividadEconomica == "" && TER_REQ_ACTIVECON?.configValor == 0),
            then: Yup
                .string()
                .notRequired(),
            otherwise: Yup
                .string()
                .required("Debe ingresar una actividad económica"),
        }),
        terEmail: Yup
            .string()
            .email("El campo no corresponde a una dirección de email correcta"),
        terFormaPago: Yup
            .string(),
        terObservaciones: Yup
            .string(),
        terRepresentanteLNombre: Yup
            .mixed()
            .when({
                is: (terRepresentanteLNombre: string) => (terRepresentanteLNombre == "" && TER_REQ_REPLEGAL?.configValor == 0),
                then: Yup
                    .string()
                    .notRequired(),
                otherwise: Yup
                    .string()
                    .email("El campo no corresponde a una dirección email correcta")
                    .required("Debe ingresar el nombre del representante legal"),
            }),
        terRepresentanteLIdentificacion: Yup
            .mixed()
            .when({
                is: (terRepresentanteLIdentificacion: string) => (terRepresentanteLIdentificacion == "" && TER_REQ_REPLEGAL?.configValor == 0),
                then: Yup
                    .string()
                    .notRequired(),
                otherwise: Yup
                    .string()
                    .email("El campo no corresponde a una dirección email correcta")
                    .required("Debe ingresar un número de identificación del representante legal"),
            }),
        terRepresentanteLExpedicion: Yup
            .mixed()
            .when({
                is: (terRepresentanteLExpedicion: string) => (terRepresentanteLExpedicion == "" && TER_REQ_REPLEGAL?.configValor == 0),
                then: Yup
                    .string()
                    .notRequired(),
                otherwise: Yup
                    .string()
                    .email("El campo no corresponde a una dirección email correcta")
                    .required("Debe ingresar la fecha de expedición del representante legal"),
            }),
        terRepresentanteLEmail: Yup
            .mixed()
            .when({
                is: (terRepresentanteLEmail: string) =>
                    (terRepresentanteLEmail == "" && (PROV_CORREO_RLEGAL?.configValor == 0 || TER_REQ_REPLEGAL?.configValor == 0)),
                then: Yup
                    .string()
                    .notRequired(),
                otherwise: Yup
                    .string()
                    .email("El campo no corresponde a una dirección email correcta")
                    .required("Debe ingresar el correo electrónico del representante legal"),
            }),
        terEstado: Yup
            .boolean()

    })    
}