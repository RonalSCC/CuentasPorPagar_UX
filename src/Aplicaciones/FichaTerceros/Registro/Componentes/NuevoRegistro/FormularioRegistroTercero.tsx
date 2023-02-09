import { Button, Card, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

// Interfaces
import ICiudad from '../../../Interfaces/Generales/ICiudad';
import IConfig from '../../../Interfaces/Generales/IConfig';
import ITipoTercero from '../../../Interfaces/Generales/ITipoTercero';
import ITipoDocumento from '../../../Interfaces/Generales/ITipoDocumento';

// Icons
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import FormularioDirecciones from './FormularioDirecciones';
import TipoPersonaNaturalCampos from './TipoPersonaNaturalCampos';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { CrearPeticion } from '../../../../../Consumos/APIManager';
import { Save } from '@mui/icons-material';

export default function FormularioInformacionGeneral() {
   //const navigate = useNavigate();

   const { propsTercerosContexto }: { propsTercerosContexto: any } = useContext<any>(TercerosContexto);
   const [tipoPersonaChecked, setTipoPersonaChecked] = useState(1);
   const [verModalDireccion, setVerModalDireccion] = useState(false);
   const [ListaTipoTercero, setListaTipoTercero] = useState<Array<ITipoTercero>>([]);
   const [ListaTipoDocumento, setListaTipoDocumento] = useState<Array<ITipoDocumento>>([]);
   const [ListaCiudades, setListaCiudades] = useState<Array<ICiudad>>([]);
   const [Configs, setConfigs] = useState<IConfig>();
   
   const schema = Yup.object().shape({
      razonSocial: Yup
         .string(),   
      primerNombre: Yup
         .string()
         .required("Debe ingresar el nombre del tercero"),
      segundoNombre: Yup
         .string(),
      primerApellido: Yup
         .string()
         .required("Debe ingresar el apellido del tercero"),
      segundoApellido: Yup
         .string(),
      tipoIdentificacion: Yup
         .string()
         .required("Debe seleccionar un tipo de identificación"),
      numeroIdentificacion: Yup
         .number()
         .positive("Solo se acepta números positivos")
         .integer("Solo se acepta números enteros")
         .typeError("Solo se aceptan dígitos en este campo")
         .required("Debe ingresar el NIT del tercero"),
      digitoVerificacion: Yup
         .number()
         .positive("Solo se acepta números positivos")
         .integer("Solo se acepta números enteros")
         .typeError("Solo se aceptan dígitos en este campo")
         .required("Debe ingresar el NIT del tercero"),
      tipoTercero: Yup
         .string().required("Debe Seleccionar el tipo de tercero"),
      ciudad: Yup
         .string()
         .required("Debe ingresar la ciudad del tercero"),
      direccion: Yup
         .string()
         .required("Debe ingresar la dirección del tercero"),
      telefono: Yup
         .number()
         .typeError("Este campo debe ser númerico")
         .positive("Solo se acepta números positivos")
         .integer("Solo se acepta números enteros"),
      celular: Yup
         .number()
         .positive("Solo se acepta números positivos")
         .integer("Solo se acepta números enteros")
         .typeError("Este campo debe ser númerico"),
      nombreContacto: Yup
         .string()
         .required("Debe ingresar el nombre del contacto principal"),
      emailContacto: Yup
         .string()
         .email("El campo no corresponde a una dirección emal correcta")
         .required("Debe ingresar el correo electrónico del contacto principal")
   })

   const metodos = useForm({
      defaultValues:{
         razonSocial:"",
         primerNombre:"Cristian",
         segundoNombre:"Camilo",
         primerApellido:"Pérez",
         segundoApellido:"Sandoval",
         tipoIdentificacion:"",
         numeroIdentificacion:"2123544",
         digitoVerificacion:"1",
         tipoTercero:"",
         ciudad:"",
         direccion:"asdas",
         telefono:"3232",
         celular:"32155489",
         nombreContacto:"Ronal",
         emailContacto:"Ronal@sinco.com.co"

      },
      resolver: yupResolver(schema)
   })

   const { control, handleSubmit, formState} = metodos

   const onClickSubmit = (data: any) => console.log(data);

   useEffect(() => {
      propsTercerosContexto.CambiarTituloPageHeader("Creación de tercero");
      ConsultarListas();
      ConsultarConfigs();
   }, [])

   const propsInputs: Record<string, any> = {
      variant: "outlined",
      size: 'small',
      fullWidth: true,
   };

   const ConsultarConfigs = async () =>{
      let PropsDefaultRequestConfigs = {
            API: "CONFIGURACION",
            URLServicio: "/ConsultasGenerales/ConsultarConfigs",
            Type: "POST"
         };

      await CrearPeticion({
         ...PropsDefaultRequestConfigs,
         Body:{
            usuarioID:1,
            listaConfigs:[
               {
                  configID: "PROV_TELEFONO"
               },
               {
                  configID: "TER_REQ_REPLEGAL"
               }
            ]
         }
      }).then((respuesta) => {
         if(respuesta != null && respuesta.ok == true){
            setConfigs(respuesta.datos)
         }
      })
      
   }

   const ConsultarListas = async () => {
      let PropsDefaultRequest = {
         API: "CONFIGURACION",
         URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
         Type: "GET"
      };

      // ---- Tipos Terceros
      await CrearPeticion({
         ...PropsDefaultRequest,
         Body: {
            UsuarioID: 1,
            Clave: 'TipoTerceros'
         }
      }).then((respuesta) => {
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
      }).then((respuesta) => {
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
      }).then((respuesta) => {
         if (respuesta != null && respuesta.ok == true) {
            setListaTipoDocumento(respuesta.datos);
         }
      });

   }
   const VerFormularioDirecciones = () => {
      setVerModalDireccion(!verModalDireccion);
   }

   const CambioTipoPersona = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event) {
         setTipoPersonaChecked(Number((event.target as HTMLInputElement).value));
      }
   }

   return (
      <>
         <FormProvider {...metodos}>
            <Stack direction="column" gap={1.5} paddingY={3} marginBottom={8} alignItems="center" width={"100%"}>

               <Card style={{ backgroundColor: "white", width: "60%" }}>
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
                        tipoPersonaChecked == 1 ?
                           <TipoPersonaNaturalCampos propsInputs={propsInputs} /> :
                           <Stack direction="row" gap={1.5}>
                              <Controller
                                 control={metodos.control}
                                 name="razonSocial"
                                 render={({ field, formState:{errors} }) => (
                                    <TextField
                                       {...field}
                                       {...propsInputs}
                                       type="text"
                                       fullWidth
                                       label="Razón Social"
                                       error={!!errors.razonSocial}
                                       helperText={errors.razonSocial && `${errors.razonSocial.message}`}
                                    />
                                 )}
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
                                 <Controller
                                    control={control}
                                    name="tipoIdentificacion"
                                    render={({ field, formState: { errors } }) => (
                                       <TextField
                                          {...field}
                                          id="TipoTercero"
                                          label="Tipo"
                                          size='small'
                                          placeholder='Seleccione'
                                          select
                                          required
                                          error={!!errors.tipoIdentificacion}
                                          helperText={errors.tipoIdentificacion && `${errors.tipoIdentificacion.message}`}
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
                                 name="numeroIdentificacion"
                                 render={({ field, formState: { errors } }) => (
                                    <TextField
                                       {...propsInputs}
                                       {...field}
                                       id="numeroIdentificacion"
                                       label="Número de identificación"
                                       type="text"
                                       error={!!errors.numeroIdentificacion}
                                       helperText={errors.numeroIdentificacion && `${errors.numeroIdentificacion.message}`}
                                       sx={{
                                          width: "60%",
                                          fontSize: 10
                                       }}

                                    />
                                 )}
                              />
                              <Controller
                                 control={control}
                                 name="digitoVerificacion"
                                 render={({ field }) => (
                                    <TextField
                                       {...field}
                                       {...propsInputs}
                                       id="digitoVerificacion"
                                       label="DV"
                                       type="text"
                                       sx={{
                                          width: "15%"
                                       }}
                                    />
                                 )}
                              />
                           </Stack>
                        </Stack>

                        <FormControl
                           sx={{
                              width: "50%"
                           }}
                        >
                           <Controller
                              control={control}
                              name="tipoTercero"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="TipoTercero"
                                    label="Tipo"
                                    size='small'
                                    placeholder='Seleccione'
                                    select
                                    error={!!errors.tipoTercero}
                                    helperText={errors.tipoTercero && `${errors.tipoTercero.message}`}

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
                     </Stack>

                     {/* Ciudad y dirección */}
                     <Stack direction="row" gap={1.5}>
                        <FormControl
                           sx={{
                              width: "50%"
                           }}
                           size='small'
                        >
                           <Controller
                              control={control}
                              name="ciudad"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="Ciudad"
                                    label="Ciudad"
                                    size='small'
                                    select
                                    error={!!errors.ciudad}
                                    helperText={errors.ciudad && `${errors.ciudad.message}`}
                                 >
                                    {
                                       ListaCiudades.map(ciudad =>{
                                          return <MenuItem key={ciudad.CiuID} value={ciudad.CiuID}>{ciudad.CiuNombre}</MenuItem>
                                       }) 
                                    }
                                 </TextField>
                              )}
                           />
                        </FormControl>

                        <Stack direction="row" width="50%" gap={1} alignItems="center">

                           <Controller
                              control={control}
                              name="direccion"
                              render={({ field, formState: { errors } }) => (

                                 <TextField
                                    {...field}
                                    {...propsInputs}
                                    required
                                    id="direccion"
                                    label="Dirección"
                                    error={!!errors.direccion}
                                    helperText={errors.direccion && `${errors.direccion.message}`}
                                 />
                              )}
                           />

                           <AddLocationAltOutlinedIcon onClick={VerFormularioDirecciones} color='secondary' sx={{ cursor: "pointer" }} />
                           {
                              verModalDireccion == true &&
                              <FormularioDirecciones estado={verModalDireccion} cambiarEstado={VerFormularioDirecciones} />
                           }
                        </Stack>
                     </Stack>

                     {/* Telefono fijo y celular */}
                     <Stack direction="row" gap={1.5}>
                        <Controller
                           control={control}
                           name="telefono"
                           render={({ field, formState: { errors } }) => (
                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 id="telefono"
                                 label="Télefono fijo"
                                 error={!!errors.telefono}
                                 helperText={errors.telefono && `${errors.telefono.message}`}
                              />
                           )}
                        />
                        <Controller
                           control={control}
                           name="celular"
                           render={({ field, formState: { errors } }) => (

                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 id="celular"
                                 label="Celular"
                                 error={!!errors.celular}
                                 helperText={errors.celular && `${errors.celular.message}`}
                              />
                           )}
                        />
                     </Stack>
                  </Stack>
               </Card>

               <Card style={{ backgroundColor: "white", width: "60%" }}>
                  <Stack paddingX={3} paddingY={3} gap={1.5}>
                     <Typography variant='h6' color="primary.main">
                        Contacto
                     </Typography>

                     {/* Nombre, mail contacto */}
                     <Stack direction="row" gap={1.5}>
                        <Controller
                           control={control}
                           name="nombreContacto"
                           render={({ field, formState: { errors } }) => (

                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 id="nombreContacto"
                                 label="Nombre"
                                 error={!!errors.nombreContacto}
                                 helperText={errors.nombreContacto && `${errors.nombreContacto.message}`}
                              />
                           )}
                        />
                        <Controller
                           control={control}
                           name="emailContacto"
                           render={({ field, formState: { errors } }) => (

                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 id="emailContacto"
                                 label="Email"
                                 error={!!errors.emailContacto}
                                 helperText={errors.emailContacto && `${errors.emailContacto.message}`}
                              />
                           )}
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
                     variant="contained"
                     onClick={handleSubmit(onClickSubmit)}
                  >
                     Guardar
                  </Button>
               </Stack>
            </Stack>
         </FormProvider>
         <DevTool control={control} />
      </>
   )
}
