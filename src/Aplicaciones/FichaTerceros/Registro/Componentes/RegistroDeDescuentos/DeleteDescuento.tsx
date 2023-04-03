import { Button, Dialog, DialogActions, DialogTitle, Stack, Typography } from '@mui/material'
import Image from 'mui-image'
import { useContext } from 'react';
import { DescuentosTerceroContexto } from '../../../Contextos/Registro/Descuentos/DescuentosTerceroContexto';
import { paramsDescuentosTerceroContexto } from '../../../Contextos/Registro/Descuentos/DescuentosTercerosProveedor';

export interface DeleteDiscountProps {
  cambiarEstadoModal: Function
}

const DeleteDescuento = ({ cambiarEstadoModal }: DeleteDiscountProps) => {
  const {parametrosReturnDescuentos}:{parametrosReturnDescuentos:paramsDescuentosTerceroContexto} = useContext<any>(DescuentosTerceroContexto);
  const {CambiarConfirmarEliminacion} = parametrosReturnDescuentos;
  return (
    <>
      <Dialog
        open={true}
        onClose={() => cambiarEstadoModal(false)}
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
          <Stack py={1} gap={1} direction="row" alignItems="center" justifyContent="end">
            <Button onClick={() => cambiarEstadoModal(false)}>
              Cancelar
            </Button>
            <Button variant='outlined' color='error' onClick={() => CambiarConfirmarEliminacion(true)}>
              Eliminar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteDescuento