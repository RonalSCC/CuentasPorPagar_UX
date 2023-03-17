import { Button, Stack } from '@mui/material'
import React from 'react'

export interface PropsContenedorBotonesEditarInfo {
    MetodoGuardar: Function,
    MetodoCancelar: Function,
}

export default function ContenedorBotonesEditarInfo(ContenedorBotonesEditarInfoProps:PropsContenedorBotonesEditarInfo) {
    const {
        MetodoCancelar,
        MetodoGuardar
    } = ContenedorBotonesEditarInfoProps;
    
    return (
    <Stack direction="row" padding={1} gap={1} justifyContent="flex-end">
        <Button 
            variant="text"
            size="small"
            onClick={()=> MetodoCancelar()}
        >
            Cancelar
        </Button>

        <Button 
            variant="contained"
            size="small"
            onClick={()=> MetodoGuardar()}
        >
            Guardar
        </Button>
    </Stack>
  )
}
