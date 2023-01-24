import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export interface FormularioContactoProps {
    estado: boolean,
    cambiarEstado: Function,
    title: string
}

const FormularioContacto = ({ estado, cambiarEstado, title }: FormularioContactoProps) => {

    const propsInputs: Record<string, any> = {
        variant: "outlined",
        size: 'small',
    };

    return (
        <>
            <Dialog
                open={estado}
                onClose={() => cambiarEstado()}
                fullWidth
            >
                <DialogTitle paddingY={2} paddingX={3}>
                    <Typography variant="h6">{title}</Typography>
                </DialogTitle>

                <DialogContent sx={{ padding: "0px" }}>
                    <Stack gap={1.5} p={3} direction="column">
                        <Stack direction="row" gap={1.5}>
                            <TextField fullWidth {...propsInputs} label="Nombre" required></TextField>
                        </Stack>
                        <Stack>
                            <TextField {...propsInputs} label="Email" ></TextField>
                        </Stack>
                        <Stack direction="row" gap={1.5}>
                            <TextField {...propsInputs} label="Celular" fullWidth />
                            <Stack direction="row" gap={1.5} sx={{ width: "100%" }}>
                                <TextField {...propsInputs} label="Telefono" />
                                <TextField {...propsInputs} label="Ext" />
                            </Stack>
                        </Stack>
                        <Stack direction="row" gap={1.5}>
                            <FormControl fullWidth size="small">
                                <TextField
                                    id="tipo"
                                    label="Tipo"
                                    size='small'
                                    placeholder='Seleccione'
                                    select
                                    required
                                >
                                    <MenuItem value={1}>Financiero y Administrativo</MenuItem>
                                    <MenuItem value={2}>Financiero y Administrativo</MenuItem>
                                    <MenuItem value={3}>Financiero y Administrativo</MenuItem>
                                </TextField>
                            </FormControl>
                            <TextField {...propsInputs} label="Cargo" fullWidth></TextField>
                        </Stack>
                        <Stack>
                            <FormControl fullWidth size="small">
                                <TextField
                                    id="ciudad"
                                    label="Ciudad"
                                    size='small'
                                    placeholder='Seleccione'
                                    select
                                >
                                    <MenuItem value={1}>Medellin</MenuItem>
                                    <MenuItem value={2}>Bogotá</MenuItem>
                                    <MenuItem value={3}>Cali</MenuItem>
                                </TextField>
                            </FormControl>
                        </Stack>
                        <Stack px={1}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Contacto principal" />
                            </FormGroup>
                        </Stack>
                    </Stack>
                </DialogContent>

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
        </>
    )
}

export default FormularioContacto