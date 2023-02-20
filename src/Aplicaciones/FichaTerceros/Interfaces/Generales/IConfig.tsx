export default interface IConfigValues {
    confiId: number,
    configDescripcion: string,
    configObs: string,
    configValor: number
}

export default interface IConfig {
    key: string,
    value: IConfigValues

}
