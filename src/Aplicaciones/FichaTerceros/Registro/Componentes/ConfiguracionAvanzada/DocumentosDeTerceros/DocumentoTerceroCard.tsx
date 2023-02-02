import { DeleteOutline, EditOutlined, FileDownloadOutlined } from '@mui/icons-material'
import { Card, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import EliminarDocumento from './EliminarDocumento';

export const DocumentoTerceroCard = () => {

    const [verModalEditDocument, setverModalEditDocument] = useState(false);
    const [verModalDeleteDocument, setVerModalDeleteDocument] = useState(false);

    const handleEditDocument = () => {
        setverModalEditDocument(!verModalEditDocument);
    }

    const handleDeleteDocument = () => {
        setVerModalDeleteDocument(!verModalDeleteDocument);
    }

    return (
        <Stack width={"49.55%"}>
            <Card> 
                <Stack p={2} gap={1.5} direction="row" justifyContent="space-between">
                    <Stack direction="row" gap={0.5}>
                        <Typography
                            variant="subtitle2"
                        >
                            Cámara de comercio
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            camaradecomercio.doc
                        </Typography>
                    </Stack>
                    <Stack direction="row">
                        <IconButton size="small" onClick={handleDeleteDocument}>
                            <DeleteOutline fontSize="small" color="error"></DeleteOutline>
                        </IconButton>
                        <IconButton size="small">
                            <FileDownloadOutlined fontSize="small" color="secondary"></FileDownloadOutlined>
                        </IconButton>
                        <IconButton size="small">
                            <EditOutlined fontSize="small" color="primary"></EditOutlined>
                        </IconButton>
                    </Stack>
                </Stack>
            </Card>
            {
                verModalDeleteDocument == true &&
                <EliminarDocumento estado={verModalDeleteDocument} cambiarEstado={handleDeleteDocument} />
            }
        </Stack>
    )
}
