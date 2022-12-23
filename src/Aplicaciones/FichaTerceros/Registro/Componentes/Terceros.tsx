
import React, { useContext, useEffect, useState } from 'react'
import { Stack } from '@mui/material';
import InformacionGeneral from './MarcoTerceros';
import Menu from './Menu';
import { TercerosContexto } from '../../Contextos/TercerosContexto';
import SinSeleccion from './SinSeleccion';
import FormularioInformacionGeneral from './NuevoRegistro/FormularioRegistroTercero';
import { Link, redirect,Navigate, Outlet, useLocation } from 'react-router-dom';
import { RoutesTercerosElement } from '../../Route';
export default function Terceros() {
  
  // const { pathname } = useLocation();
  const [nuevoRegistro, setNuevoRegistro] = useState<boolean>(false);
  const [componentRender, setComponentRender] = useState<any>(null);
  const {propsTercerosContexto}:{propsTercerosContexto:any} = useContext<any>(TercerosContexto);

  useEffect(() => {
    Renderizar_ComponenteTercero();
  }, [])
  
  const MetodosExpuestos: any = {
    RegistrarNuevoTercero: setNuevoRegistro
  };

  const Renderizar_ComponenteTercero = ()=> {
    if (!nuevoRegistro) {
      if (propsTercerosContexto.terceroSeleccionado != null) {
        return <Navigate to="MarcoTerceros" />;
      }else{
        return <Navigate to="SinSeleccion" />;
      }
    }else{
        return <Navigate to="FormularioRegistro" />;
    }
  }

  return (
    <>
      <RoutesTercerosElement/>
      {
        componentRender
      }
      {/* <Outlet /> */}
    </>
  )
}
