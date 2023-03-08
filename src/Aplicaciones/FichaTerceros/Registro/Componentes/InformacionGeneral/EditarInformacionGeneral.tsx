// Componentes Material UI y react
import { Card, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, FormProvider, Controller } from 'react-hook-form';

// Contextos
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';
import { CrearPeticion } from '../../../../../Consumos/APIManager';

// Iconos
import { Edit } from '@mui/icons-material';

// Interfaces
import ICiudad from '../../../Interfaces/Generales/ICiudad';
import ITipoDocumento from '../../../Interfaces/Generales/ITipoDocumento';
import ITipoTercero from '../../../Interfaces/Generales/ITipoTercero';
import ISubTipoTercero from '../../../Interfaces/Generales/ISubTipoTercero';
import IFormaPago from '../../../Interfaces/Generales/IFormaPago';

// Componentes
import ContenedorBotonesEditarInfo from './_ContenedorBotonesEditarInfo';
import { _SeccionTelefono } from './_SeccionTelefono';
import _SeccionNombresTercero from '../NuevoRegistro/_SeccionNombresTercero';
import _SeccionRazonSocial from '../NuevoRegistro/_SeccionRazonSocial';
import _SeccionDireccionTercero from '../NuevoRegistro/_SeccionDireccionTercero';
import _SeccionContactoTercero from '../NuevoRegistro/_SeccionContactoTercero';

