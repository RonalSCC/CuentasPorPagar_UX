import * as Yup from "yup";

export const schemaTercero = ({
    TER_VALIDA_DV,
    TER_NOCALCULAR_DV,
    PROV_TELEFONO,
    TER_REQ_REPLEGAL,
    TER_FICHA_APIROS,
    PROV_CORREO_CTO,
    editaTercero = false
}) => {

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
            .number()
            .required("Debe ingresar el NIT del tercero")
            .typeError("Solo se aceptan dígitos en este campo")
            .positive("Solo se acepta números positivos")
            .integer("Solo se acepta números enteros"),
        terDigitoV: Yup
            .number()
            .when({
                is: () => TER_VALIDA_DV?.configValor == 1 && TER_NOCALCULAR_DV?.configValor == 0,
                then: Yup
                    .number()
                    .required("Este campo es requerido")
                    .typeError("El dígito de verificación es incorrecto")
            })
            .positive("Solo se acepta números positivos")
            .integer("Solo se acepta números enteros"),
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
            .number()
            .when({
                is: () => PROV_TELEFONO?.configValor == 1 || TER_REQ_REPLEGAL?.configValor == 1,
                then: Yup
                    .number()
                    .required("Debe ingresar un teléfono")
                    .typeError("Solo se aceptan digitos en este campo"),
                otherwise: Yup
                    .number()
                    .typeError("Solo se aceptan digitos en este campo")
                    .notRequired()
            })
            .positive("Solo se acepta números positivos")
            .integer("Solo se acepta números enteros"),
        terCelular: Yup.mixed()
            .when({
                is: (terCelular) => terCelular == "",
                then: Yup
                    .string()
                    .required("Debe ingresar un teléfono celular"),
                otherwise: Yup.number()
                    .positive("Solo se acepta números positivos")
                    .integer("Solo se acepta números enteros")
                    .typeError("Este campo debe ser númerico"),
            }),
        terContactoPrincipalNombre: Yup
            .string()
            .required("Debe ingresar el nombre del contacto principal"),
        terContactoPrincipalEmail: Yup
            .string()
            .email("El campo no corresponde a una dirección email correcta")
            .when({
                is: () => TER_FICHA_APIROS?.configValor != 1 && PROV_CORREO_CTO?.configValor == 1,
                then: Yup
                    .string()
                    .required("Debe ingresar el correo electrónico del contacto principal"),
            }),

    })

    const schemaEditarTercero = Yup.object().shape({
        ...schemaCrearTercero.fields,
        terSubTipo: Yup
            .string()
            .required("Debe Seleccionar el subtipo del tercero"),
        terActividadEconomica: Yup
            .string(),
        terEmail: Yup
            .string()
            .email("El campo no corresponde a una dirección de email correcta"),
        terFormaPago: Yup
            .string(),
        terObservaciones: Yup
            .string(),
        terRepresentanteLNombre: Yup
            .string(),
        terRepresentanteLIdentificacion: Yup
        .mixed()
        .when({
            is: (terRepresentanteLIdentificacion) => terRepresentanteLIdentificacion == "",
            then: Yup
                .string()
                .required("Debe ingresar un número de identificación"),
            otherwise: Yup.number()
                .positive("Solo se aceptan números positivos")
                .integer("Solo se acepta números enteros")
                .typeError("Este campo debe ser númerico"),
        terRepresentanteLExpedicion: Yup
            .string(),
        terRepresentanteLEmail: Yup
            .string()
            .email()
        }),
        terEstado: Yup
            .boolean()

    })

    if (editaTercero == true)
        return schemaEditarTercero;
    else
        return schemaCrearTercero;
}