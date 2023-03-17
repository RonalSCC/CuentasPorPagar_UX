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
        // onClose={()=> CerrarModal(false)}
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
                <iframe src={"https://www.africau.edu/images/default/sample.pdf"} height="100%" width={"100%"} style={{border: "0px"}}></iframe>
            }

            {
                (extension == "png" || extension == "jpg" || extension == "jpeg") &&
                <Image bgColor={"black"} fit="contain" src="https://www.webyempresas.com/wp-content/uploads/2021/02/imagen-publica-700x408.jpg" />
            }

            {
                (extension == "xlsx" ) &&
                <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${documentoVisor.terRutaDocumento}`} height="100%" width={"100%"} style={{border: "0px"}}></iframe>
            }
            <Stack 
                position={"absolute"}
                width="20%"
                borderRadius={"3px"}
                right={"50%"}
                overflow="hidden"
                bottom={"2%"}
                boxShadow={"0px 0px 3px rgba(0,0,0,.2)"}
                padding={.5}
                zIndex={10}
                sx={{
                    background: "linear-gradient(90deg, gainsboro, rgba(255,255,255,.3))"
                }}
            >
                <Stack direction={"row"} alignItems="center" gap={.5}>
                    <Typography variant='body1' color="text.secondary">
                        <b>Nombre:</b>
                    </Typography>
                    <Typography noWrap variant='body2' color="text.secondary">
                        {documentoVisor.terImgNombreReal}
                    </Typography>
                </Stack>
                <Stack direction={"row"} alignItems="center" gap={.5}>
                    <Typography  variant='body1' color="text.secondary">
                        <b>Tipo:</b>
                    </Typography>
                    <Typography noWrap variant='body2' color="text.secondary">
                        {documentoVisor.terTipoDocDesc}
                    </Typography>
                </Stack>
                <Stack direction={"row"} alignItems="center" gap={.5}>
                    <Typography  variant='body1' color="text.secondary">
                        <b>Extensión:</b>
                    </Typography>
                    <Typography noWrap variant='body2' color="text.secondary">
                        {extension}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
      </Dialog>
  )
}
