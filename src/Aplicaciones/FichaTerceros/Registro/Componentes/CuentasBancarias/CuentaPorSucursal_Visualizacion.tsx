import { LabelImportant } from '@mui/icons-material'
import { Chip, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { ICuentaBancaria } from '../../../Interfaces/Registro/CuentasBancarias/ICuentaBancaria'
import ISucursalCuentaBancaria from '../../../Interfaces/Registro/CuentasBancarias/ISucursalCuentaBancaria'
export interface PropsCuentaPorSucursal_Visualizacion
{
    ListaSucursales : Array<ISucursalCuentaBancaria>
}
export default function CuentaPorSucursal_Visualizacion(
    {
        ListaSucursales
    }:PropsCuentaPorSucursal_Visualizacion
) {
  return (
    <>
        {
            ListaSucursales.map(Suc =>  {
                if (Suc.sucId != null) {
                    return <Stack key={Suc.sucId} direction="row" gap={1} alignItems="center">
                                <LabelImportant color='primary'/>
                                <Stack direction="column">
                                    <Stack direction="row" gap={1.5}>
                                        <Stack direction="row" gap={.5} alignItems="center">
                                            <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                                Sucursal:
                                            </Typography>
                                            <Typography variant='body2' color="text.secondary">
                                                {Suc.sucNombre}
                                            </Typography>
                                            {
                                                Suc.sucPrincipal && 
                                                    <Chip size='small' label='Principal' />
                                            }
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                }
                
            })
        }
    </>
  )
}
