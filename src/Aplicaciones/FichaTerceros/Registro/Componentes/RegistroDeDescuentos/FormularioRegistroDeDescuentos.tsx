import { Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export interface FormularioRegistroDeDescuentosProps {
    estado: boolean,
    cambiarEstado: Function
}

const FormularioRegistroDeDescuentos = ({ estado, cambiarEstado }: FormularioRegistroDeDescuentosProps) => {
    return (
        <Dialog open={estado}
            onClose={() => cambiarEstado()}
            fullWidth
        >
            <DialogTitle>
                <Typography variant='h6'>
                    Nuevo Descuento
                </Typography>
            </DialogTitle>
            <Stack direction="column" p={3} gap={1.5}>
                <Stack direction="row" gap={1.5}>
                    <FormControl size="small" sx={{ width: "140%" }}>
                        <InputLabel id="selectDescuento">Descuento</InputLabel>
                        <Select placeholder="Seleccione una opción"
                            variant="outlined"
                            size="small"
                            id="selectDescuento"
                            label="Descuentos" >
                            <MenuItem defaultChecked={true} value="10">Seleccione una opción</MenuItem>
                            <MenuItem value="20">Twenty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField variant="outlined" size="small" id="select" label="Plazo (Días)"></TextField>
                    <TextField variant="outlined" size="small" id="select" label="%" sx={{ width: "20%" }}></TextField>
                </Stack>
                <Stack>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="selectCiudad">Ciudad</InputLabel>
                        <Select placeholder="Seleccione una opción"
                            variant="outlined"
                            size="small"
                            id="selectCiudad"
                            label="Ciudad" >
                            <MenuItem value="Bogotá">Bogotá</MenuItem>
                            <MenuItem value="Manizales">Medellin</MenuItem>

                        </Select>
                    </FormControl>
                </Stack>
                <Stack>
                    <TextField label="Observaciones" rows={3} multiline></TextField>
                </Stack>
            </Stack>
            <DialogActions>
                <Stack direction="row" gap={1}>
                    <Button size='medium' variant="text" onClick={() => cambiarEstado()}>
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

    )
}

export default FormularioRegistroDeDescuentos