import { Add } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, Slide, Stack, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, { useContext, useEffect, useState } from 'react'
import { CrearPeticion } from '../../../../../Consumos/APIManager'
import { CuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasContexto'
import { paramsCuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor'
import { ISucursal } from '../../../Interfaces/Generales/ISucursal'
import AsociacionCuentaSucursal from './_AsociacionCuentaSucursal'

export interface PropsModalEditarSucursales{
  CerrarModal: Function
}
export default function ModalEditarSucursales(
  {
    CerrarModal
  }:PropsModalEditarSucursales
) {
  
  const {paramsCuentasBancariasContexto}:{paramsCuentasBancariasContexto:paramsCuentasBancariasContexto} = useContext<any>(CuentasBancariasContexto);
  const {
    CuentaExpandida,
    CambiarListaSucursalesCuenta
  } = paramsCuentasBancariasContexto;
  const [ListaSucursales, setListaSucursales] = useState<Array<ISucursal>>();
  const [SucursalPrincipal, setSucursalPrincipal] = useState(-1);
  const [NuevaSucursal, setNuevaSucursal] = useState(false);

  useEffect(() => {
    ConsultarListaSucursales();
    if (!CuentaExpandida?.tcbListaSucursales || CuentaExpandida?.tcbListaSucursales.length == 0) {
      setNuevaSucursal(true);
    }else{
      debugger
      let SucursalPrincipalDefecto = CuentaExpandida.tcbListaSucursales.filter(s=> s.sucPrincipal == true);
      if (SucursalPrincipalDefecto && SucursalPrincipalDefecto.length > 0 ) {
        setSucursalPrincipal(SucursalPrincipalDefecto[0].sucTCBSId);
      }
    }
  }, [])
  
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

  const CambiarEstadoNuevaSucursal = (estado:boolean)=> {
    setNuevaSucursal(estado);
  }

  const CambiarSucursalPrincipal = (SucId:number)=> {
    setSucursalPrincipal(SucId);
  }

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
              Sucursales
            </Typography>
          </div>
        </DialogTitle>
        <Stack direction={"column"} paddingY={1} paddingX={3} gap={1} alignItems="flex-start">
          <Button
            variant='text'
            color='primary'
            startIcon={<Add />}
            onClick={()=> CambiarEstadoNuevaSucursal(true)}
          >
            Agregar sucursal
          </Button>

          <RadioGroup 
            value={"Asociacion"+SucursalPrincipal}
            sx={{width:"100%", gap:1}}
          >
            {
              NuevaSucursal == true && 
              <AsociacionCuentaSucursal 
                ListaSucursales={ListaSucursales}
                CambiarSucursalPrincipal={CambiarSucursalPrincipal}
                Asociacion={{
                  sucTCBSId:-1,
                  sucPrincipal:false
                }}
                CambiarEstadoNuevaSucursal={CambiarEstadoNuevaSucursal}
              />
            }
          
            {
              CuentaExpandida?.tcbListaSucursales.map(asc => {
                return <AsociacionCuentaSucursal 
                          key={asc.sucTCBSId}
                          Asociacion={asc}
                          ListaSucursales={ListaSucursales}
                          CambiarSucursalPrincipal={CambiarSucursalPrincipal}
                          CambiarEstadoNuevaSucursal={CambiarEstadoNuevaSucursal}
                        />
              })
            }
          </RadioGroup>
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
              // onClick={handleClose}
            >
              Guardar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}
