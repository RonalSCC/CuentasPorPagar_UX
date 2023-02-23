// commmon modules
import { Alert } from '@mui/material';
import axios from 'axios';
import { AxiosRequestHeaders } from 'axios';
import IRespuestaGeneral from './IRespuestaGeneral';

export interface CrearPeticionAxios {
    API:string,
    URLServicio: string,
    Body: any,
    Type:string,
    Headers?: AxiosRequestHeaders
}
export const CrearPeticion= async(DatosEnvio:CrearPeticionAxios):Promise<void|IRespuestaGeneral>=> {

    let URLAPI:string|undefined;
    if (DatosEnvio.API == "CUENTASPORPAGAR") {
        URLAPI = process.env.REACT_APP_URL_API_CUENTAS_POR_PAGAR;
    }else if(DatosEnvio.API == "CONFIGURACION"){
        URLAPI = process.env.REACT_APP_URL_API_CONFIGURACION;
    }

    const axiosRequest = axios.create({
        baseURL: DatosEnvio.API == "CUENTASPORPAGAR" ? process.env.REACT_APP_URL_API_CUENTAS_POR_PAGAR :   process.env.REACT_APP_URL_API_CONFIGURACION
    });

    if (DatosEnvio.Type == "POST") {
        return await axiosRequest.post(
            DatosEnvio.URLServicio, 
            DatosEnvio.Body,
            {
                headers:DatosEnvio.Headers != null ? DatosEnvio.Headers : {}
            }
        )
        .then(function({data}:{data:IRespuestaGeneral}){
            return data;
        })
        .catch(function({response}){
            return response.data;
        })
    }else if (DatosEnvio.Type == 'GET'){
        return await axiosRequest.get(
            DatosEnvio.URLServicio, 
            {
                params:DatosEnvio.Body
            }
        )
        .then(function({data}:{data:IRespuestaGeneral}){
            return data;
        })
        .catch(function(error){
            console.log(error);
        })
    } 
    else{
        return await axiosRequest.delete(
            DatosEnvio.URLServicio, 
            {
                params:DatosEnvio.Body
            }
        )
        .then(function({data}:{data:IRespuestaGeneral}){
            return data;
        })
        .catch(function(error){
            console.log(error);
        }) 
    }
}