import { CancelOutlined, FileUpload } from '@mui/icons-material'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SendRequest } from '../../../../../../Consumos/Request'
import { TercerosContexto } from '../../../../Contextos/TercerosContexto'
import { PropsTerceroContexto } from '../../../../Contextos/TercerosProveedor'
import IImagenesTipo from '../../../../Interfaces/Registro/ConfiguracionAvanzada/DocumentosTercero/IImagenesTipo'
import type { AxiosRequestHeaders } from 'axios';
import IDocumentoTercero from '../../../../Interfaces/Registro/ConfiguracionAvanzada/DocumentosTercero/IDocumentoTercero'

export interface FormularioCargarDocumentoProps {
    documentoEdicion?: IDocumentoTercero,
    cambiarEstado: Function,
    consultarDocumentos: () => void
}

export const FormularioCargarDocumento = (PropsFormularioCargarDocumento:FormularioCargarDocumentoProps) => {

    const { 
        cambiarEstado,
        consultarDocumentos
    } = PropsFormularioCargarDocumento;


    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        TerceroSeleccionadoLista,
        CambiarAlertas
    } = propsTercerosContexto;

    const [file, setFile] = useState<File>();
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [listaTiposDocumentos, setListaTiposDocumentos] = useState<Array<IImagenesTipo>>([]);
    const [tipoDocumentoSeleccionado, settipoDocumentoSeleccionado] = useState<string>("");
    useEffect(() => {
        ConsultarInformacionListas();
    }, [])
    

    const cambiarDocumentosSubidos = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    
    const ConsultarInformacionListas = useCallback(()=> {
        SendRequest.get({
            API: 'CONFIGURACION',
            URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
            Body:{
                Clave: "TercerosImagenesTipo"
            }
        }).then((respuesta)=> {
            if (respuesta && respuesta.ok) {
                setListaTiposDocumentos(respuesta.datos);
            }
        });
    },[])

    const BorrarDocumento = ()=>{
        setFile(undefined);
        if (inputFile && inputFile.current) {
            inputFile.current.value = "";
        }
    }

    const SubirDocumento = ()=> {
        var formData = new FormData();
        formData.append("Documento", file as Blob);
        formData.append("DocTipo", tipoDocumentoSeleccionado);
        formData.append("DocTerId", `${TerceroSeleccionadoLista?.TerID}`);
        SendRequest.post({
            API: "CUENTASPORPAGAR",
            URLServicio: "/DocumentosAdjuntosTercero/CrearDocumentosAdjuntosTerceros",
            Body: formData,
            Headers: {'Content-Type': 'multipart/form-data'}
        }).then((resultado)=> {
            if (resultado && resultado.ok) {
                consultarDocumentos();
                CambiarAlertas([<Alert severity='success'>Se ha subido el documento correctamente.</Alert>]);
                cambiarEstado(false);
            }
        });
    }

    return (
        <>
            <Dialog
                open={true}
                onClose={() => cambiarEstado()}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>
                    <Typography variant="h6">Cargar documento</Typography>
                </DialogTitle>
                <Stack py={1} px={3} gap={0.5}>
                    <TextField 
                        onChange={(e) => settipoDocumentoSeleccionado(e.target.value)}
                        value={tipoDocumentoSeleccionado}
                        label="Descripción del documento"
                        placeholder="Descripción del documento"
                        variant="outlined"
                        size="small"
                        select
                    >
                        {
                            listaTiposDocumentos.map(td => 
                                <MenuItem key={td.TImgTId} value={td.TImgTId}>{td.TImgTDescripcion}</MenuItem>
                            )
                        }
                    </TextField>

                    {
                        file && 
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography noWrap>
                                    {file?.name}
                                </Typography>
                                <IconButton 
                                    onClick={()=> BorrarDocumento()} 
                                    color="primary" 
                                    size="small"
                                >
                                    <CancelOutlined fontSize="small" color="primary"/>
                                </IconButton>
                            </Stack>
                    }
                    
                    <Button onClick={() => inputFile.current && inputFile.current.click()} variant="outlined" startIcon={<FileUpload fontSize="small" />} fullWidth>
                        <input
                            id='FileInput'
                            ref={inputFile}
                            width={"100%"}
                            height={"100%"}
                            type="file"
                            hidden
                            onChange={cambiarDocumentosSubidos}
                        />
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
                            onClick={()=> SubirDocumento()}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}
