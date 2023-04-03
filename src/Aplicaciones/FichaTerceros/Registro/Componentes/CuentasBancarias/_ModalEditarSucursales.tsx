import { Add } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, Slide, Stack, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, { useContext, useEffect, useState } from 'react'
import { CrearPeticion } from '../../../../../Consumos/APIManager'
import { SendRequest } from '../../../../../Consumos/Request'
import { CuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasContexto'
import { paramsCuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor'
import { ISucursal } from '../../../Interfaces/Generales/ISucursal'
import ISucursalCuentaBancaria from '../../../Interfaces/Registro/CuentasBancarias/ISucursalCuentaBancaria'
import AsociacionCuentaSucursal from './_AsociacionCuentaSucursal'
import ModalEliminar from '../Generales/_ModalEliminar'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'

export interface PropsModalEditarSucursales{
  CerrarModal: (estado: boolean) => void
}
export default function ModalEditarSucursales(
  {
    CerrarModal
  }:PropsModalEditarSucursales
) {
  

  const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
  const { 
    TerceroSeleccionadoLista 
  } = propsTercerosContexto;

  const {paramsCuentasBancariasContexto}:{paramsCuentasBancariasContexto:paramsCuentasBancariasContexto} = useContext<any>(CuentasBancariasContexto);
  const {
    CuentaExpandida
  } = paramsCuentasBancariasContexto;

  const [ListaSucursales, setListaSucursales] = useState<Array<ISucursal>>();
  const [ListaSucursalesCuentaBancaria, setListaSucursalesCuentaBancaria] = useState<Array<ISucursalCuentaBancaria>>([]);
  const [SucursalPrincipal, setSucursalPrincipal] = useState(-1);
  const [NuevaSucursal, setNuevaSucursal] = useState(false);
  const [modalEliminarAsociacion, setModalEliminarAsociacion] = useState(false);
  const [asociacionCuentaEliminar, setAsociacionCuentaEliminar] = useState<number>();


  useEffect(() => {
    ConsultarSucursalesCuenta();
    ConsultarListaSucursales();

    if (!CuentaExpandida?.tcbListaSucursales || CuentaExpandida?.tcbListaSucursales.length == 0) {
      setNuevaSucursal(true);
    }else{
      let SucursalPrincipalDefecto = CuentaExpandida.tcbListaSucursales.filter(s=> s.sucPrincipal == true);
      if (SucursalPrincipalDefecto && SucursalPrincipalDefecto.length > 0 ) {
        setSucursalPrincipal(SucursalPrincipalDefecto[0].sucTCBSId);
      }
    }
  }, []);

  useEffect(() => {
    console.log(ListaSucursalesCuentaBancaria);
  }, [ListaSucursalesCuentaBancaria])
  
  
  const ConsultarListaSucursales = async ()=> {
    // ---- Bancos
    await CrearPeticion({
      API: "CONFIGURACION",
      URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
      Type:"GET",
      Body:{
          Clave: 'Sucursales'
      }
    }).then((respuesta)=> {
      if (respuesta != null && respuesta.ok == true) {
        setListaSucursales(respuesta.datos);
      }
    });
  }

  const ConsultarSucursalesCuenta = ()=> {
    SendRequest.get({
      API: "CUENTASPORPAGAR",
      URLServicio: "/CuentasBancariasTerceros/Consultar_SucursalesPorCuentaBancaria",
      Body:{
        TCBId: CuentaExpandida?.tcbId
      }
    }).then((respuesta) => {
      if (respuesta && respuesta.ok) {
        setListaSucursalesCuentaBancaria([...respuesta.datos]);
      }
    })
  }

  const AgregarAsociacionTemporal = (estado:boolean)=> {
    let existe = ListaSucursalesCuentaBancaria.filter(f => f.sucTCBSId == -1);
    if (!existe || existe.length == 0) {
      setListaSucursalesCuentaBancaria([...ListaSucursalesCuentaBancaria, {
        sucTCBSId:-1,
        sucPrincipal:false,
        sucPermiteEliminar: true
      }]);
    }
    
  }

  const CambiarAsociacionAPrincipal = (Asociacion:ISucursalCuentaBancaria)=> {
    Asociacion.sucPrincipal = true;
    ListaSucursalesCuentaBancaria.map(s=> {
      if (s.sucId != Asociacion.sucId) {
        s.sucPrincipal = false;
      }
    });
    ActualizarAsociacionesCuenta();
  }

  const ActualizarAsociacionesCuenta = () => {
    setListaSucursalesCuentaBancaria([...ListaSucursalesCuentaBancaria]);
  }

  const GuardarAsociaciones = () => {
    SendRequest.post({
      API: "CUENTASPORPAGAR",
      URLServicio: "/CuentasBancariasTerceros/Asociar_CuentaBancariaSucursal",
      Body:{
        cuentaId: CuentaExpandida?.tcbId,
        terceroId: TerceroSeleccionadoLista?.TerID,
        ruta: window.location.href,
        listaAsociaciones: ListaSucursalesCuentaBancaria.map(a => {
          return {
            tcbsId: a.sucTCBSId == -1 ? null : a.sucTCBSId,
            sucursalId: a.sucId,
            principal: a.sucPrincipal
          }
        })
      }
    }).then((respuesta)=> {
      if (respuesta && respuesta.ok) {
        ConsultarSucursalesCuenta();
      }
    });
  }
  /* #region Eliminar asociación */
  const AbrirModalEliminarAsociacion = (TCBSId: number) => {
    setModalEliminarAsociacion(true);
    setAsociacionCuentaEliminar(TCBSId);
  }

  const EliminarAsociacionSucCuenta = (TCBSId: number) => {
    SendRequest.delete({
      API: "CUENTASPORPAGAR",
      URLServicio: "/CuentasBancariasTerceros/Eliminar_AsociacionSucursalCuenta",
      Body: {
        TCBSId: asociacionCuentaEliminar
      }
    }).then((respuesta) => {
      if (respuesta && respuesta.ok) {
        setModalEliminarAsociacion(false);
        ConsultarSucursalesCuenta();

      }
    })
  }
  /* #endregion */

  return (
    <>
      <Dialog
        open={true}
        keepMounted
        onClose={()=> CerrarModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle paddingY={2} paddingX={3}>
          <div>
            <Typography variant='h6' color="text.primary">
              Sucursales - Cuenta No. {CuentaExpandida?.tcbNumeroCuenta}
            </Typography>
          </div>
        </DialogTitle>
        <Stack direction={"column"} paddingY={1} paddingX={3} gap={1} alignItems="flex-start">
          <Button
            variant='text'
            color='primary'
            startIcon={<Add />}
            onClick={()=> AgregarAsociacionTemporal(true)}
          >
            Agregar sucursal
          </Button>

            {/* {
              NuevaSucursal == true && 
              <AsociacionCuentaSucursal 
                ListaSucursales={ListaSucursales}
                CambiarSucursalPrincipal={CambiarSucursalPrincipal}
                Asociacion={{
                  sucTCBSId:-1,
                  sucPrincipal:false,
                  sucPermiteEliminar: true
                }}
                CambiarEstadoNuevaSucursal={CambiarEstadoNuevaSucursal}
              />
            } */}
          
            {
              ListaSucursalesCuentaBancaria.map(asc => {
                return <AsociacionCuentaSucursal 
                          key={asc.sucTCBSId}
                          Asociacion={asc}
                          ListaSucursales={ListaSucursales}
                          CambiarAsociacionAPrincipal={CambiarAsociacionAPrincipal}
                          ActualizarAsociacionesCuenta={ActualizarAsociacionesCuenta}
                          // CambiarEstadoNuevaSucursal={CambiarEstadoNuevaSucursal}
                          EliminarAsociacion={AbrirModalEliminarAsociacion}
                        />
              })
            }
        </Stack>
        <DialogActions>
          <Stack direction={"row"} gap={1} padding={1}>
            <Button 
              variant='text'
              color='primary'
              onClick={()=> CerrarModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant='contained'
              color='primary'
              onClick={() => GuardarAsociaciones()}
            >
              Guardar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      {
        modalEliminarAsociacion && 
          <ModalEliminar 
            Titulo='Eliminar asociación'
            Texto='Se eliminará la asociación, está seguro?'
            ImageSRC='Imagenes/Terceros/EliminarCuenta.svg'
            FunCerrarModal={() => setModalEliminarAsociacion(false)}
            FunEliminarRegistro={EliminarAsociacionSucCuenta}
          />
      }
      
    </>
  )
}
