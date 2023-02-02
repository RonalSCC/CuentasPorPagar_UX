import { Stack, Typography } from '@mui/material'
import Image from 'mui-image'
import React from 'react'

export default function SinCuentas() {
  return (
    <Stack direction="row" width="100%" bgcolor={"white"}>
        <Stack direction="column" width="100%" paddingY={5} paddingX={3} gap={1.5} justifyContent="center" alignItems="center">
            <Stack direction="row" width="100%" justifyContent="center">
                <Image fit='cover' width="22%" src='Imagenes/Terceros/SinCuentas.svg' />
            </Stack>

            <Typography variant='h6' color="text.primary">
                No hay información
            </Typography>

            <Typography variant='body2' color="text.secondary">
             Crea una cuenta bancaria para realizar pagos al tercero
            </Typography>
        </Stack>
    </Stack>
  )
}
