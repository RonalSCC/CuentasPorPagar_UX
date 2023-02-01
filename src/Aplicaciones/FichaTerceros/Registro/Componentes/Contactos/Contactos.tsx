import { Add } from '@mui/icons-material'
import { Fab, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState,useEffect, useContext } from 'react'
import FormularioContacto from './FormularioContacto'
import CardContact from './CardContact'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'

export default function Contactos() {
  const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);

  const [verModalNuevoContacto, setverModalNuevoContacto] = useState(false);

  const VerModalNuevoContacto = () => {
    setverModalNuevoContacto(!verModalNuevoContacto);
  }

  const contactos = [{
    "Nombre documento" :1012422532,
    "Telefono": 3213353173,
    "Tipo": "Financiero y Administrativo",
    "Celular": 3213353173,
    "Ciudad": "Bogotá D.C",
    "Email":"cristian.perez@sinco.com.co"
  }];
  useEffect(() => {
    console.log(propsTercerosContexto.TerceroSeleccionadoLista?.TerID);
  }, [])

  return (
    <>
      <Stack p={3} gap={1.5} direction="row" flexWrap="wrap">
        <CardContact />
        <CardContact />
        <CardContact />
        <Fab color="secondary" variant="extended" onClick={VerModalNuevoContacto}
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(3),
            right: (theme) => theme.spacing(3)
          }} >
          <Add></Add>
          <Typography>
            Nuevo Contacto
          </Typography>
        </Fab>
      </Stack>
      {
        verModalNuevoContacto == true &&
        <FormularioContacto estado={verModalNuevoContacto} cambiarEstado={VerModalNuevoContacto} title="Nuevo Contacto" />
      }

    </>
  )
}

