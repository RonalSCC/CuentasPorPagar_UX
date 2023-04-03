import { Autocomplete, Button, Card, CardActions, CardContent, Dialog, DialogTitle, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import AutocompleteTerceros from './Generales/AutocompleteTerceros'
import Image from 'mui-image';
import { TercerosContexto } from '../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../Contextos/TercerosProveedor';
export interface IPropsBuscarTerceroDialog {
  DialogAbierto: boolean,
    CerrarBuscarTercero : Function
}
export default function BuscarTerceroDialog(BuscarTerceroDialogProps:IPropsBuscarTerceroDialog) 
{
  const {
    DialogAbierto,
    CerrarBuscarTercero
  } = BuscarTerceroDialogProps
  
  const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);

  const CambiarTercero = (seleccion:any) => {
    if (seleccion != null) {
      propsTercerosContexto.CambiarTerceroSeleccionadoLista(seleccion);
      CerrarBuscarTercero();
    }
  }

  return (
    <>
        <Dialog
            open={DialogAbierto}
            onClose={() => CerrarBuscarTercero()}
            fullWidth
            maxWidth="sm"
        >
          <Card>
            <Stack direction="column" padding={3}>
              <Stack direction="column" padding={2} gap={1.5} alignItems="center">
                <Image width="20%" fit='cover' src={"Imagenes/Terceros/BuscarTercero.svg"} alt="" />
                <Stack direction="column" gap={3} alignItems="center" width={"100%"}>
                  <Typography variant="h6" color="primary.main">
                    Selecciona el tercero que deseas consultar
                  </Typography>

                  <AutocompleteTerceros
                    SeleccionarTercero={CambiarTercero}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Card>
      </Dialog>
    </>
  )
}
