import * as Yup from "yup";
import IConfigValues from '../../Interfaces/Generales/IConfig';

export interface IConfigTercero {
    config: IConfigValues
}


export const schemaTercero = ({
    TER_NOCALCULAR_DV,
    PROV_TELEFONO,
    TER_FICHA_APIROS,
    PROV_CORREO_CTO,
    TER_PERMITECARACTER,
    TER_CAMBIANATJUR,
    PROV_CORREO_RLEGAL,
    TER_REQ_REPLEGAL,
    TER_REQ_ACTIVECON,
}: Record<string, IConfigValues>, editaTercero = false) => {

    const tiposDocumento = TER_PERMITECARACTER?.configObs.split(',') || []

    const schemaCrearTercero = Yup.object().shape({
        terNatJur: Yup
            .string(),
        terRazonSocial: Yup
            .string()
            .when("terNatJur", (terNatJur, schema) =>
                terNatJur == 'N' ? schema : schema.required("Debe ingresar una razón social")
            ),
        terPrimerNombre: Yup
            .string()
            .required("Debe ingresar el nombre del tercero"),
        terSegundoNombre: Yup
            .string(),
        terPrimerApellido: Yup
            .string()
            .required("Debe ingresar el apellido del tercero"),
        terSegundoApellido: Yup
            .string(),
        terTipoDocumento: Yup
            .string()
            .required("Debe seleccionar un tipo de identificación"),
        terNumeroIdentificacion: Yup
            .mixed()
            .when({
                is: (terNumeroIdentificacion: string) => terNumeroIdentificacion == "",
                then: Yup
                    .string()
                    .required("Debe ingresar el número de documento"),
                otherwise: Yup
                    .mixed()
                    .when('terTipoDocumento', {
                        is: (terTipoDocumento: string) => (tiposDocumento.includes(terTipoDocumento) && TER_PERMITECARACTER?.configValor == 1),
                        then: Yup
                            .mixed(),
                        otherwise: Yup
                            .number()
                            .positive("Solo se acepta números positivos")
                            .integer("Solo se acepta números enteros")
                            .typeError("Solo se aceptan dígitos en este campo"),
                    })
            }),
        terDigitoV: Yup
            .mixed()
            .when('terTipoDocumento', {
                is: (terTipoDocumento: string) => terTipoDocumento == 'CC',
                then: Yup
                    .string()
                    .notRequired(),
                otherwise: Yup
                    .mixed()
                    .when({
                        is: (terDigitoV: string) => terDigitoV == '',
                        then: Yup
                            .string()
                            .required(""),
                        otherwise: Yup
                            .number()
                            .positive("Solo se acepta números positivos")
                            .integer("Solo se acepta números enteros")
                            .typeError("El dígito de verificación es incorrecto")
                    })
            }),
        terTipo: Yup
            .string()
            .required("Debe Seleccionar el tipo de tercero"),
        terCiudad: Yup
            .string()
            .required("Debe ingresar la ciudad del tercero"),
        terDireccion: Yup
            .string()
            .required("Debe ingresar la dirección del tercero"),
        terTelefono: Yup
            .mixed()
            .when({
                is: (terTelefono: string) => (terTelefono == "" && PROV_TELEFONO?.configValor == 1),
                then: Yup
                    .string()
                    .notRequired(),
                otherwise: Yup
                    .mixed()
                    .when({
                        is: (terTelefono: string) => (terTelefono == "" && PROV_TELEFONO?.configValor == 1),
                        then: Yup
                            .string()
                            .required("Debe ingresar un número de teléfono"),
                        otherwise: Yup
                            .number()
                            .positive("Debe ingresar un número valido de teléfono")
                            .integer("Debe ingresar un número valido de teléfono")
                            .typeError("Debe ingresar un número valido de teléfono")
                            .test('maxDigitos',
                                `Número de caracteres superado, máximo: ${PROV_TELEFONO?.configObs}`,
                                (value) => ((value) ? value.toString().length : 0) <= parseInt(PROV_TELEFONO?.configObs))
                    })
            }),
        terCelular: Yup
            .mixed()
            .when({
                is: (terCelular: string) => (terCelular == "" && PROV_TELEFONO?.configValor == 1),
                then: Yup
                    .string()
                    .notRequired(),
                otherwise: Yup
                    .mixed()
                    .when({
                        is: (terCelular: string) => (terCelular == "" && PROV_TELEFONO?.configValor == 1),
                        then: Yup
                            .string()
                            .required("Debe ingresar un número de celular"),
                        otherwise: Yup
                            .number()
                            .positive("Debe ingresar un número valido de celular")
                            .integer("Debe ingresar un número valido de celular")
                            .typeError("Debe ingresar un número valido de celular")
                            .test('maxDigitos',
                                `Número de caracteres superado, máximo: ${PROV_TELEFONO?.configObs}`,
                                (value) => ((value) ? value.toString().length : 0) <= parseInt(PROV_TELEFONO?.configObs))
                    })
            }),
        terContactoPrincipalNombre: Yup
            .string()
            .required("Debe ingresar el nombre del contacto principal"),
        terContactoPrincipalEmail: Yup
            .mixed()
            .when({
                is: (terContactoPrincipalEmail: string) => terContactoPrincipalEmail == "" && PROV_CORREO_CTO?.configValor == 0,
                then: Yup
                    .string()
                    .notRequired(),
                otherwise: Yup
                    .string()
                    .email("El campo no corresponde a una dirección email correcta")
                    .required("Debe ingresar el correo electrónico del contacto principal"),
            })
    })

    const schemaEditarTercero = Yup.object().shape({
        ...schemaCrearTercero.fields,
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
                .email("El campo no corresponde a una dirección email correcta")
                .required("Debe ingresar el correo electrónico del representante legal"),
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

    if (editaTercero == true)
        return schemaEditarTercero;
    else
        return schemaCrearTercero;
}