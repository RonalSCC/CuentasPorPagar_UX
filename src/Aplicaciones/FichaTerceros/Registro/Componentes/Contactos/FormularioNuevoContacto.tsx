import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const FormularioNuevoContacto = (
    {
        estado,
        cambiarEstado
    }:
        {
            estado: boolean,
            cambiarEstado: any
        }

) => {

    const propsInputs: Record<string, any> = {
        variant: "outlined",
        size: 'small',
        fullWidth: true,
    };

    return (
        <>
            <Dialog
                open={estado}
                onClose={cambiarEstado}
                fullWidth
            >
                <DialogTitle paddingY={2} paddingX={3}>
                    <Typography variant="h6">Nuevo Contacto</Typography>
                </DialogTitle>

                <DialogContent sx={{ padding: "0px" }}>
                    <Stack gap={1.5} p={3} direction="column">
                        <Stack direction="row" gap={1.5}>
                            <TextField {...propsInputs} label="Nombre" required sx={{width:"50%"}}></TextField>
                            <Stack direction="row" gap={1.5}>
                                <FormControl size="small" sx={{width:"40%"}}>
                                    <InputLabel required >Tipo</InputLabel>
                                    <Select
                                        id="tipo"
                                        label="Tipo"
                                        size='small'
                                        placeholder='Seleccione'
                                    >
                                        <MenuItem value={1}>C.C</MenuItem>
                                        <MenuItem value={2}>C.E</MenuItem>
                                        <MenuItem value={3}>T.I</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField {...propsInputs} label="Número de identificación" required />
                            </Stack>
                        </Stack>
                        <Stack>
                            <TextField {...propsInputs} label="Email" ></TextField>
                        </Stack>
                        <Stack direction="row" gap={1.5}>
                            <TextField {...propsInputs} label="Celular" required sx={{width:"50%"}}/>
                            <Stack direction="row" gap={1.5}>
                                <TextField {...propsInputs} label="Telefono" required />
                                <TextField {...propsInputs} label="Ext" required />
                            </Stack>
                        </Stack>
                        <Stack direction="row" gap={1.5}>
                            <FormControl fullWidth size="small">
                                <InputLabel required >Tipo</InputLabel>
                                <Select
                                    id="tipo"
                                    label="Tipo"
                                    size='small'
                                    placeholder='Seleccione'
                                >
                                    <MenuItem value={1}>Financiero y Administrativo</MenuItem>
                                    <MenuItem value={2}>Financiero y Administrativo</MenuItem>
                                    <MenuItem value={3}>Financiero y Administrativo</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField {...propsInputs} label="Cargo"></TextField>
                        </Stack>
                        <Stack>
                            <FormControl fullWidth size="small">
                                <InputLabel required >Ciudad</InputLabel>
                                <Select
                                    id="ciudad"
                                    label="Ciudad"
                                    size='small'
                                    placeholder='Seleccione'
                                >
                                    <MenuItem value={1}>Medellin</MenuItem>
                                    <MenuItem value={2}>Bogotá</MenuItem>
                                    <MenuItem value={3}>Cali</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Contacto principal" />
                            </FormGroup>
                        </Stack>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Stack direction="row" gap={1}>
                        <Button size='medium' variant="text" onClick={cambiarEstado}>
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

export default FormularioNuevoContacto