export default function EditarInformacionGeneral() {

   const { state: InfoTercero } = useLocation();
   const { propsTercerosContexto }: { propsTercerosContexto: PropsTerceroContexto } = useContext<any>(TercerosContexto);
   const [verModalDireccion, setVerModalDireccion] = useState(false);
   const [ListaFormaDePago, setListaFormaDePago] = useState<Array<IFormaPago>>([]);
   const [ListaTipoTercero, setListaTipoTercero] = useState<Array<ITipoTercero>>([]);
   const [ListaSubTiposTercero, setListaSubTiposTercero] = useState<Array<ISubTipoTercero>>([]);
   const [ListaTipoDocumento, setListaTipoDocumento] = useState<Array<ITipoDocumento>>([]);
   const [ListaCiudades, setListaCiudades] = useState<Array<ICiudad>>([]);

   const metodos = useForm({
      mode: 'onSubmit',
   })

   const { control, handleSubmit, watch, setValue } = metodos
   const terTipoPersona = watch("terTipoPersona")

   const navigate = useNavigate();

   const propsInputs: Record<string, any> = {
      variant: "outlined",
      size: 'small',
      fullWidth: true,
   };

   const GuardarInformacion = () => {

   }

   const CancelarEdicion = () => {
      navigate("InformacionGeneralDatos");
   }

   const CambioNaturaleza = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
   }

   const VerFormularioDirecciones = () => {
      setVerModalDireccion(!verModalDireccion);
   }

   const ConsultarListas = async () => {
      let PropsDefaultRequest = {
         API: "CONFIGURACION",
         URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
         Type: "GET"
      };

      // ---- Tipos
      await CrearPeticion({
         ...PropsDefaultRequest,
         Body: {
            UsuarioID: 1,
            Clave: 'TipoTerceros'
         }
      })
         .then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
               setListaTipoTercero(respuesta.datos);
            }
         });

      // ---- Ciudades
      await CrearPeticion({
         ...PropsDefaultRequest,
         Body: {
            UsuarioID: 1,
            Clave: 'Ciudades'
         }
      })
         .then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
               setListaCiudades(respuesta.datos);
            }
         });
      // ---- Tipos Documento
      await CrearPeticion({
         ...PropsDefaultRequest,
         Body: {
            UsuarioID: 1,
            Clave: 'TiposDocumento'
         }
      })
         .then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
               setListaTipoDocumento(respuesta.datos);
            }
         });

      // ---- Sub-Tipos
      await CrearPeticion({
         ...PropsDefaultRequest,
         Body: {
            UsuarioID: 1,
            Clave: 'SubTiposTercero'
         }
      })
         .then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
               setListaSubTiposTercero(respuesta.datos);
            }
         });

      // ---- Forma de Pago
      await CrearPeticion({
         ...PropsDefaultRequest,
         Body: {
            UsuarioID: 1,
            Clave: 'FormasDePago'
         }
      })
         .then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
               setListaFormaDePago(respuesta.datos);
            }
         });

   }

   useEffect(() => {
      console.log(InfoTercero)
      if (InfoTercero) {
         setValue('terTipoPersona', InfoTercero.terTipoPersona)
         setValue('terPrimerNombre', InfoTercero.terPrimerNombre)
         setValue('terSegundoNombre', InfoTercero.terSegundoNombre);
         setValue('terPrimerApellido', InfoTercero.terPrimerApellido)
         setValue('terSegundoApellido', InfoTercero.terSegundoApellido)
         setValue('terTipoIdentificacion', InfoTercero.terTipoIdentificacion)
         setValue('terNumeroIdentificacion', InfoTercero.terNumeroIdentificacion)
         setValue('terDiv', InfoTercero.terDiv)
         setValue('terFormaPagoId', InfoTercero.terFormaPagoId)
         setValue('terCiudadId', InfoTercero.terCiudadId)
         setValue('terDireccion', InfoTercero.terDireccion)
         setValue('terTipoId', InfoTercero.terTipoId)
         setValue('terSubTipoId', InfoTercero.terSubTipoId)
         setValue('terEmail', InfoTercero.terEmail)
         setValue('terTelefono', InfoTercero.terTelefono)
         setValue('terCelular', InfoTercero.terCelular)
         setValue('terObservaciones', InfoTercero.terObservaciones)
         setValue('terContactoPrincipalNombre', InfoTercero.terContactoPrincipalNombre)
         setValue('terContactoPrincipalEmail', InfoTercero.terContactoPrincipalEmail)
         setValue('terRepresentanteLNombre', InfoTercero.terRepresentanteLNombre)
         setValue('terTipoIdentificacion', InfoTercero.terTipoIdentificacion)
         setValue('terRepresentanteLIdentificacion', InfoTercero.terRepresentanteLIdentificacion)
         setValue('terRepresentanteLExpedicion', InfoTercero.terRepresentanteLExpedicion)
         setValue('terRepresentanteLIdentificacion', InfoTercero.terRepresentanteLIdentificacion)
      }
   }, []);


   useEffect(() => {
      ConsultarListas();
   }, [])

   return (
      <>
         <FormProvider {...metodos}>
            <Stack direction="column" width="100%" gap={1}>
               <Card sx={{ backgroundColor: "white", width: "100%" }}>
                  <Stack direction={"column"} padding={2} gap={1}>
                     <Typography variant='h6' color="text.primary">
                        Información general
                     </Typography>

                     <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="column">
                           <FormControl>
                              <Typography variant='caption' color="text.secondary" fontWeight={400}>
                                 * Tipo de persona
                              </Typography>
                              <Controller
                                 control={control}
                                 name="terTipoPersona"
                                 defaultValue={terTipoPersona || "N"}
                                 render={({ field }) => (
                                    <RadioGroup
                                       {...field}
                                       row
                                       aria-labelledby="demo-row-radio-buttons-group-label"
                                       name="terTipoPersona"
                                    >
                                       <FormControlLabel value={'N'} control={<Radio />} label="Natural" />
                                       <FormControlLabel value={'J'} control={<Radio />} label="Jurídica" />
                                    </RadioGroup>
                                 )}
                              />
                           </FormControl>
                        </Stack>

                        <FormGroup>
                           <FormControlLabel control={<Switch defaultChecked />} label="Activo" />
                        </FormGroup>
                     </Stack>

                     {
                        terTipoPersona == 'N' ?
                           <Stack direction={1 ? "row" : "column"} gap={0.5}>
                              <_SeccionNombresTercero />
                           </Stack>
                           :
                           <_SeccionRazonSocial />
                     }

                     <Stack direction="row" gap={.5}>
                        <Stack direction="row" gap={1.5} width={"50%"}>
                           <FormControl
                              fullWidth
                              sx={{
                                 width: "35%"
                              }}
                           >
                              <Controller
                                 control={control}
                                 name="terTipoDocumento"
                                 render={({ field, formState: { errors } }) => (
                                    <TextField
                                       {...field}
                                       id="TipoTercero"
                                       label="Tipo"
                                       size='small'
                                       placeholder='Seleccione'
                                       select
                                       required
                                       error={!!errors.terTipoDocumento}
                                       helperText={errors.terTipoDocumento && `${errors.terTipoDocumento.message}`}
                                    >
                                       {
                                          ListaTipoDocumento.map(data => {
                                             return <MenuItem key={data.TipoID} value={data.TipoID}>{data.TipoID}</MenuItem>
                                          })
                                       }
                                    </TextField>
                                 )}
                              />
                           </FormControl>

                           <Controller
                              control={control}
                              name="terNumeroIdentificacion"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...propsInputs}
                                    {...field}
                                    id="terNumeroIdentificacion"
                                    label="Número de identificación"
                                    type="text"
                                    error={!!errors.terNumeroIdentificacion}
                                    helperText={errors.terNumeroIdentificacion && `${errors.terNumeroIdentificacion.message}`}
                                 />
                              )}
                           />

                           <Controller
                              control={control}
                              name="terDiv"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    {...propsInputs}
                                    id="terDiv"
                                    label="DV"
                                    type="text"
                                    error={!!errors.terDiv}
                                    helperText={errors.terDiv && `${errors.terDiv.message}`}
                                    sx={{
                                       width: "20%"
                                    }}
                                 />
                              )}
                           />
                        </Stack>

                        <FormControl sx={{ width: "50%" }}>
                           <Controller
                              control={control}
                              name="terFormaDePago"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="terFormaDePago"
                                    label="Forma de Pago"
                                    size='small'
                                    placeholder='Seleccione'
                                    select
                                    required
                                    error={!!errors.terFormaDePago}
                                    helperText={errors.terFormaDePago && `${errors.terFormaDePago.message}`}
                                 >
                                    {
                                       ListaFormaDePago.map(data => {
                                          return <MenuItem key={data.FrPID} value={data.FrPID}>{data.FrPDesc}</MenuItem>
                                       })
                                    }
                                 </TextField>
                              )}
                           />
                        </FormControl>
                     </Stack>

                     <Stack direction="row" gap={.5}>
                        <FormControl
                           sx={{
                              width: "50%"
                           }}
                           size='small'
                        >
                           <Controller
                              control={control}
                              name="terCiudad"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="terCiudad"
                                    label="Ciudad"
                                    size='small'
                                    select
                                    error={!!errors.terCiudad}
                                    helperText={errors.terCiudad && `${errors.terCiudad.message}`}
                                 >
                                    {
                                       ListaCiudades.map(ciudad => {
                                          return <MenuItem key={ciudad.CiuID} value={ciudad.CiuID}>{ciudad.CiuNombre}</MenuItem>
                                       })
                                    }
                                 </TextField>
                              )}
                           />
                        </FormControl>

                        <Stack width={"50%"} direction="row" gap={1.5}>
                           <Controller
                              control={control}
                              name="terDireccion"
                              render={({ field, formState: { errors } }) => (

                                 <TextField
                                    {...field}
                                    {...propsInputs}
                                    required
                                    id="terDireccion"
                                    label="Dirección"
                                    error={!!errors.terDireccion}
                                    helperText={errors.terDireccion && `${errors.terDireccion.message}`}
                                 />
                              )}
                           />

                           <IconButton onClick={VerFormularioDirecciones} size='small' sx={{ cursor: "pointer" }} >
                              <Edit fontSize='small' />
                           </IconButton>
                           {
                              verModalDireccion == true &&
                              <_SeccionDireccionTercero estado={verModalDireccion} cambiarEstado={VerFormularioDirecciones} />
                           }


                        </Stack>
                     </Stack>

                     <Stack direction={"row"} gap={.5}>
                        <FormControl
                           sx={{
                              width: "50%"
                           }}
                        >
                           <Controller
                              control={control}
                              name="terTipo"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="TipoTercero"
                                    label="Tipo"
                                    size='small'
                                    placeholder='Seleccione'
                                    select
                                    error={!!errors.terTipo}
                                    helperText={errors.terTipo && `${errors.terTipo.message}`}

                                 >
                                    {
                                       ListaTipoTercero.map(data => {
                                          return <MenuItem key={data.TpTID} value={data.TpTID}>{data.TpTDesc}</MenuItem>
                                       })
                                    }
                                 </TextField>
                              )}
                           />
                        </FormControl>

                        <FormControl
                           sx={{
                              width: "50%"
                           }}
                        >
                           <Controller
                              control={control}
                              name="terSubTipo"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="terSubTipo"
                                    label="Sub-tipo"
                                    size='small'
                                    placeholder='Seleccione'
                                    select
                                    error={!!errors.terSubTipo}
                                    helperText={errors.terSubTipo && `${errors.terSubTipo.message}`}
                                 >
                                    {
                                       ListaSubTiposTercero.map(data => {
                                          return <MenuItem key={data.TipoId} value={data.TipoId}>{data.TipoDesc}</MenuItem>
                                       })
                                    }
                                 </TextField>
                              )}
                           />
                        </FormControl>
                     </Stack>

                     <Stack direction={"row"} gap={.5}>
                        <FormControl
                           fullWidth
                        >
                           <Controller
                              control={control}
                              name="terActividadEconomica"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="terActividadEconomica"
                                    label="Actividad económicas"
                                    size='small'
                                    placeholder='Seleccione'
                                    select
                                    error={!!errors.terActividadEconomica}
                                    helperText={errors.terActividadEconomica && `${errors.terActividadEconomica.message}`}
                                 >
                                    {/* Pendiente lista de actividad Economicas */}
                                    {
                                       ListaSubTiposTercero.map(data => {
                                          return <MenuItem key={data.TipoId} value={data.TipoId}>{data.TipoDesc}</MenuItem>
                                       })
                                    }
                                 </TextField>
                              )}
                           />
                        </FormControl>

                        <Controller
                           control={control}
                           name="terEmail"
                           render={({ field, formState: { errors } }) => (

                              <TextField
                                 {...field}
                                 variant="outlined"
                                 size="small"
                                 fullWidth
                                 id="terEmail"
                                 label="Email"
                                 error={!!errors.terEmail}
                                 helperText={errors.terEmail && `${errors.terEmail.message}`}
                              />
                           )}
                        />
                     </Stack>

                     <Stack direction={"row"} gap={.5} >
                        <Stack direction={"column"} gap={.5} width="50%">
                           <_SeccionTelefono name='terTelefono' label='* Teléfono fijo' />
                        </Stack>

                        <Stack direction={"column"} gap={.5} width="50%">
                           <_SeccionTelefono name='terCelular' label='* Teléfono celular' />
                        </Stack>
                     </Stack>

                     <Controller
                        control={control}
                        name='terObservaciones'
                        render={({ field, formState: { errors } }) => (

                           <TextField
                              {...field}
                              {...propsInputs}
                              id="terObservaciones"
                              multiline
                              rows={2}
                              label="Observaciones"
                              error={!!errors.terObservaciones}
                              helperText={errors.terObservaciones && `${errors.terObservaciones.message}`}
                           />
                        )}
                     />
                  </Stack>

                  <ContenedorBotonesEditarInfo
                     MetodoGuardar={handleSubmit(GuardarInformacion)}
                     MetodoCancelar={CancelarEdicion}
                  />
               </Card>

               <Card sx={{ backgroundColor: "white", width: "100%" }}>
                  <Stack p={2} gap={1.5}>
                     <Typography variant='subtitle2' color="primary.light">
                        Contacto principal
                     </Typography>
                     <_SeccionContactoTercero />
                  </Stack>
                  <ContenedorBotonesEditarInfo
                     MetodoGuardar={handleSubmit(GuardarInformacion)}
                     MetodoCancelar={CancelarEdicion}
                  />
               </Card>

               <Card sx={{ backgroundColor: "white", width: "100%" }}>
                  <Stack direction={"column"} p={2} gap={.5}>
                     <Typography variant='subtitle2' color={"primary.light"}>
                        Representante legal
                     </Typography>

                     <Stack direction={"row"} gap={.5}>
                        <Controller
                           control={control}
                           name='terRepresentanteLNombre'
                           render={({ field, formState: { errors } }) => (
                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 id="terRepresentanteLNombre"
                                 label="Nombre"
                                 required
                                 sx={{
                                    width: "50%"
                                 }}
                                 error={!!errors.terRepresentanteLNombre}
                                 helperText={errors.terRepresentanteLNombre && `${errors.terRepresentanteLNombre.message}`}
                              />
                           )}
                        />

                        <Stack direction={"row"} gap={.5} width="50%">
                           <FormControl
                              fullWidth
                              sx={{
                                 width: "30%"
                              }}
                           >
                              <Controller
                                 control={control}
                                 name='terRepresentanteLITipodentificacion'
                                 render={({ field, formState: { errors } }) => (
                                    <TextField
                                       {...field}
                                       id="terRepresentanteLTipodIdentificacion"
                                       label="Tipo de ID"
                                       size='small'
                                       select
                                       error={!!errors.terRepresentanteLTipodIdentificacion}
                                       helperText={errors.terRepresentanteLTipodIdentificacion && `${errors.terRepresentanteLTipodIdentificacion.message}`}
                                    >
                                       <MenuItem value={10}>1</MenuItem>
                                    </TextField>
                                 )}
                              />
                           </FormControl>

                           <Controller
                              control={control}
                              name='terRepresentanteLNumeroIdentificacion'
                              render={({ field, formState: { errors } }) => (

                                 <TextField
                                    {...propsInputs}
                                    {...field}
                                    id="terRepresentanteLNumeroIdentificacion"
                                    label="Número de identificación"
                                    type={"number"}
                                    required
                                    error={!!errors.terRepresentanteLNumeroIdentificacion}
                                    helperText={errors.terRepresentanteLNumeroIdentificacion && `${errors.terRepresentanteLNumeroIdentificacion.message}`}
                                 />
                              )}
                           />
                        </Stack>
                     </Stack>

                     <Stack direction={"row"} gap={.5}>
                        <Controller
                           control={control}
                           name='terRepresentanteLExpedicion'
                           render={({ field, formState: { errors } }) => (

                              <TextField
                                 {...propsInputs}
                                 {...field}
                                 id="terRepresentanteLExpedicion"
                                 label="Lugar de expedición"
                                 type={"number"}
                                 required
                                 error={!!errors.terRepresentanteLExpedicion}
                                 helperText={errors.terRepresentanteLExpedicion && `${errors.terRepresentanteLExpedicion.message}`}
                              />
                           )}
                        />

                        <Controller
                           control={control}
                           name='terRepresentanteLEmail'
                           render={({ field, formState: { errors } }) => (

                              <TextField
                                 {...propsInputs}
                                 {...field}
                                 id="terRepresentanteLEmail"
                                 label="Correo electrónico"
                                 type='email'
                                 required
                                 error={!!errors.terRepresentanteLEmail}
                                 helperText={errors.terRepresentanteLEmail && `${errors.terRepresentanteLEmail.message}`}
                              />
                           )}
                        />
                     </Stack>
                  </Stack>

                  <ContenedorBotonesEditarInfo
                     MetodoGuardar={handleSubmit(GuardarInformacion)}
                     MetodoCancelar={CancelarEdicion}
                  />
               </Card>
            </Stack>
         </FormProvider>
      </>
   )
}


