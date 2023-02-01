import { Add } from '@mui/icons-material';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, FormGroup, MenuItem, Select, Slide, Stack, TextField, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'
import DatosCuentaEditar from './_DatosCuentaEditar';

export interface PropsModalEditarCuentaBancaria{
  CerrarModal: Function
}

export default function ModalEditarCuentaBancaria(
  {
    CerrarModal
  }:PropsModalEditarCuentaBancaria
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
            Cuenta bancaria
          </Typography>
        </DialogTitle>
        <Stack direction={"column"} paddingY={1} paddingX={3} gap={.5}>
          <Stack direction="row" gap={.5}>
            <TextField
                label="Entidad"
                placeholder='Seleccione'
                select
                fullWidth
            >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
            </TextField>

            <TextField
                label="Tipo de cuenta"
                placeholder='Seleccione'
                select
                fullWidth
            >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
            </TextField>
          </Stack>

          <TextField
              label="Número de cuenta"
              fullWidth
          />

          <Stack direction="row" gap={.5}>
            <TextField
                label="Swift"
                fullWidth
            />

            <TextField
                label="ABBA/IBAN"
                fullWidth
            />
          </Stack>

          <Typography variant='subtitle2' color={"primary.light"}>
            Tesorería
          </Typography>

          <Stack direction="row" gap={.5}>
            <TextField
                label="Correo"
                fullWidth
            />

            <TextField
                label="Contacto"
                fullWidth
            />
          </Stack>

          <Stack direction="row" gap={.5}>
            <TextField
                label="Télefono"
                sx={{
                  width: "49.5%"
                }}
            />
          </Stack>

          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Pago por NIT" />
          </FormGroup>
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
