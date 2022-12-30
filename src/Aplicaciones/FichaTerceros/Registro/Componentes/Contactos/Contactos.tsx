import { Add } from '@mui/icons-material'
import { Fab, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import FormularioContacto from './FormularioContacto'
import CardContact from './CardContact'

const Contactos = (props: any) => {

  const [verModalNuevoContacto, setverModalNuevoContacto] = useState(false);

  const VerModalNuevoContacto = () => {
    setverModalNuevoContacto(!verModalNuevoContacto);
  }

  return (
    <>
      <Stack gap={1} direction="row" flexWrap="wrap">
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

export default Contactos