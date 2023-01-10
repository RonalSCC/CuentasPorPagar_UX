import { Stack, TextField } from '@mui/material'
import React from 'react'

export default function TipoPersonaNaturalCampos(
    {
        propsInputs
    }:
    {
        propsInputs:Record<string, any>
    }
) {
  return (
    <>
            {/* Nombre */}
            <Stack direction="row" gap={1.5}>
                <TextField 
                {...propsInputs}
                id="primerNombre" 
                label="Primer nombre"
                placeholder='Prueba pruebita'
                required
                />
                <TextField 
                {...propsInputs}
                id="segundoNombre" 
                label="Segundo nombre" 
                />
            </Stack>

            {/* Apellidos */}
            <Stack direction="row" gap={1.5}>
                <TextField 
                {...propsInputs}
                id="primerApellido" 
                label="Primer apellido" 
                required
                />
                <TextField 
                {...propsInputs}
                id="segundoApellido" 
                label="Segundo apellido" 
                />
            </Stack>
    </>
  )
}
