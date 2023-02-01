import { Add } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Stack, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React from 'react'
import DatosCuentaEditar from './_DatosCuentaEditar'

export interface PropsModalEditarSucursales{
  CerrarModal: Function
}
export default function ModalEditarSucursales(
  {
    CerrarModal
  }:PropsModalEditarSucursales
) {
  
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=> CerrarModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle paddingY={2} paddingX={3}>
          <Typography variant='h6' color="text.primary">
            Sucursales
          </Typography>
        </DialogTitle>
        <Stack direction={"column"} paddingY={1} paddingX={3} gap={.5} alignItems="flex-start">
          <Button
            variant='text'
            color='primary'
            startIcon={<Add />}
          >
            Agregar sucursal
          </Button>

          <DatosCuentaEditar />
          <DatosCuentaEditar />
          <DatosCuentaEditar />

        </Stack>
        <DialogActions>
          <Stack direction={"row"} gap={1} padding={1}>
            <Button 
              variant='text'
              color='primary'
              onClick={()=> CerrarModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant='contained'
              color='primary'
              // onClick={handleClose}
            >
              Guardar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}
