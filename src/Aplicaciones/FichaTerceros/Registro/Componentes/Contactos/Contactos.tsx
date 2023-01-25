import { Add } from '@mui/icons-material'
import { Fab, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import FormularioContacto from './FormularioContacto'
import CardContact from './CardContact'

const Contactos = () => {

  const [verModalNuevoContacto, setverModalNuevoContacto] = useState(false);

  const VerModalNuevoContacto = () => {
    setverModalNuevoContacto(!verModalNuevoContacto);
  }

  const contactos = [{
    "Nombre documento": 1012422532,
    "Telefono": 3213353173,
    "Tipo": "Financiero y Administrativo",
    "Celular": 3213353173,
    "Ciudad": "Bogotá D.C",
    "Email": "cristian.perez@sinco.com.co"
  }
  ]

  return (
    <>
      <Stack p={3} gap={1.5} flexWrap="wrap">
        <CardContact />
        <CardContact />
        <CardContact />
      </Stack>
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
      {
        verModalNuevoContacto == true &&
        <FormularioContacto estado={verModalNuevoContacto} cambiarEstado={VerModalNuevoContacto} title="Nuevo Contacto" />
      }

    </>
  )
}

export default Contactos