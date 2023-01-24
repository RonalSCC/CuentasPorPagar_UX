import { Button, Dialog, DialogActions, DialogTitle, Stack, Typography } from '@mui/material'
import Image from 'mui-image'

export interface DeleteDiscountProps {
  estado: boolean,
  cambiarEstado: Function
}


const DeleteDescuento = ({ estado, cambiarEstado }: DeleteDiscountProps) => {
  return (
    <>
      <Dialog
        open={estado}
        onClose={() => cambiarEstado()}
        fullWidth
        maxWidth="xs"
      >
        <Stack p={3} gap={3}>
          <Stack alignSelf="center">
            <Image fit='cover' src={"Imagenes/Terceros/DeleteDescuento.svg"} alt="" />
          </Stack>
          <Stack gap={1}>
            <Typography textAlign="center" noWrap variant="h6" color="primary">Eliminar Descuento</Typography>
            <Typography textAlign="center" variant="body1" color="text.secondary">
              Al eliminar no se calculará en futuros <br/>
              pagos para el tercero.
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

export default DeleteDescuento