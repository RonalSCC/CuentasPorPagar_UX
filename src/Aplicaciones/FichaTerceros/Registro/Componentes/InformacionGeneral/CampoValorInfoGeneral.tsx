import { Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

export interface PropsCampoValorInfoGeneral {
    Campo:string,
    Valor?:string | null,
    Componente?:any,
    PropsRow?:Record<string, any>
}
export default function CampoValorInfoGeneral(
    {
        Campo,
        Componente,
        PropsRow,
        Valor
    }:PropsCampoValorInfoGeneral) 
{
    useEffect(() => {
    }, []);
    
  return (
    <>
        <Stack gap={.5} direction="row" width="49%" alignItems="center" {...PropsRow}>
            <Typography variant="subtitle2" color="text.primary">
                {Campo}
            </Typography>

            {
                Componente == null ?
                    <Typography noWrap variant="body2" color="text.primary">
                        {(Valor && Valor != "null") ? Valor : "Sin información"}
                    </Typography>
                :
                Componente
            }
            
        </Stack>
    </>
  )
}
