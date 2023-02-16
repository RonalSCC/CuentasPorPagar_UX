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
   const [verModalDireccion, setVerModalDireccion] = useState(false);
   const [ListaTipoTercero, setListaTipoTercero] = useState<Array<ITipoTercero>>([]);
   const [ListaTipoDocumento, setListaTipoDocumento] = useState<Array<ITipoDocumento>>([]);
   const [ListaCiudades, setListaCiudades] = useState<Array<ICiudad>>([]);
   const [Configs, setConfigs] = useState<Record<string, string | number>>({})

   let PROV_TELEFONO = '1';
   let TER_REQ_REPLEGAL = '1';
   let TER_REQ_ACTIVECON = '1' // Actividad economica ??
   let TER_VALIDA_DV = '0'
   let TER_NOCALCULAR_DV = '0'
   let TER_FICHA_APIROS = '0'
   let PROV_CORREO_CTO = '1'

   const schema = Yup.object().shape({
      terTipoPersona: Yup
         .string(),
      terRazonSocial: Yup
         .string()
         .when("terTipoPersona", (terTipoPersona, schema) =>
            terTipoPersona == 'N' ? schema : schema.required("Debe ingresar una razón social")
         ),
      terPrimerNombre: Yup
         .string()
         .required("Debe ingresar el nombre del tercero"),
      terSegundoNombre: Yup
         .string(),
      terPrimerApellido: Yup
         .string()
         .required("Debe ingresar el apellido del tercero"),
      terSegundoApellido: Yup
         .string(),
      terTipoDocumento: Yup
         .string()
         .required("Debe seleccionar un tipo de identificación"),
      terNumeroIndentificaion: Yup
         .number()
         .required("Debe ingresar el NIT del tercero")
         .typeError("Solo se aceptan dígitos en este campo")
         .positive("Solo se acepta números positivos")
         .integer("Solo se acepta números enteros"),
      terDigitoV: Yup
         .number()
         .when({
            is: () => TER_VALIDA_DV == '1' && TER_NOCALCULAR_DV == '0',
            then: Yup
               .number()
               .required("Este campo es requerido")
               .typeError("El dígito de verificación es incorrecto")
         })
         .positive("Solo se acepta números positivos")
         .integer("Solo se acepta números enteros"),
      terTipo: Yup
         .string().required("Debe Seleccionar el tipo de tercero"),
      terCiudad: Yup
         .string()
         .required("Debe ingresar la ciudad del tercero"),
      terDireccion: Yup
         .string()
         .required("Debe ingresar la dirección del tercero"),
      terTelefono: Yup
         .number()
         .when({
            is: () => PROV_TELEFONO == '1' || TER_REQ_REPLEGAL == '1',
            then: Yup
               .number()
               .required("Debe ingresar un teléfono")
               .typeError("Solo se aceptan digitos en este campo"),
            otherwise: Yup
               .number()
               .typeError("Solo se aceptan digitos en este campo")
               .notRequired()
         })
         .positive("Solo se acepta números positivos")
         .integer("Solo se acepta números enteros"),
      terCelular: Yup
         .number()
         .positive("Solo se acepta números positivos")
         .integer("Solo se acepta números enteros")
         .typeError("Este campo debe ser númerico"),
      terContactoPrincipalNombre: Yup
         .string()
         .required("Debe ingresar el nombre del contacto principal"),
      terContactoPrincipalEmail: Yup
         .string()
         .email("El campo no corresponde a una dirección emal correcta")
         .when({
            is: () => TER_FICHA_APIROS != '1' && PROV_CORREO_CTO == '1',
            then: Yup
               .string()
               .required("Debe ingresar el correo electrónico del contacto principal"),
         })

   })

   const metodos = useForm({
      defaultValues: {
         terTipoPersona: "N",
         terRazonSocial: "",
         terPrimerNombre: "Cristian",
         terSegundoNombre: "Camilo",
         terPrimerApellido: "Pérez",
         terSegundoApellido: "Sandoval",
         terTipoDocumento: "",
         terNumeroIndentificaion: undefined,
         terDigitoV: "1",
         terTipo: "",
         terCiudad: "",
         terDireccion: "asdas",
         terTelefono: undefined,
         terCelular: "32155489",
         terContactoPrincipalNombre: "Ronal",
         terContactoPrincipalEmail: "Ronal@sinco.com.co"
      },
      resolver: yupResolver(schema),
      mode: 'onSubmit',
   })

   const { control, handleSubmit, watch } = metodos
   const terTipoPersona = watch("terTipoPersona")

   const VerFormularioDirecciones = () => {
      setVerModalDireccion(!verModalDireccion);
   }

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

   const ConsultarConfigs = async () => {
      let PropsDefaultRequestConfigs = {
         API: "CONFIGURACION",
         URLServicio: "/ConsultasGenerales/ConsultarConfigs",
         Type: "POST"
      };

      await CrearPeticion({
         ...PropsDefaultRequestConfigs,
         Body: {
            usuarioID: 1,
            listaConfigs: [
               {
                  configID: "PROV_TELEFONO"
               },
               {
                  configID: "TER_REQ_REPLEGAL"
               }
            ]
         }
      }).then((respuesta) => {
         if (respuesta != null && respuesta.ok == true) {
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

   const onClickSubmit = async (data: any) => {

      let PropsDefaultRequestConfigs = {
         API: "CUENTASPORPAGAR",
         URLServicio: "/AdministracionTerceros/CrearTerceroFicha",
         Type: "POST"
      };

      console.log(data)

      await CrearPeticion({
         ...PropsDefaultRequestConfigs,
         Body: {
            usuarioID: 1,
            terEstado: true,
            ...data
         }
      }).then((response) => {
         if(response != null && response.ok)
            alert("Tercero creado con exito")
      }).catch((error) => {
         console.log(error)
      })

   };

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
                           <Controller
                              control={control}
                              name="terTipoPersona"
                              defaultValue=""
                              render={({ field: { onChange, value } }) => (
                                 <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="terTipoPersona"
                                    onChange={onChange}
                                 >
                                    <FormControlLabel checked={value == 'N'} value={'N'} control={<Radio />} label="Natural" />
                                    <FormControlLabel checked={value == 'J'} value={'J'} control={<Radio />} label="Jurídica" />
                                 </RadioGroup>
                              )}
                           />
                        </FormControl>
                     </Stack>

                     {
                        terTipoPersona == 'N' ?
                           <TipoPersonaNaturalCampos propsInputs={propsInputs} /> :
                           <Stack direction="row" gap={1.5}>
                              <Controller
                                 control={metodos.control}
                                 name="terRazonSocial"
                                 render={({ field, formState: { errors } }) => (
                                    <TextField
                                       {...field}
                                       {...propsInputs}
                                       type="text"
                                       fullWidth
                                       label="Razón Social"
                                       error={!!errors.terRazonSocial}
                                       helperText={errors.terRazonSocial && `${errors.terRazonSocial.message}`}
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
                                 name="terNumeroIndentificaion"
                                 render={({ field, formState: { errors } }) => (
                                    <TextField
                                       {...propsInputs}
                                       {...field}
                                       id="terNumeroIndentificaion"
                                       label="Número de identificación"
                                       type="text"
                                       error={!!errors.terNumeroIndentificaion}
                                       helperText={errors.terNumeroIndentificaion && `${errors.terNumeroIndentificaion.message}`}
                                       sx={{
                                          width: "60%",
                                          fontSize: 10
                                       }}

                                    />
                                 )}
                              />
                              <Controller
                                 control={control}
                                 name="terDigitoV"
                                 render={({ field, formState: { errors } }) => (
                                    <TextField
                                       {...field}
                                       {...propsInputs}
                                       id="terDigitoV"
                                       label="DV"
                                       type="text"
                                       error={!!errors.terDigitoV}
                                       helperText={errors.terDigitoV && `${errors.terDigitoV.message}`}
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
                              name="terCiudad"
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="Ciudad"
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

                        <Stack direction="row" width="50%" gap={1} alignItems="center">

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

                           <AddLocationAltOutlinedIcon onClick={VerFormularioDirecciones} color='secondary' sx={{ cursor: "pointer" }} />
                           {
                              verModalDireccion == true &&
                              <FormularioDirecciones estado={verModalDireccion} cambiarEstado={VerFormularioDirecciones} />
                           }
                        </Stack>
                     </Stack>
                     <Stack direction="row" gap={1.5}>
                        <Controller
                           control={control}
                           name="terTelefono"
                           render={({ field, formState: { errors } }) => (
                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 id="terTelefono"
                                 label="Télefono fijo"
                                 error={!!errors.terTelefono}
                                 helperText={errors.terTelefono && `${errors.terTelefono.message}`}
                              />
                           )}
                        />
                        <Controller
                           control={control}
                           name="terCelular"
                           render={({ field, formState: { errors } }) => (

                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 id="terCelular"
                                 label="Celular"
                                 error={!!errors.terCelular}
                                 helperText={errors.terCelular && `${errors.terCelular.message}`}
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
                           name="terContactoPrincipalNombre"
                           render={({ field, formState: { errors } }) => (

                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 id="terContactoPrincipalNombre"
                                 label="Nombre"
                                 error={!!errors.terContactoPrincipalNombre}
                                 helperText={errors.terContactoPrincipalNombre && `${errors.terContactoPrincipalNombre.message}`}
                              />
                           )}
                        />
                        <Controller
                           control={control}
                           name="terContactoPrincipalEmail"
                           render={({ field, formState: { errors } }) => (

                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 id="terContactoPrincipalEmail"
                                 label="Email"
                                 error={!!errors.terContactoPrincipalEmail}
                                 helperText={errors.terContactoPrincipalEmail && `${errors.terContactoPrincipalEmail.message}`}
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
