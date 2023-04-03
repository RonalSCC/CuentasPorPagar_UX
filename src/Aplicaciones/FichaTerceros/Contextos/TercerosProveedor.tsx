import { Alert, AlertTitle, CircularProgress, Collapse, Fade, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CrearPeticion } from '../../../Consumos/APIManager'
import ObtenerConfigs from '../../../Consumos/ObtenerConfigs'
import IAccesosFicha from '../Interfaces/Contextos/IAccesosFicha'
import { TercerosContexto } from './TercerosContexto'

export interface TerceroSeleccionadoLista{
    TerDVNit:string,
    TerID:string,
    TerNit:string,
    TerNombre:string,
    TerTipoIden:string,
    TerNatJur: string
}

export interface PropsTerceroContexto {
    TerceroSeleccionadoLista: TerceroSeleccionadoLista | null, 
    NuevoRegistro: boolean, 
    TituloPageHeader: string
    CambiarEstadoNuevoRegistro: (NuevoEstado: boolean) => void,
    CambiarTituloPageHeader: Function,
    CambiarTerceroSeleccionadoLista: Function,
    CambiarAlertas:(ListaAlertas: Array<JSX.Element>) => void,
    CerrarAlertas: Function,
    ObjConfigs:any,
    CambiarEstadoLoader: (estado: boolean) => void,
    BloquearCamposAcceso: (ID: string) => boolean
}
export default function TercerosProveedor(
    {
        children
    }:
    {
        children: any
    }
){
    const [terceroSeleccionadoLista, setTerceroSeleccionadoLista] = useState<TerceroSeleccionadoLista|null>(null);
    const [nuevoRegistro, setNuevoRegistro] = useState<boolean>(false);
    const [tituloPageHeader, setTituloPageHeader] = useState("");
    const [listaAlertas, setListaAlertas] = useState<Array<JSX.Element>>();
    const [ObjConfigs, setObjConfigs] = useState<any>({});
    const [Loader, setLoader] = useState(false);
    const [AccesosFicha, setAccesosFicha] = useState<Array<IAccesosFicha>>([]);

    useEffect(() => {
        ConsultarConfigs();
        ConsultarAccesosFicha();
    }, [])

    useEffect(() => {
      setTimeout(function(){
        CerrarAlertas();
      },3000);
    }, [listaAlertas])
    

    const ConsultarConfigs = async ()=> {
        const Config = await ObtenerConfigs({
            UsuarioID: 1,
            ListaConfigs: [{
              ConfigID: "TER_CAMBIANATJUR",
            }]
        });
        if(Config?.ObjConfigs){
            setObjConfigs(Config?.ObjConfigs)
        }
        if (Config.Errores && Config?.Errores.length > 0 ) {
            CambiarAlertas(
                Config.Errores.map(x=> {
                    return <>
                    <Alert 
                        key={x.descripcion} 
                        severity="warning"
                        onClose={()=> propsTercerosContexto.CerrarAlertas()}
                    >
                        <AlertTitle>Error</AlertTitle>
                        {x.descripcion}
                    </Alert>
                    </>;
                })
            );
        }
        
    }

    const ConsultarAccesosFicha = async ()=> {
        await CrearPeticion({
            API: "CUENTASPORPAGAR",
            URLServicio: "/AdministracionTerceros/Consultar_AccesosFichaTercero",
            Type: "GET"
        }).then((respuesta)=> {
            if (respuesta != null && respuesta.ok == true) {
                setAccesosFicha(respuesta.datos);
            }
        });
    }

    const CambiarTerceroSeleccionadoLista = (TerceroNuevo:TerceroSeleccionadoLista) => {
        setTerceroSeleccionadoLista(TerceroNuevo);
    }

    const CambiarEstadoNuevoRegistro = (NuevoEstado:boolean) => {
        setNuevoRegistro(NuevoEstado);
    }

    const CambiarTituloPageHeader = (titulo:string)=>{
        if (titulo) {
            setTituloPageHeader(titulo);
        }
    }

    const CambiarAlertas=(ListaAlertas:Array<JSX.Element>)=> {
        if (ListaAlertas && ListaAlertas.length > 0) {
            setListaAlertas(ListaAlertas);
        }
    }

    const CerrarAlertas = ()=>{
        setListaAlertas(undefined);
    }

    const CambiarEstadoLoader = (estado:boolean)=> {
        let body = document.getElementsByTagName("body");
        if (!estado) {
            setTimeout(function(){
                setLoader(estado);
                if (body) {
                    body[0].style.opacity = "1";
                }
            },1500);
        }else{
            setLoader(estado);
            if (body) {
                body[0].style.opacity = "0.6";
            }
        }
    }
    
    const BloquearCamposAcceso = (ID:string) => {
        let itemExists = AccesosFicha.filter(ele => ele.caftdElemento == ID);
        if (itemExists && itemExists.length > 0) {
            return true;
        }else{
            return false;
        }
    }

    const propsTercerosContexto:PropsTerceroContexto = {
        TerceroSeleccionadoLista: terceroSeleccionadoLista, 
        CambiarTerceroSeleccionadoLista: CambiarTerceroSeleccionadoLista,
        NuevoRegistro: nuevoRegistro, 
        CambiarEstadoNuevoRegistro: CambiarEstadoNuevoRegistro,
        CambiarTituloPageHeader,
        TituloPageHeader: tituloPageHeader,
        CambiarAlertas,
        CerrarAlertas,
        ObjConfigs,
        CambiarEstadoLoader,
        BloquearCamposAcceso
    };

    return (
        <TercerosContexto.Provider value={{propsTercerosContexto}}>
            {children}
            <Fade in={listaAlertas != null && listaAlertas.length > 0} timeout={{enter: 500}}>
                <Stack border={"1px solid rgba(0,0,0,.2)"} gap={1} sx={{position:"fixed", top:"1%", right:"3%", zIndex:100}} >
                    {
                        listaAlertas
                    }
                </Stack>
            </Fade>
             {
                Loader == true && 
                <Stack zIndex={10000} position={"fixed"} height="100%" width="100%" display={"flex"} justifyContent="center" alignItems={"center"}>
                    <CircularProgress />
                </Stack>
             }       
        </TercerosContexto.Provider>
    )
}

