import { CancelOutlined, FileUpload } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export interface FormularioCargarDocumentoProps {
    estado: boolean,
    cambiarEstado: Function,
    title: string
}

export const FormularioCargarDocumento = (
    { estado, cambiarEstado, title }: FormularioCargarDocumentoProps) => {
    return (
        <>
            <Dialog
                open={estado}
                onClose={() => cambiarEstado()}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>
                    <Typography variant="h6">{title}</Typography>
                </DialogTitle>
                <Stack py={1} px={3} gap={0.5}>
                    <TextField
                        label="Descripción del documento"
                        id="DescDocumento"
                        defaultValue="Cámara de comercio"
                        size="small"
                    />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>
                            camaradecomercio.doc
                        </Typography>
                        <IconButton color="primary" size="small">
                            <CancelOutlined fontSize="small" color="primary"/>
                        </IconButton>
                    </Stack>
                    <Button variant="outlined" startIcon={<FileUpload fontSize="small" />} fullWidth>
                        Subir archivo
                    </Button>
                </Stack>
                <DialogActions>
                    <Stack direction="row" gap={1}>
                        <Button size='medium' variant="text" onClick={() => cambiarEstado()}>
                            Cancelar
                        </Button>

                        <Button
                            size='medium'
                            variant="contained"
                        >
                            Guardar
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}
