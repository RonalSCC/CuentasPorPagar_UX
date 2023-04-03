
import React, { useContext, useEffect, useState } from 'react'
import { Button, Divider, Stack, Typography } from '@mui/material';
import { TercerosContexto } from '../../Contextos/TercerosContexto';
import { Link, redirect,Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RoutesTercerosElement } from '../../Route';
import { Add, Search } from '@mui/icons-material';
import BuscarTerceroDialog from './BuscarTerceroDialog';
import { PropsTerceroContexto } from '../../Contextos/TercerosProveedor';

export default function Terceros(props:any) {

  const navigate = useNavigate();
  const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
  const {
    BloquearCamposAcceso
  } = propsTercerosContexto
  const [buscarTerceroDialog, setBuscarTerceroDialog] = useState(false);

  useEffect(() => {
    if (!propsTercerosContexto.NuevoRegistro) {
      if (propsTercerosContexto.TerceroSeleccionadoLista) {
        navigate("MarcoTerceros");
      }else{
        navigate("SinSeleccion");
      }
    }else{
      navigate("FormularioCrearTercero");
    }
  }, [propsTercerosContexto.NuevoRegistro, propsTercerosContexto.TerceroSeleccionadoLista]);

  const AbrirDialogBuscarTercero= (estado:boolean) => {
    setBuscarTerceroDialog(estado);
  }

  const CerrarDialogBuscarTercero = ()=>{
    setBuscarTerceroDialog(false);
  }
  
  return (
    <>
      <Stack direction="column" alignItems="flex-end" width="100%" height={"100%"} sx={{overflowY: "auto"}}>
        <Stack 
          direction="row" 
          width="100%" 
          sx={{backgroundColor: "white"}} 
          position="sticky"
          zIndex={1}
          top={0}
          flexWrap="wrap"
          height={"8%"}
        >
          <Stack direction="row" width="100%" paddingY={1} paddingX={3} justifyContent="space-between">
            <Stack direction="row" alignItems={"center"}>
              <Typography variant="h6" color="text.primary">
                {propsTercerosContexto.TituloPageHeader}
              </Typography>
            </Stack>
            
            <Stack direction="row" gap={1}>
              <Button 
                  variant="outlined"
                  startIcon={ <Search /> }
                  size="small"
                  sx={{
                      zIndex: 10,
                      backgroundColor: "white",
                      visibility: propsTercerosContexto.TerceroSeleccionadoLista != null && !propsTercerosContexto.NuevoRegistro ? "visible": "hidden"
                  }}
                  onClick={()=> AbrirDialogBuscarTercero(true)}
              >
                  Buscar tercero
              </Button>

              <Button 
                  variant="contained"
                  startIcon={ <Add /> }
                  size="small"
                  onClick={()=> propsTercerosContexto.CambiarEstadoNuevoRegistro(true)}
                  sx={{
                    visibility: propsTercerosContexto.TerceroSeleccionadoLista != null && !propsTercerosContexto.NuevoRegistro ? "visible": "hidden"
                  }}
                  disabled={BloquearCamposAcceso("CrearNuevoTercero")}
              >
                  Crear tercero
              </Button>
            </Stack>
          </Stack>
          <Divider sx={{width:"100%"}}/>
        </Stack>
        
        <Stack  direction="row" width="100%" height="92%">
          { <RoutesTercerosElement/>}
        </Stack>
        <BuscarTerceroDialog
            DialogAbierto={buscarTerceroDialog}
            CerrarBuscarTercero={CerrarDialogBuscarTercero}
        />
      </Stack>
    </>
  )
}
