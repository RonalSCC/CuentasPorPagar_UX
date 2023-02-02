export interface IErrorGeneral {
    codigo:string,
    descripcion:string
}

export interface IPaginacion {
    siguiente:string,
    anteriror:string,
    primera:string,
    ultima:string,
    totalRegistros:number
}

export default interface IRespuestaGeneral {
    codigo: number,
    datos: any|Array<any>,
    descripcion:string,
    errores?:null|Array<IErrorGeneral>,
    ok: boolean,
    paginacion?:IPaginacion
};

