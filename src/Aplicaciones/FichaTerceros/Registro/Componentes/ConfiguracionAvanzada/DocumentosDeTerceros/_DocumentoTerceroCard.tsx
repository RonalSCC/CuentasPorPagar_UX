import { DeleteOutline, EditOutlined, FileDownloadOutlined } from '@mui/icons-material'
import { Alert, Card, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { SendRequest } from '../../../../../../Consumos/Request';
import { TercerosContexto } from '../../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../../Contextos/TercerosProveedor';
import IDocumentoTercero from '../../../../Interfaces/Registro/ConfiguracionAvanzada/DocumentosTercero/IDocumentoTercero';
import EliminarDocumento from './_EliminarDocumento';

export interface IDocumentoTerceroCard{
    InfoDocumento: IDocumentoTercero,
    CambiarDocumentoVisor:  (Documento: IDocumentoTercero | undefined) => void,
    reloadDocumentosTercero: () => void
}
export const DocumentoTerceroCard = (DocumentoTerceroCard:IDocumentoTerceroCard) => {

    const {
        InfoDocumento,
        CambiarDocumentoVisor,
        reloadDocumentosTercero
    } = DocumentoTerceroCard;

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        BloquearCamposAcceso,
        CambiarAlertas
    } = propsTercerosContexto;

    const [verModalEditDocument, setverModalEditDocument] = useState(false);
    const [verModalDeleteDocument, setVerModalDeleteDocument] = useState(false);

    const handleEditDocument = () => {
        setverModalEditDocument(!verModalEditDocument);
    }

    const handleDeleteDocument = (estado:boolean) => {
        setVerModalDeleteDocument(estado);
    }

    const clickCard = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(event.target);
        let target = (event.target as HTMLDivElement);
        if (target.tagName != "svg" && target.tagName != "BUTTON") {
            CambiarDocumentoVisor(InfoDocumento);
        }
    }

    const eliminarDocTercero = ()=> {
        SendRequest.delete({
            API: "CUENTASPORPAGAR",
            URLServicio: "/DocumentosAdjuntosTercero/EliminarDocumentosAdjuntosTercero",
            Body: {
                idDocumento: InfoDocumento.terImgId
            }
        }).then((result)=> {
            if (result && result.ok) {
                reloadDocumentosTercero();
                handleDeleteDocument(false);
                CambiarAlertas([<Alert severity="success">Se ha eliminado del documentos correctamente.</Alert>])
            }
        })
    }

    const descargarDocumento = ()=> {
        let urlDownload = process.env.REACT_APP_URL_API_CUENTAS_POR_PAGAR + "/DocumentosAdjuntosTercero/Obtener_DocumentoPorId?TImgId=" + InfoDocumento.terImgId;
        const link = document.createElement("a");
        link.href = urlDownload;
        link.target = "_blank";
        link.download = InfoDocumento.terImgNombreReal;
        link.click();
    }



    return (
        <Stack width={"49.55%"}>
            <Card sx={{
                '&:hover': {
                    cursor:"pointer",
                    backgroundColor: "rgba(0,0,0,.02)"
                },
            }}> 
                <Stack p={2} gap={1.5} direction="row" justifyContent="space-between">
                    <Stack onClick={(event) => clickCard(event)} direction="row" gap={0.5} alignItems={"center"} overflow={"hidden"}>
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
                        <IconButton disabled={BloquearCamposAcceso("AdminDocumentosTercero")} size="small" onClick={() => handleDeleteDocument(true)}>
                            <DeleteOutline 
                                fontSize="small" 
                                // color="error"
                                color={BloquearCamposAcceso("AdminDocumentosTercero") ? "disabled" : "error"}
                            ></DeleteOutline>
                        </IconButton>
                        <IconButton disabled={BloquearCamposAcceso("AdminDocumentosTercero")} size="small" onClick={() => descargarDocumento()}>
                            <FileDownloadOutlined 
                                fontSize="small" 
                                color={BloquearCamposAcceso("AdminDocumentosTercero") ? "disabled" : "secondary"}
                            ></FileDownloadOutlined>
                        </IconButton>
                        {/* <IconButton size="small" sx={{zIndex:10}}>
                            <EditOutlined fontSize="small" color="primary"></EditOutlined>
                        </IconButton> */}
                    </Stack>
                </Stack>
            </Card>
            {
                verModalDeleteDocument == true &&
                <EliminarDocumento eliminarDocTercero={eliminarDocTercero} estado={verModalDeleteDocument} cambiarEstado={handleDeleteDocument} />
            }
        </Stack>
    )
}
