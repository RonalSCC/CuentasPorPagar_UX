
import React, { useContext, useEffect, useState } from 'react'
import { Divider, Stack, Typography } from '@mui/material';
import InformacionGeneral from './MarcoTerceros';
import Menu from './Menu';
import { TercerosContexto } from '../../Contextos/TercerosContexto';
import SinSeleccion from './SinSeleccion';
import FormularioInformacionGeneral from './NuevoRegistro/FormularioRegistroTercero';
import { Link, redirect,Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RoutesTercerosElement } from '../../Route';
export default function Terceros(props:any) {
  const navigate = useNavigate();
  const {propsTercerosContexto}:{propsTercerosContexto:any} = useContext<any>(TercerosContexto);

  useEffect(() => {
    if (!propsTercerosContexto.NuevoRegistro) {
      if (propsTercerosContexto.TerceroSeleccionado) {
        navigate("MarcoTerceros");
      }else{
        navigate("SinSeleccion");
      }
    }else{
      navigate("FormularioRegistro");
    }
  }, [propsTercerosContexto.NuevoRegistro, propsTercerosContexto.TerceroSeleccionado])
  
  return (
    <>
      <Stack direction="column" alignItems="flex-end" width="100%">
        <Stack 
          direction="row" 
          width="100%" 
          sx={{backgroundColor: "white"}} 
          position="sticky"
          zIndex={1}
          top={0}
          flexWrap="wrap"
        >
          <Stack direction="row" pt={2} paddingX={3} pb={1} >
            <Typography variant="h6" color="text.primary">
              {propsTercerosContexto.TituloPageHeader}
            </Typography>
          </Stack>
          <Divider sx={{width:"100%"}}/>
        </Stack>
        <Stack  direction="row" width="100%" height="93%">
          { <RoutesTercerosElement/>}
        </Stack>
      </Stack>
    </>
  )
}
