import { Button, Card, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'


// Icons
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { Save } from '@mui/icons-material';
import FormularioDirecciones from './FormularioDirecciones';
import TipoPersonaNaturalCampos from './TipoPersonaNaturalCampos';
import { useNavigate } from 'react-router-dom';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { CrearPeticion, CrearPeticionAxios } from '../../../../../Consumos/APIManager';
import ITipoTercero from '../../../Interfaces/Generales/ITipoTercero';
import ITipoDocumento from '../../../Interfaces/Generales/ITipoDocumento';

export default function FormularioInformacionGeneral() {
  const navigate = useNavigate();
  
  const {propsTercerosContexto}:{propsTercerosContexto:any} = useContext<any>(TercerosContexto);
  const [tipoPersonaChecked, setTipoPersonaChecked] = useState(1);
  const [verModalDireccion, setVerModalDireccion] = useState(false);
  const [ListaTipoTercero, setListaTipoTercero] = useState<Array<ITipoTercero>>([]);
  const [ListaTipoDocumento, setListaTipoDocumento] = useState<Array<ITipoDocumento>>([]);
  const [ListaCiudades, setListaCiudades] = useState<Array<any>>([]);


  useEffect(() => {
    propsTercerosContexto.CambiarTituloPageHeader("Creación de tercero");
    ConsultarListas();
  }, [])

  const propsInputs: Record<string, any> = {
    variant:"outlined", 
    size:'small',
    fullWidth:true,
  };

  const ConsultarListas = async ()=> {
    let PropsDefaultRequest:CrearPeticionAxios = {
      API: "CONFIGURACION",
      URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
      Type:"GET"
    };

    // ---- Tipos Terceros
    await CrearPeticion({
      ...PropsDefaultRequest,
      Body:{
          UsuarioID: 1,
          Clave: 'TipoTerceros'
      }
    }).then((respuesta)=> {
      if (respuesta != null && respuesta.ok == true) {
          setListaTipoTercero(respuesta.datos);
      }
    });

    // ---- Tipos Documento
    await CrearPeticion({
      ...PropsDefaultRequest,
      Body:{
          UsuarioID: 1,
          Clave: 'TiposDocumento'
      }
    }).then((respuesta)=> {
      if (respuesta != null && respuesta.ok == true) {
          setListaTipoDocumento(respuesta.datos);
      }
    });

    // ---- Ciudades
    await CrearPeticion({
      ...PropsDefaultRequest,
      Body:{
          UsuarioID: 1,
          Clave: 'Ciudades'
      }
    }).then((respuesta)=> {
      if (respuesta != null && respuesta.ok == true) {
          setListaCiudades(respuesta.datos);
      }
    });

  }
  const VerFormularioDirecciones = ()=> {
    setVerModalDireccion(!verModalDireccion);
  }

  const CambioTipoPersona = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setTipoPersonaChecked(Number((event.target as HTMLInputElement).value));
    }
  }

  

  return (
    <>
      <Stack direction="column" gap={1.5} paddingY={3} marginBottom={8} alignItems="center" width={"100%"}>

        <Card style={{backgroundColor:"white", width: "60%"}}>
          <Stack padding={3} gap={1.5}>
            {/* Tipo de persona */}
            <Stack direction="column">
              <FormControl>
                <Typography variant='caption' color="text.secondary" fontWeight={400}>
                  * Tipo de persona
                </Typography>

                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="TipoPersona"
                  onChange={CambioTipoPersona}
                >
                  <FormControlLabel checked={tipoPersonaChecked == 1} value={1} control={<Radio />} label="Natural" />
                  <FormControlLabel checked={tipoPersonaChecked == 2} value={2} control={<Radio />} label="Jurídica" />
                </RadioGroup>
              </FormControl>
            </Stack>

            {
                tipoPersonaChecked == 1 &&
                  <TipoPersonaNaturalCampos propsInputs={propsInputs} />
            }

            {
              tipoPersonaChecked == 2 &&
              <Stack direction="row" gap={1.5}>
                <TextField 
                  error
                  {...propsInputs}
                  id="razonSocial" 
                  label="Razón social"
                  required
                />
              </Stack>
            }
            

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
                    <TextField
                      id="TipoTercero"
                      label="Tipo"
                      size='small'
                      placeholder='Seleccione'
                      select
                      required
                    >
                      {
                        ListaTipoDocumento.map(data => {
                          return <MenuItem key={data.TipoID} value={data.TipoID}>{data.TipoID}</MenuItem>
                        })
                      }
                    </TextField>
                  </FormControl>

                  <TextField 
                    {...propsInputs}
                    id="numeroIdentificacion" 
                    label="Número de identificación" 
                    type="number"
                    required
                    sx={{
                      width: "60%",
                      fontSize: 10
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
                <TextField
                    id="TipoTercero"
                    label="Tipo"
                    size='small'
                    placeholder='Seleccione'
                    select
                    required
                >
                  {
                    ListaTipoTercero.map(data => {
                      return <MenuItem key={data.TpTID} value={data.TpTID}>{data.TpTDesc}</MenuItem>
                    })
                  }
                </TextField>
              </FormControl>
            </Stack>

            {/* Ciudad y dirección */}
            <Stack direction="row" gap={1.5}>
                <FormControl 
                  sx={{
                    width:"50%"
                  }}
                  size='small'
                >
                  <TextField
                    id="tipoDocumento"
                    label="Ciudad"
                    size='small'
                    select
                  >
                    {
                      ListaCiudades.map(data => {
                        return <MenuItem key={data.CiuID} value={data.CiuID}>{data.CiuNombre}</MenuItem>
                      })
                    }
                  </TextField>
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
          </Stack>
        </Card>
          
        <Card style={{backgroundColor:"white", width: "60%"}}>
          <Stack paddingX={3} paddingY={3} gap={1.5}>
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
        </Card>
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
          <Button onClick={() => propsTercerosContexto.CambiarEstadoNuevoRegistro(false)} size='medium' variant="text">
              Cancelar
          </Button>

          <Button 
            startIcon={<Save />} 
            // size='small' 
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
