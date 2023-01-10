import { FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import React from 'react'

export default function EditarInformacionGeneral() {

  const propsInputs: Record<string, any> = {
    variant:"outlined", 
    size:'small',
    fullWidth:true,
  };

  return (
    <>
        <Stack direction="row" width="100%">
            <Stack direction="column" gap={1.5} padding={3} width="100%">
                <Typography variant='h6' color="text.primary">
                    Información general
                </Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="column">
                    <FormControl>
                    <Typography variant='caption' color="text.secondary" fontWeight={400}>
                        * Tipo de persona
                    </Typography>
                      <RadioGroup
                        row
                        name="TipoPersona"
                      >
                        <FormControlLabel value={1} control={<Radio />} label="Natural" />
                        <FormControlLabel value={2} control={<Radio />} label="Jurídica" />
                      </RadioGroup>
                    </FormControl>
                  </Stack>

                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Activo" />
                  </FormGroup>
                </Stack>

                <TextField
                    {...propsInputs}
                    id="razonSocial" 
                    label="Razón social"
                    required
                />

                <Stack direction="row" gap={1.5}>
                  <Stack direction="row" gap={1.5}>
                    <FormControl fullWidth>
                      <InputLabel required shrink>Tipo</InputLabel>
                        <Select
                          labelId="label-tipoDocumento"
                          id="tipoDocumento"
                          label="Tipo"
                          size='small'
                          notched
                        >
                          <MenuItem value={10}>1</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField 
                      {...propsInputs}
                      id="numeroIdentificacion" 
                      label="Número de identificación" 
                      type="number"
                      required
                    />

                    <TextField 
                      {...propsInputs}
                      id="digitoVerificacion" 
                      label="DV" 
                      type="number"
                      sx={{
                        width: "15%"
                      }}
                    />
                  </Stack>

                  <FormControl sx={{width: "50%"}}>
                    <InputLabel required shrink>Forma de pago</InputLabel>
                      <Select
                        labelId="label-tipoDocumento"
                        id="formaPago"
                        label="Forma de pago"
                        size='small'
                        notched
                      >
                        <MenuItem value={10}>1</MenuItem>
                      </Select>
                  </FormControl>
                </Stack>
            </Stack>
        </Stack>
    </>
  )
}
