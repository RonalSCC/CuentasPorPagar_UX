import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';

export default function FormularioDirecciones(
    {
        estado,
        cambiarEstado
    }:
    {
        estado:boolean,
        cambiarEstado:any
    }
) {

    const propsInputs: Record<string, any> = {
        variant:"outlined", 
        size:'small',
        fullWidth:true,
      };

  return (
    <>
        <Dialog
            open={estado}
            onClose={cambiarEstado}
            fullWidth
        >
        <DialogTitle paddingY={2} paddingX={3}>
            Ubicación
        </DialogTitle>
        <DialogContent sx={{padding:"0px"}}>
            <Stack gap={2} paddingY={1.5} paddingX={3}>
                <Typography variant='subtitle2' color="primary.main">
                    Vía principal
                </Typography>
                <Stack direction="row" gap={1.5}>
                    <FormControl fullWidth size="small">
                        <InputLabel  required >Calle</InputLabel>
                        <Select
                            id="calle"
                            label="Seleccione"
                            size='small'
                            placeholder='Seleccione'
                        >
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            <MenuItem value={30}>3</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField 
                        {...propsInputs}
                        id="numeroViaPrincipal" 
                        label="Número" 
                        required
                    />

                    <FormControl fullWidth size="small">
                        <InputLabel>Intersección</InputLabel>
                        <Select
                            id="interseccionViaPrincipal"
                            label="Intersección"
                            size='small'
                            placeholder='Seleccione'
                        >
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            <MenuItem value={30}>3</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Typography variant='subtitle2' color="primary.main">
                    Vía secundaria 
                </Typography>

                <Stack direction="row" gap={1.5}>
                    <TextField 
                        {...propsInputs}
                        id="numeroViaSecundaria" 
                        label="Número"
                        required
                    />

                    <FormControl fullWidth size="small">
                        <InputLabel>Intersección</InputLabel>
                        <Select
                            id="interseccionViaSecundaria"
                            label="Intersección"
                            size='small'
                            placeholder='Seleccione'
                        >
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            <MenuItem value={30}>3</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField 
                        {...propsInputs}
                        id="numeroComplementoViaSecundaria" 
                        label="Número" 
                        required
                    />
                </Stack>

                <Divider/>

                <Stack direction="row" gap={1.5}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Unidad de identidad 1</InputLabel>
                        <Select
                            id="unidadIdentidad1"
                            label="Unidad de identidad 1"
                            size='small'
                            placeholder='Seleccione'
                        >
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            <MenuItem value={30}>3</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField 
                        {...propsInputs}
                        id="numeroUnidadIdentidad1" 
                        label="Número" 
                    />
                </Stack>

                <Stack direction="row" gap={1.5}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Unidad de identidad 2</InputLabel>
                        <Select
                            id="unidadIdentidad2"
                            label="Unidad de identidad 2"
                            size='small'
                            placeholder='Seleccione'
                        >
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            <MenuItem value={30}>3</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField 
                        {...propsInputs}
                        id="numeroUnidadIdentidad2" 
                        label="Número" 
                    />
                </Stack>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Stack direction="row" gap={1}>
                <Button size='medium' variant="text" onClick={cambiarEstado}>
                    Cerrar
                </Button>

                <Button 
                    size='medium' 
                    variant="contained"
                >
                    Actualizar
                </Button>
            </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}
