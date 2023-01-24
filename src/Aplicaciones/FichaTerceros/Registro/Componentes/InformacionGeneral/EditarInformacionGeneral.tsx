import { Edit } from '@mui/icons-material';
import { Button, Card, CardActions, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import React from 'react'
import ContenedorBotonesEditarInfo from './_ContenedorBotonesEditarInfo';

export default function EditarInformacionGeneral() {

  const propsInputs: Record<string, any> = {
    variant:"outlined", 
    size:'small',
    fullWidth:true,
  };

  const GuardarInformacion = ()=>{

  }

  const CancelarEdicion = ()=>{
    
  }
  return (
    <>
      <Stack direction="column" width="100%" gap={1.5}>
        <Card sx={{backgroundColor: "white", width:"100%"}}>
          <Stack direction={"column"} padding={2} gap={1.5}>
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
              <Stack direction="row" gap={1.5} width={"50%"}>
                <FormControl
                 fullWidth
                 sx={{
                  width: "35%"
                 }}
                >
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
                    width: "20%"
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

            <Stack direction="row" gap={1.5}>
              <FormControl
                sx={{width: "50%"}}
              >
                  <InputLabel required shrink>Ciudad</InputLabel>
                    <Select
                      labelId="label-tipoDocumento"
                      id="Ciudad"
                      label="Ciudad"
                      size='small'
                      notched
                    >
                      <MenuItem value={10}>1</MenuItem>
                    </Select>
              </FormControl>

              <Stack width={"50%"} direction="row" gap={1.5}>
                <TextField 
                  {...propsInputs}
                  id="Direccion" 
                  label="Dirección" 
                  fullWidth
                />

                <IconButton size='small'>
                  <Edit fontSize='small'/>
                </IconButton>
              </Stack>
            </Stack>

            <Stack direction={"row"} gap={1.5}>
              <FormControl
                sx={{width: "50%"}}
              >
                <InputLabel required shrink>Tipo</InputLabel>
                <Select
                  labelId="label-tipoDocumento"
                  id="Tipo"
                  label="Tipo"
                  size='small'
                  notched
                >
                  <MenuItem value={10}>1</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                sx={{width: "50%"}}
              >
                <InputLabel required shrink>Sub-tipo</InputLabel>
                <Select
                  labelId="label-tipoDocumento"
                  id="Sub-tipo"
                  label="Sub-tipo"
                  size='small'
                  notched
                >
                  <MenuItem value={10}>1</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction={"row"} gap={1.5}>
              <FormControl
                fullWidth
              >
                <InputLabel required shrink>Actividad economica</InputLabel>
                <Select
                  labelId="label-tipoDocumento"
                  id="ActividadEconomica"
                  label="Actividad economica"
                  size='small'
                  notched
                >
                  <MenuItem value={10}>1</MenuItem>
                </Select>
              </FormControl>

              <TextField 
                {...propsInputs}
                id="CorreoElectronico" 
                label="Correo electronico" 
              />
            </Stack>

            <Stack direction={"row"} gap={1.5} >
              <Stack direction={"column"} gap={1.5} width="50%">
                <TextField 
                  {...propsInputs}
                  id="Telefono fijo" 
                  label="Telefono fijo" 
                  type={"number"}
                />

                <Stack direction={"row"} gap={1.5} >
                  <Chip size='small' label="Número1"/>
                  <Chip size='small' label="Número2"/>

                </Stack>
              </Stack>
              
              <Stack direction={"column"} gap={1.5} width="50%">
                <TextField 
                  {...propsInputs}
                  id="Telefono celular" 
                  label="Telefono celular" 
                  type={"number"}
                />

                <Stack direction={"row"} gap={1.5}>
                  <Chip size='small' label="Número1"/>
                  <Chip size='small' label="Número2"/>
                </Stack>
              </Stack>
            </Stack>

            <TextField 
                {...propsInputs}
                id="Observaciones" 
                multiline
                rows={2}
                label="Observaciones" 
            />
          </Stack>

          <ContenedorBotonesEditarInfo 
            MetodoGuardar={GuardarInformacion}
            MetodoCancelar={CancelarEdicion}
          />
        </Card>



        <Card sx={{backgroundColor: "white", width:"100%"}}>
            <Stack direction={"column"} padding={2} gap={1.5}>
                <Typography variant='subtitle2' color={"primary.light"}>
                  Representante legal
                </Typography>

                <Stack direction={"row"} gap={1.5}>
                  <TextField
                      {...propsInputs}
                      id="NombreRL" 
                      label="Nombre"
                      required
                      sx={{
                        width: "50%"
                      }}
                  />

                  <Stack direction={"row"} gap={1.5} width="50%">
                    <FormControl
                        fullWidth
                        sx={{
                          width: "30%"
                        }}
                      >
                      <InputLabel required shrink>Tipo de ID</InputLabel>
                        <Select
                          labelId="label-tipoDocumento"
                          id="TipoIdentificacionRL"
                          label="Tipo de ID"
                          size='small'
                          notched
                        >
                          <MenuItem value={10}>1</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        {...propsInputs}
                        id="NumeroIdentificacionRL" 
                        label="Número de identificación"
                        type={"number"}
                        required
                    />
                  </Stack>
                </Stack>

                <Stack direction={"row"} gap={1.5}>
                  <TextField
                    {...propsInputs}
                    id="LugarExpedicionRL" 
                    label="Lugar expedición"
                    required
                  />

                  <TextField
                    {...propsInputs}
                    id="CorreoElectronicoRL" 
                    label="Correo electronico"
                    required
                  />
                </Stack>
            </Stack>
            
            <ContenedorBotonesEditarInfo 
              MetodoGuardar={GuardarInformacion}
              MetodoCancelar={CancelarEdicion}
            />
        </Card>
      </Stack>
    </>
  )
}
