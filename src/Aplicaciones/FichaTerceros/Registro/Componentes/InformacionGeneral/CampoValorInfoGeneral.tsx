import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function CampoValorInfoGeneral(
    {
        Campo,
        Valor,
        Componente,
        PropsRow
    }:
    {
        Campo:string,
        Valor?:string,
        Componente?:any,
        PropsRow?:Record<string, any>
    }
) {
  return (
    <>
        <Stack  gap={.5} direction="row" width="50%" alignItems="center" {...PropsRow}>
            <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                {Campo}
            </Typography>

            {
                Componente == null ?
                    <Typography textAlign={"center"} variant="body2" color="text.primary">
                        {Valor}
                    </Typography>
                :
                Componente
            }
            
        </Stack>
    </>
  )
}
