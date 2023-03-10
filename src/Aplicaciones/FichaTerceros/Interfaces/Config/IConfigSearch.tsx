export default interface IConfigSearch {
    listaConfigs: Array<IItemConfigSearch>
}

export interface IItemConfigSearch{
    configID: string,
    valorDefecto?: number,
    obsDefecto?: string
}