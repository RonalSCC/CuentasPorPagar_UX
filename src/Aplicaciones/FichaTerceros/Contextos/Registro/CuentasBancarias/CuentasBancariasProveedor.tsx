import React, { useEffect, useState } from 'react'
import { CrearPeticion, CrearPeticionAxios } from '../../../../../Consumos/APIManager'
import IConfigSearch from '../../../Interfaces/Config/IConfigSearch'
import IBanco from '../../../Interfaces/Generales/IBanco'
import ITipoCuenta from '../../../Interfaces/Generales/ITipoCuenta'
import { ICuentaBancaria } from '../../../Interfaces/Registro/CuentasBancarias/ICuentaBancaria'
import ISucursalCuentaBancaria from '../../../Interfaces/Registro/CuentasBancarias/ISucursalCuentaBancaria'
import { CuentasBancariasContexto } from './CuentasBancariasContexto'

export interface CuentasBancariasProveedorProps {
    children: any
}

export interface paramsCuentasBancariasContexto {
    CuentaExpandida: ICuentaBancaria | undefined,
    CambiarCuentaSeleccionada : (cuentaExpandida?: ICuentaBancaria) => void,
    ListaBancos: Array<IBanco>| undefined,
    ListaTiposCuenta: Array<ITipoCuenta>| undefined,
    ShowModalCrearEditar: boolean,
    CambiarEstadoModalCrearEditar:(estado: boolean) => void,
    ActualizarCuentas: boolean,
    CambiarEstadoActualizarCuentas: (estado: boolean) => void,
    Configs: any
}
export default function CuentasBancariasProveedor(
    {
        children
    }: CuentasBancariasProveedorProps
) {

    const [ShowModalCrearEditar, setShowModalCrearEditar] = useState(false);
    const [CuentaExpandida, setCuentaExpandida] = useState<ICuentaBancaria>();
    const [ListaBancos, setListaBancos] = useState<Array<IBanco>>();
    const [ListaTiposCuenta, setListaTiposCuenta] = useState<Array<ITipoCuenta>>();
    const [ActualizarCuentas, setActualizarCuentas] = useState(false);
    const [Configs, setConfigs] = useState();

    useEffect(() => {
      ConsultarListas();
      ConsultarConfigs();
    }, [])
    

    const ConsultarListas = async ()=> {
      let PropsDefaultRequest:CrearPeticionAxios = {
        API: "CONFIGURACION",
        URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
        Type:"GET"
      };
  
      // ---- Bancos
      await CrearPeticion({
        ...PropsDefaultRequest,
        Body:{
            Clave: 'Bancos'
        }
      }).then((respuesta)=> {
        if (respuesta != null && respuesta.ok == true) {
          setListaBancos(respuesta.datos);
        }
      });
  
      // ---- TiposCuenta
      await CrearPeticion({
        ...PropsDefaultRequest,
        Body:{
            UsuarioID: 1,
            Clave: 'TiposCuenta'
        }
      }).then((respuesta)=> {
        if (respuesta != null && respuesta.ok == true) {
            setListaTiposCuenta(respuesta.datos);
        }
      });
    }
    
    const ConsultarConfigs = async()=> {
        let Envio:IConfigSearch = {
            listaConfigs: [
                {
                    configID: "CTB_MATRICULARIESGOS",
                    valorDefecto: 0
                }
            ]
        }

        await CrearPeticion({
            API: "CONFIGURACION",
            URLServicio: "/ConsultasGenerales/ConsultarConfigs",
            Type:"POST",
            Body:Envio
        }).then((respuesta)=> {
            if (respuesta != null && respuesta.ok == true) {
                setConfigs(respuesta.datos);
            }
        });
    }

    const CambiarCuentaSeleccionada = (cuentaExpandida?:ICuentaBancaria|undefined)=> {
        if (cuentaExpandida) {
            setCuentaExpandida({...cuentaExpandida});
        }else{
            setCuentaExpandida(undefined);
        }
    }

    const CambiarEstadoModalCrearEditar = (estado:boolean)=> {
        setShowModalCrearEditar(estado);
    }

    const CambiarEstadoActualizarCuentas = (estado:boolean)=> {
        setActualizarCuentas(estado);
        if (estado == true) {
            setTimeout(function(){
                setActualizarCuentas(false);
            },1000);
        }
    }

    const DesactivarPrincipalOtrasSucursales = (sucTCBSId:number, Sucursales: ISucursalCuentaBancaria[])=>{
        Sucursales.map(Suc => {
            if (Suc.sucTCBSId != sucTCBSId) {
                Suc.sucPrincipal = false;
            }
        })
    }

    const paramsCuentasBancariasContexto:paramsCuentasBancariasContexto = {
        CuentaExpandida: CuentaExpandida, 
        CambiarCuentaSeleccionada: CambiarCuentaSeleccionada,
        ListaBancos: ListaBancos,
        ListaTiposCuenta: ListaTiposCuenta,
        ShowModalCrearEditar: ShowModalCrearEditar,
        CambiarEstadoModalCrearEditar: CambiarEstadoModalCrearEditar,
        ActualizarCuentas: ActualizarCuentas,
        CambiarEstadoActualizarCuentas: CambiarEstadoActualizarCuentas,
        Configs: Configs
    };

  return (
    <CuentasBancariasContexto.Provider value={{paramsCuentasBancariasContexto}}>
        {children}
    </CuentasBancariasContexto.Provider>
  )
}
