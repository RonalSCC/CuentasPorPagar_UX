import { Button, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import { IMaskInput } from 'react-imask';
import React, { useState } from 'react'


// Icons
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { Save } from '@mui/icons-material';
import FormularioDirecciones from './FormularioDirecciones';

export default function FormularioInformacionGeneral(
  {
    RegistrarNuevoTercero
  }:
  {
    RegistrarNuevoTercero: Function
  }
) {

  const [verModalDireccion, setVerModalDireccion] = useState(false);
  const propsInputs: Record<string, any> = {
    variant:"outlined", 
    size:'small',
    fullWidth:true,
  };

  const VerFormularioDirecciones = ()=> {
    setVerModalDireccion(!verModalDireccion);
  }

  return (
    <>
      {/* <Stack direction="column" padding={3}>
        <Typography variant='h6' color="primary.main">
          Registro de terceros
        </Typography>
      </Stack> */}

      <Stack direction="column" gap={1.5} paddingY={3} paddingX={31} paddingBottom={10}>
          <Typography variant='h6' color="primary.main">
            Información general
          </Typography>

          {/* Tipo de persona */}
          <Stack direction="column">
            <FormControl>
              <Typography variant='caption' color="text.secondary" fontWeight={400}>
                * Tipo de persona
              </Typography>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel control={<Radio />} label="Natural" />
                <FormControlLabel control={<Radio />} label="Jurídica" />
              </RadioGroup>
            </FormControl>
          </Stack>

          {/* Nombre */}
          <Stack direction="row" gap={1.5}>
            <TextField 
              {...propsInputs}
              id="primerNombre" 
              label="Primer nombre"
              placeholder='Prueba pruebita'
              required
            />
            <TextField 
              {...propsInputs}
              id="segundoNombre" 
              label="Segundo nombre" 
            />
          </Stack>

          {/* Apellidos */}
          <Stack direction="row" gap={1.5}>
            <TextField 
              {...propsInputs}
              id="primerApellido" 
              label="Primer apellido" 
              required
            />
            <TextField 
              {...propsInputs}
              id="segundoApellido" 
              label="Segundo apellido" 
            />
          </Stack>

          {/* Tipo Doc, Numero Ident, DV y Tipo */}
          <Stack direction="row" gap={1.5}>
            <Stack width="50%" direction="column">
              <Stack direction="row" gap={1.5}>
                <FormControl 
                  fullWidth
                  sx={{
                    width: "25%"
                  }}
                >
                  <InputLabel required shrink id="demo-multiple-name-label">Tipo</InputLabel>
                  <Select
                    labelId="label-tipoDocumento"
                    id="tipoDocumento"
                    label="* Tipo"
                    size='small'
                    notched
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>
                </FormControl>

                <TextField 
                  {...propsInputs}
                  id="numeroIdentificacion" 
                  label="Número de identificación" 
                  type="number"
                  required
                  sx={{
                    width: "60%"
                  }}
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
            </Stack>

            <FormControl 
              sx={{
                width: "50%"
              }}
            >
              <InputLabel shrink id="demo-multiple-name-label">* Tipo</InputLabel>
              <Select
                labelId="label-tipoDocumento"
                id="tipoDocumento"
                label="* Tipo"
                size='small'
                notched
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Ciudad y dirección */}
          <Stack direction="row" gap={1.5}>
              <FormControl 
                sx={{
                  width:"50%"
                }}
              >
                <InputLabel required shrink id="demo-multiple-name-label">Ciudad</InputLabel>
                <Select
                  labelId="label-tipoDocumento"
                  id="tipoDocumento"
                  label="Ciudad"
                  size='small'
                  notched
                >
                  <MenuItem value={10}>1</MenuItem>
                  <MenuItem value={20}>2</MenuItem>
                  <MenuItem value={30}>3</MenuItem>
                </Select>
              </FormControl>

              <Stack direction="row" width="50%" gap={1} alignItems="center">
                <TextField
                  {...propsInputs}
                  required
                  id="direccion" 
                  label="Dirección" 
                />

                <AddLocationAltOutlinedIcon onClick={VerFormularioDirecciones} color='secondary' sx={{cursor:"pointer"}} />
              </Stack>
          </Stack>

          {/* Telefono fijo y celular */}
          <Stack direction="row" gap={1.5}>
            <TextField 
              {...propsInputs}
              id="telefono" 
              label="Télefono fijo"
            />
            <TextField 
              {...propsInputs}
              id="celular" 
              label="Celular" 
              required
            />
          </Stack>

          <Divider />

          <Typography variant='h6' color="primary.main">
            Contacto
          </Typography>

          {/* Nombre, mail contacto */}
          <Stack direction="row" gap={1.5}>
            <TextField 
              {...propsInputs}
              id="nombreContacto" 
              label="Nombre"
              required
            />
            <TextField 
              {...propsInputs}
              id="emailContacto" 
              label="Email" 
              required
            />
          </Stack>
      </Stack>  

      <Stack  
        direction="row" 
        paddingY={1.5} 
        justifyContent="flex-end" 
        
        position="fixed"
        bottom={0}
        height={"7%"}
        width="100%"
        zIndex={1}
        sx={{
          backgroundColor: "#EDEFF5",
        }}
      >
        
        <Stack direction="row" paddingX={3} gap={1.5}>
          <Button onClick={() => RegistrarNuevoTercero(false)} size='medium' variant="text">
              Cancelar
          </Button>

          <Button 
            startIcon={<Save />} 
            size='medium' 
            variant="contained"
          >
              Guardar
          </Button>
        </Stack>
      </Stack>
        {
          verModalDireccion == true && 
            <FormularioDirecciones estado={verModalDireccion} cambiarEstado={setVerModalDireccion}/>
        }
    </>
  )
}
