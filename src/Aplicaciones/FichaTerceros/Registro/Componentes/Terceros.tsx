
import React, { useContext, useEffect, useState } from 'react'
import { Stack } from '@mui/material';
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
      { <RoutesTercerosElement/>}
    </>
  )
}
