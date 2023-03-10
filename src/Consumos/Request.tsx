import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { useState, useEffect } from 'react';
import { CrearPeticionAxios } from './APIManager';
import IRespuestaGeneral from './IRespuestaGeneral';
import Loader from './Loader';
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactDOMServer from 'react-dom/server';

export interface SendRequestAxios {
    API: "CONFIGURACION"|"CUENTASPORPAGAR",
    URLServicio: string,
    Body?: any,
    Headers?: AxiosRequestHeaders,
    ShowLoader?:boolean 
}

export interface RequestAYF {
    post(DatosEnvio:SendRequestAxios): Promise<void|IRespuestaGeneral>,
    get(DatosEnvio:SendRequestAxios): Promise<void|IRespuestaGeneral>,
    delete(DatosEnvio:SendRequestAxios): Promise<void|IRespuestaGeneral>,
    put(DatosEnvio:SendRequestAxios): Promise<void|IRespuestaGeneral>,
}

export const SendRequest: RequestAYF = {
    async post(
        {
            API,
            ShowLoader = true,
            URLServicio,
            Body,
            Headers
        }
    ) {
        const axiosRequest = GetInstanceAxios(API);
       
        if (ShowLoader == true) {
            VerOcultarLoader(true);
        }

        return await axiosRequest.post(
            URLServicio, 
            Body,
            {
                headers:Headers != null ? Headers : {}
            }
        )
        .then(function({data}:{data:IRespuestaGeneral}){
            return data;
        })
        .catch(function({response}){
            return response.data;
        })
        .finally(function(){
            if (ShowLoader == true) {
                VerOcultarLoader(false);
            }
        })
    },
    async get(
        {
            API,
            ShowLoader = true,
            URLServicio,
            Body,
            Headers
        }
    ) {
        const axiosRequest = GetInstanceAxios(API);
        if (ShowLoader == true) {
            VerOcultarLoader(true);
        }
        return await axiosRequest.get(
            URLServicio, 
            {
                params:Body
            }
        )
        .then(function({data}:{data:IRespuestaGeneral}){
            return data;
        })
        .catch(function(error){
            console.log(error);
        })
        .finally(function(){
            if (ShowLoader == true) {
                VerOcultarLoader(false);
            }
        });
    },
    async delete(
        {
            API,
            ShowLoader = true,
            URLServicio,
            Body,
            Headers
        }
    ) {
        const axiosRequest = GetInstanceAxios(API);
        if (ShowLoader == true) {
            VerOcultarLoader(true);
        }
        return await axiosRequest.delete(
            URLServicio,
            {
                params:Body
            }
        )
        .then(function({data}:{data:IRespuestaGeneral}){
            return data;
        })
        .catch(function(error){
            console.log(error);
        })
        .finally(function(){
            if (ShowLoader == true) {
                VerOcultarLoader(false);
            }
        });
    },
    async put(
        {
            API,
            ShowLoader = true,
            URLServicio,
            Body
        }
    ) {
        const axiosRequest = GetInstanceAxios(API);
        if (ShowLoader == true) {
            VerOcultarLoader(true);
        }
        return await axiosRequest.put(
            URLServicio,
            Body
        )
        .then(function({data}:{data:IRespuestaGeneral}){
            return data;
        })
        .catch(function(error){
            console.log(error);
        })
        .finally(function(){
            if (ShowLoader == true) {
                VerOcultarLoader(false);
            }
        });
    },
}

const GetInstanceAxios = (API:string) =>  {
    const axiosRequest = axios.create({
        baseURL: API == "CUENTASPORPAGAR" ? process.env.REACT_APP_URL_API_CUENTAS_POR_PAGAR :   process.env.REACT_APP_URL_API_CONFIGURACION
    });

    return axiosRequest;
}

const VerOcultarLoader = (estado:boolean)=>{
    let loader = document.querySelector('[itemid="Loader"]') as HTMLElement;
    if (loader) {
        if (estado) {
            loader.style.display = "flex";
        }else{
            loader.style.display = "none";
        }
    }
}