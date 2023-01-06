// commmon modules
import axios from 'axios';
import { AxiosRequestHeaders } from 'axios';
import IRespuestaGeneral from './IRespuestaGeneral';

export const axiosRequest = axios.create({
    baseURL: process.env.REACT_APP_URL_API
});

export interface CrearPeticionAxios {
    URLServicio: string,
    Body: any
    Headers?: AxiosRequestHeaders
}
export const CrearPeticion= async(DatosEnvio:CrearPeticionAxios):Promise<void|IRespuestaGeneral>=> {
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
    .catch(function(error){
        console.log(error);
    })
}