export interface IErrorGeneral {
    Codigo:string,
    Descripcion:string
}

export interface IPaginacion {
    Siguiente:string,
    Anteriror:string,
    Primera:string,
    Ultima:string,
    TotalRegistros:number
}

export default interface IRespuestaGeneral {
    Codigo: number,
    Datos: object|Array<any>,
    Descripcion:string,
    Errores?:null|Array<IErrorGeneral>,
    Ok: boolean,
    Paginacion?:IPaginacion
};

