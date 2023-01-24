import { Autocomplete, Button, Card, CardActions, CardContent, Dialog, DialogTitle, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import AutocompleteTerceros from './Generales/AutocompleteTerceros'
import Image from 'mui-image';
import { TercerosContexto } from '../../Contextos/TercerosContexto';
export default function BuscarTerceroDialog(
  {
    DialogAbierto,
    CerrarBuscarTercero
  }:
  {
    DialogAbierto: boolean,
    CerrarBuscarTercero : Function
  }
) 
{
  const {propsTercerosContexto}:{propsTercerosContexto:any} = useContext<any>(TercerosContexto);

  const CambiarTercero = (seleccion:any) => {
    if (seleccion != null) {
      propsTercerosContexto.CambiarTerceroSeleccionado(seleccion);
      CerrarBuscarTercero();
    }
  }

  return (
    <>
        <Dialog
            open={DialogAbierto}
            onClose={() => CerrarBuscarTercero()}
            fullWidth
        >
          <Card>
            <CardContent sx={{padding: "0px"}}>
              <Stack direction="column" padding={1.5} gap={5.5} alignItems="center">
                <Image width="15%" fit='cover' src={"Imagenes/Terceros/SeleccionarTercero.png"} alt="" />
                <Stack direction="column" padding={3} gap={3} alignItems="center">
                  <Typography variant="h6" color="primary.main">
                    Selecciona el tercero que deseas consultar
                  </Typography>

                  <AutocompleteTerceros
                    SeleccionarTercero={CambiarTercero}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
      </Dialog>
    </>
  )
}
