import { Alert, Button, Dialog, DialogActions, DialogTitle, Stack, Typography } from '@mui/material'
import { style } from '@mui/system/Stack/createStack';
import React, { useContext, useEffect, useState } from 'react'
import { Image } from 'mui-image'
import IDocumentoTercero from '../../../../Interfaces/Registro/ConfiguracionAvanzada/DocumentosTercero/IDocumentoTercero';
import { SendRequest } from '../../../../../../Consumos/Request';
import { PropsTerceroContexto } from '../../../../Contextos/TercerosProveedor';
import { TercerosContexto } from '../../../../Contextos/TercerosContexto';

export interface IPropsVisorDocumentos {
    documentoVisor: IDocumentoTercero,
    CambiarDocumentoVisor:  (Documento: IDocumentoTercero | undefined) => void

}
export default function VisorDocumentos(VisorDocumentosProps: IPropsVisorDocumentos) {

    const {
        documentoVisor,
        CambiarDocumentoVisor
    } = VisorDocumentosProps;

    const [dialogAbierto, setDialogAbierto] = useState(false);
    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        CambiarAlertas
    } = propsTercerosContexto;

    const ListaExtensiones = ["jpg","png","pdf","jpeg"];
    let extension = documentoVisor ? documentoVisor.terImgNombreReal.split(".").pop() : "";

    useEffect(() => {
      if (!ListaExtensiones.includes(extension as string)) {
        CambiarAlertas([<Alert severity="warning">Solo se pueden previsualizar imagenes y documentos PDF.</Alert>]);
        CambiarDocumentoVisor(undefined);
      }else{
        setDialogAbierto(true);
      }
    }, [extension])
    
  return (
    <Dialog
        open={dialogAbierto}
        keepMounted
        maxWidth="xl"
        fullWidth
        sx={{ '& .MuiPaper-root': { height: "100%"} }}
      >
        <DialogTitle paddingY={2} paddingX={3}>
          <Stack justifyContent={"space-between"} direction={"row"}>
            <Typography variant='body1' color="text.primary">
              {documentoVisor.terImgNombreReal}
            </Typography>
            <Button
                variant='outlined'
                size='small'
                color='error'
                onClick={() => CambiarDocumentoVisor(undefined)}
            >
                Cerrar
            </Button>
          </Stack>
        </DialogTitle>
        <Stack position={"relative"} overflow={"auto"} height={"100%"}>
            {
                extension == "pdf" &&
                <iframe src={documentoVisor.terRutaDocumento} height="100%" width={"100%"} style={{border: "0px"}}></iframe>
            }

            {
                (extension == "png" || extension == "jpg" || extension == "jpeg") &&
                <Image bgColor={"black"} fit="contain" src={documentoVisor.terRutaDocumento} duration={0}/>
            }
        </Stack>
      </Dialog>
  )
}
