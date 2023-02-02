import { LabelImportant } from '@mui/icons-material'
import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'

export default function CuentaPorSucursal_Visualizacion(
    {
        objInfoCuenta
    }:
    {
        objInfoCuenta:any
    }
) {
  return (
    <>
        <Stack direction="row" gap={1} alignItems="center">
            <LabelImportant color='primary'/>

            <Stack direction="column">
                <Stack direction="row" gap={1.5}>
                    <Stack direction="row" gap={.5} alignItems="center">
                        <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                            Número de cuenta:
                        </Typography>
                        <Typography variant='body2' color="text.secondary">
                            23474859500
                        </Typography>
                    </Stack>
                    
                    <Divider orientation='vertical' />

                    <Stack direction="row" gap={.5} alignItems="center">
                        <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                            Tipo:
                        </Typography>
                        <Typography variant='body2' color="text.secondary">
                            Banco de Bogotá S.A. / Ahorros
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row">
                    <Stack direction="row" gap={.5} alignItems="center">
                        <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                            Cuenta:
                        </Typography>
                        <Typography variant='body2' color="text.secondary">
                            BANCOLOMBIA - Ahorros - 3216375130
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    </>
  )
}
