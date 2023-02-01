import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export interface PropsModalFormNuevaCuenta
{
    DialogAbierto: boolean,
    CerrarDialog: Function
}
export default function ModalFormNuevaCuenta(
    {
        CerrarDialog,
        DialogAbierto
    }:PropsModalFormNuevaCuenta
) {
    const propsInputs: Record<string, any> = {
        variant:"outlined", 
        size:'small',
        fullWidth:true,
    };
  return (
    <>
    <Dialog
        open={DialogAbierto}
        onClose={() => CerrarDialog()}
        fullWidth
    >
        <DialogTitle >
            <Typography variant='h6' color="text.primary">
                Cuenta bancaria
            </Typography>
        </DialogTitle>
        <Stack direction="column" paddingY={1} paddingX={3} gap={1.5}>
            <Stack direction="row" gap={1.5}>
                <FormControl fullWidth size="small">
                    <InputLabel  required >Entidad</InputLabel>
                    <Select
                        id="Entidad"
                        label="Seleccione"
                        size='small'
                        placeholder='Seleccione'
                        fullWidth
                    >
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                    </Select>
                </FormControl>    
                

                <FormControl fullWidth size="small">
                    <InputLabel  required >Tipo de cuenta</InputLabel>
                    <Select
                        id="TipoDeCuenta"
                        label="Seleccione"
                        size='small'
                        placeholder='Seleccione'
                        fullWidth
                    >
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                    </Select>
                </FormControl>    
                
            </Stack>

            <Stack direction="row" gap={1.5}>
                <TextField
                    {...propsInputs}
                    id="numeroDeCuenta" 
                    label="Número de cuenta"
                    required
                />
            </Stack>

            <Stack direction="row" gap={1.5}>
                <TextField
                    {...propsInputs}
                    id="swift" 
                    label="Swift"
                />

                <TextField
                    {...propsInputs}
                    type="number"
                    id="abba-iban" 
                    label="ABBA/IBAN"
                />
            </Stack>

            <Typography variant='subtitle2' color="primary.light">
                Tesorería
            </Typography>

            <Stack direction="row" gap={1.5}>
                <TextField
                    {...propsInputs}
                    type="mail"
                    id="correo" 
                    label="Correo"
                />

                <TextField
                    {...propsInputs}
                    type="number"
                    id="contacto" 
                    label="Contacto"
                />
            </Stack>

            <Stack direction="row" gap={1.5}>
                <TextField
                    {...propsInputs}
                    type="number"
                    id="telefono" 
                    label="Télefono"
                    sx={{width:"49%"}}
                />
            </Stack>

            <Stack direction="row" gap={1.5}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Pago por NIT" />
                </FormGroup>
            </Stack>
        </Stack>
        <DialogActions>
            <Stack direction="row" gap={1}>
                <Button onClick={() => CerrarDialog()} size='medium' variant="text">
                    Cancelar
                </Button>

                <Button 
                    size='medium' 
                    variant="contained"
                >
                    Guardar
                </Button>
            </Stack>
        </DialogActions>
    </Dialog>
    </>
  )
}
