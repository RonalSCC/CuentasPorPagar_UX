import { Add } from '@mui/icons-material';
import { Fab, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import SinInformacion from '../../Generales/SinInformacion';
import { DocumentoTerceroCard } from './DocumentoTerceroCard';
import { FormularioCargarDocumento } from './FormularioCargarDocumento';

const DocumentosDeTerceros = () => {
  const [documentosTerceros, setdocumentosTerceros] = useState<any[]>([1]);
  const [verModalCargarDocumento, setverModalCargarDocumento] = useState(false)

  const VerModalCargarDocumentos = () => setverModalCargarDocumento(!verModalCargarDocumento)

  return (
    <Stack width={"100%"}>
      <Stack gap={1} direction="row" flexWrap="wrap">
        {
          (documentosTerceros.length > 0) ?
            [1, 2, 3, 4].map(doc => (
              <DocumentoTerceroCard />
            ))
            :
            <SinInformacion
              message="Agrega los documentos que deseas adicionar al tercero"
            />
        }
      </Stack>

      <Fab color="secondary" variant="extended" onClick={VerModalCargarDocumentos}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(3),
          right: (theme) => theme.spacing(3),
          backgroundColor: "secondary.main"
        }} >
        <Add />
        <Typography>
          Cargar Documento
        </Typography>
      </Fab>
      {
        verModalCargarDocumento == true &&
        <FormularioCargarDocumento estado={verModalCargarDocumento} cambiarEstado={VerModalCargarDocumentos} title="Cargar Documento" />
      }
    </Stack>
  )
}

export default DocumentosDeTerceros