import { CrearPeticion } from "./APIManager";
import { IErrorGeneral } from "./IRespuestaGeneral";

export interface IConfigEntrada{
    ConfigID: string,
    ValorDefecto?: string,
    ObsDefecto?: string
}

export interface PropsObtenerConfigs{
    UsuarioID: 1,
    ListaConfigs: Array<IConfigEntrada>
}



export interface RetornoObtenerConfigs{
    ObjConfigs?:any,
    Errores?:Array<IErrorGeneral>
}
export  default async function ObtenerConfigs(
    {
        UsuarioID,
        ListaConfigs
    }:PropsObtenerConfigs
):Promise<RetornoObtenerConfigs> 
{
    let retorno:RetornoObtenerConfigs = {};
    let respuesta = await CrearPeticion({
        API: "CONFIGURACION",
        URLServicio: "/ConsultasGenerales/ConsultarConfigs",
        Type: "POST",
        Body:{
            UsuarioID: UsuarioID,
            ListaConfigs: ListaConfigs
        }
    });

    if (respuesta != undefined) {
        if(respuesta.ok){
            retorno.ObjConfigs = respuesta.datos;
        }
        else if (respuesta.errores && respuesta.errores.length > 0) {
            retorno.Errores = respuesta.errores;
        }
    }

    return retorno;
}
