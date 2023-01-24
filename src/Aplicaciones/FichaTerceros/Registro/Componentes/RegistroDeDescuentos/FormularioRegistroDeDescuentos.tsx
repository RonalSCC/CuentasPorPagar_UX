import { Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export interface FormularioRegistroDeDescuentosProps {
    estado: boolean,
    cambiarEstado: Function,
    title: string
}

const FormularioRegistroDeDescuentos = ({ estado, cambiarEstado, title }: FormularioRegistroDeDescuentosProps) => {
    return (
        <Dialog open={estado}
            onClose={() => cambiarEstado()}
            fullWidth
        >
            <DialogTitle>
                <Typography variant='h6'>
                    {title}
                </Typography>
            </DialogTitle>
            <Stack direction="column" p={3} gap={1.5}>
                <Stack direction="row" gap={1.5}>
                    <FormControl size="small" sx={{ width: "140%" }}>

                        <TextField placeholder="Seleccione una opción"
                            variant="outlined"
                            size="small"
                            id="selectDescuento"
                            label="Descuentos"
                            select>
                            <MenuItem value="Bogotá">Bogotá</MenuItem>
                            <MenuItem value="Manizales">Medellin</MenuItem>
                        </TextField>
                    </FormControl>
                    <TextField variant="outlined" size="small" id="select" label="Plazo (Días)"></TextField>
                    <TextField variant="outlined" size="small" id="select" label="%" sx={{ width: "20%" }}></TextField>
                </Stack>
                <Stack>
                    <FormControl size="small" fullWidth>
                        <TextField placeholder="Seleccione una opción"
                            variant="outlined"
                            size="small"
                            id="selectCiudad"
                            label="Ciudad" >
                            <MenuItem value="Bogotá">Bogotá</MenuItem>
                            <MenuItem value="Manizales">Medellin</MenuItem>
                        </TextField>
                    </FormControl>
                </Stack>
                <Stack>
                    <TextField label="Observaciones" rows={5} multiline></TextField>
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