import { DeleteOutline, EditOutlined, FileDownloadOutlined } from '@mui/icons-material'
import { Card, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import IDocumentoTercero from '../../../../Interfaces/Registro/ConfiguracionAvanzada/DocumentosTercero/IDocumentoTercero';
import EliminarDocumento from './EliminarDocumento';

export interface IDocumentoTerceroCard{
    InfoDocumento: IDocumentoTercero,
    CambiarDocumentoVisor:  (Documento: IDocumentoTercero | undefined) => void
}
export const DocumentoTerceroCard = (DocumentoTerceroCard:IDocumentoTerceroCard) => {

    const {
        InfoDocumento,
        CambiarDocumentoVisor
    } = DocumentoTerceroCard;
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
            <Card onClick={()=> CambiarDocumentoVisor(InfoDocumento)} sx={{
                '&:hover': {
                    cursor:"pointer",
                    backgroundColor: "rgba(0,0,0,.02)"
                },
            }}> 
                <Stack p={2} gap={1.5} direction="row" justifyContent="space-between">
                    <Stack direction="row" gap={0.5} alignItems={"center"} overflow={"hidden"}>
                        <Typography
                            variant="subtitle2"
                        >
                            {InfoDocumento.terTipoDocDesc}
                        </Typography>
                        <Typography
                            variant="body2"
                            noWrap={true}
                            textOverflow="ellipsis"
                            maxWidth={"50%"}
                            color="text.disabled"
                        >
                            {InfoDocumento.terImgNombreReal}
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
