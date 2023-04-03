export default interface IImpuestoConfigTributaria{
    id: string,
    nombre: string,
    nombreMostrar: string,
    oculto: boolean,
    valor: string,
    otrasConfiguraciones: boolean,
    lista?: Array<IOpcionListaImpuestoConfig>,
    idAcceso: string
}

interface IOpcionListaImpuestoConfig {
    valor:string,
    nombre:string
}