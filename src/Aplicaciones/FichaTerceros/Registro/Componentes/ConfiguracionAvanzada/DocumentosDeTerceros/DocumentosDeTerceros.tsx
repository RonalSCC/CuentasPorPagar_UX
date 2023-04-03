import { Add } from '@mui/icons-material';
import { Button, Fab, IconButton, Stack, Typography } from '@mui/material'
import { useCallback, useContext, useEffect, useState } from 'react'
import { SendRequest } from '../../../../../../Consumos/Request';
import { TercerosContexto } from '../../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../../Contextos/TercerosProveedor';
import IDocumentoTercero from '../../../../Interfaces/Registro/ConfiguracionAvanzada/DocumentosTercero/IDocumentoTercero';
import SinInformacion from '../../Generales/SinInformacion';
import { DocumentoTerceroCard } from './_DocumentoTerceroCard';
import { FormularioCargarDocumento } from './_FormularioCargarDocumento';
import VisorDocumentos from './_VisorDocumentos';

const DocumentosDeTerceros = () => {

  // Contexto tercero
  const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
  const {
    BloquearCamposAcceso,
    TerceroSeleccionadoLista
  } = propsTercerosContexto;

  const [documentosTerceros, setDocumentosTerceros] = useState<Array<IDocumentoTercero>>([]);
  const [verModalCargarDocumento, setverModalCargarDocumento] = useState(false)
  const [documentoVisor, setDocumentoVisor] = useState<IDocumentoTercero>();
  const extension = documentoVisor ? documentoVisor.terImgNombreReal.split(".").pop() : "";
  useEffect(() => {
    ConsultarDocumentosTercero();
  }, []);
  
  const VerModalCargarDocumentos = (estado:boolean) => {
    setverModalCargarDocumento(estado);
  }

  const ConsultarDocumentosTercero = useCallback(()=>{
    SendRequest.get({
      API: "CUENTASPORPAGAR",
      URLServicio: "/DocumentosAdjuntosTercero/ConsultarDocumentosAdjuntosTercero",
      Body:{
        TerId: TerceroSeleccionadoLista?.TerID
      }
    }).then((resultado)=> {
      if (resultado && resultado.ok) {
        setDocumentosTerceros(resultado.datos);
      }
    })
  }, [TerceroSeleccionadoLista?.TerID])

  const CambiarDocumentoVisor = (Documento:IDocumentoTercero|undefined) => {
    setDocumentoVisor(Documento);
  }

  return (
    <Stack width={"100%"} height={"100%"} alignItems="flex-start" gap={1.5}>
      <Button
          startIcon={<Add/>}
          onClick={()=> VerModalCargarDocumentos(true)}
          disabled={BloquearCamposAcceso("AdminDocumentosTercero")}
      >
          Cargar documento
      </Button>
      <Stack gap={1} width={"100%"} direction="row" flexWrap="wrap" >
        {
            documentosTerceros.length > 0 &&
              documentosTerceros.map(doc => (
                <DocumentoTerceroCard 
                  CambiarDocumentoVisor={CambiarDocumentoVisor}
                  reloadDocumentosTercero={ConsultarDocumentosTercero}
                  InfoDocumento={doc}/>
              ))
        }
        
      </Stack>
      {
        documentosTerceros.length == 0 &&
          <SinInformacion
            message="Agrega los documentos que deseas adicionar al tercero"
          />
      }

      {
        verModalCargarDocumento == true &&
        <FormularioCargarDocumento 
          cambiarEstado={VerModalCargarDocumentos}
          consultarDocumentos={ConsultarDocumentosTercero}/>
      }

      {
        documentoVisor &&
        <VisorDocumentos 
          documentoVisor={documentoVisor} 
          CambiarDocumentoVisor={CambiarDocumentoVisor}
        />
      }
    </Stack>
  )
}

export default DocumentosDeTerceros