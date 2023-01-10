import { Button, Dialog, DialogActions, DialogTitle, Stack, Typography } from '@mui/material'
import Image from 'mui-image'

export interface DeleteContactProps {
  estado: boolean,
  cambiarEstado: Function
}


const DeleteContact = ({estado, cambiarEstado}:DeleteContactProps) => {
  return (
    <>
      <Dialog
        open={estado}
        onClose={() => cambiarEstado()}
      >
        <Stack p={3} gap={3} maxWidth={444}>
          <Stack maxWidth={211} alignSelf="center">
            <Image fit='cover' src={"Imagenes/Terceros/Contact.svg"} alt="" />
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography textAlign="center" noWrap variant="h6" color="primary">Eliminar Contacto</Typography>
            <Typography textAlign="center" variant="body1" color="text.secondary">
              Recuerda que toda la información suministrada será 
              borrada definitivamente
            </Typography>
          </Stack>
        </Stack>
        <DialogActions>
          <Stack py={1} direction="row" alignItems="center" justifyContent="end">
            <Button onClick={() => cambiarEstado()}>
              Cancelar
            </Button>
            <Button variant='outlined' color='error'>
              Eliminar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteContact