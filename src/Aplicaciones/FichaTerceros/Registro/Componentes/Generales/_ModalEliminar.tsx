import { Button, Dialog, DialogActions, Stack, Typography } from '@mui/material'
import React from 'react'
import Image from 'mui-image'

export interface PropsModalEliminar {
    Titulo:string,
    Texto:string,
    ImageSRC: string,
    FunCerrarModal: Function,
    FunEliminarRegistro : Function
}
export default function ModalEliminar(ModalEliminarProps:PropsModalEliminar) {
  const {
    Titulo,
    Texto,
    ImageSRC,
    FunCerrarModal, 
    FunEliminarRegistro
  } = ModalEliminarProps;
  return (
    <Dialog
        open={true}
        onClose={() => FunCerrarModal()}
        maxWidth="xs"
      >
        <Stack p={3} gap={3} maxWidth={444}>
          <Stack maxWidth={211} alignSelf="center">
            <Image fit='cover' src={ImageSRC} alt="" />
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography textAlign="center" noWrap variant="h6" color="primary">{Titulo}</Typography>
            <Typography textAlign="center" variant="body1" color="text.secondary">
              {Texto}
            </Typography>
          </Stack>
        </Stack>
        <DialogActions>
          <Stack py={1} direction="row" alignItems="center" justifyContent="end">
            <Button onClick={() => FunCerrarModal()}>
              Cancelar
            </Button>
            <Button 
                onClick={() => FunEliminarRegistro()}
                variant='outlined' 
                color='error'
            >
              Eliminar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
  )
}
