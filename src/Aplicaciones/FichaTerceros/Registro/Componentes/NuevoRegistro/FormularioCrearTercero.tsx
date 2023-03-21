import { Alert, AlertTitle, Button, Card, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'

import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from 'react-router-dom';
import { DevTool } from "@hookform/devtools";

// Contextos
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { CrearPeticion, CrearPeticionAxios } from '../../../../../Consumos/APIManager';

// Interfaces
import ICiudad from '../../../Interfaces/Generales/ICiudad';
import ITipoTercero from '../../../Interfaces/Generales/ITipoTercero';
import ITipoDocumento from '../../../Interfaces/Generales/ITipoDocumento';
import IConfigValues from '../../../Interfaces/Generales/IConfig';

// Iconos
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { Save } from '@mui/icons-material';

// Componentes
import { schemaTercero } from '../../../EsquemasValidacion/CrearEditarTerceroSchema/SchemaTercero';
import _SeccionRazonSocial from './_SeccionRazonSocial'
import _SeccionNombreTercero from './_SeccionNombresTercero';
import _SeccionDireccionTercero from './_SeccionDireccionTercero';
import _SeccionNombresTercero from './_SeccionNombresTercero';
import _SeccionContactoTercero from './_SeccionContactoTercero';

export interface ITercero {
   terCelular: string,
   terCiudad: string,
   terContactoPrincipalEmail: string,
   terContactoPrincipalNombre: string,
   terDigitoV: string,
   terDireccion: string,
   terNumeroIdentificacion: string,
   terPrimerApellido: string,
   terPrimerNombre: string,
   terRazonSocial: string,
   terSegundoApellido: string,
   terSegundoNombre: string,
   terTelefono: string,
   terTipo: string,
   terTipoDocumento: string,
   terNatJur: string,
}

export default function FormularioCrearTercero() {

   const { propsTercerosContexto }: { propsTercerosContexto: any } = useContext<any>(TercerosContexto);
   const [verModalDireccion, setVerModalDireccion] = useState(false);
   const [ListaTipoTercero, setListaTipoTercero] = useState<Array<ITipoTercero>>([]);
   const [ListaTipoDocumento, setListaTipoDocumento] = useState<Array<ITipoDocumento>>([]);
   const [ListaCiudades, setListaCiudades] = useState<Array<ICiudad>>([]);
   const [Configs, setConfigs] = useState<any>()

   const PROV_TELEFONO: IConfigValues = Configs && Configs["PROV_TELEFONO"]
   const TER_REQ_REPLEGAL: IConfigValues = Configs && Configs["TER_REQ_REPLEGAL"]
   const TER_VALIDA_DV: IConfigValues = Configs && Configs["TER_VALIDA_DV"]
   const TER_NOCALCULAR_DV: IConfigValues = Configs && Configs["TER_NOCALCULAR_DV"]
   const TER_FICHA_APIROS: IConfigValues = Configs && Configs["TER_FICHA_APIROS"]
   const TER_PERMITECARACTER: IConfigValues = Configs && Configs["TER_PERMITECARACTER"]
   const TER_LONG_DV: IConfigValues = Configs && Configs["TER_LONG_DV"]
   const TER_CAMBIANATJUR: IConfigValues = Configs && Configs["TER_CAMBIANATJUR"]
   const TER_BLOQUEA_DIR: IConfigValues = Configs && Configs["TER_BLOQUEA_DIR"];
   const PROV_CORREO_CTO: IConfigValues = Configs && Configs["PROV_CORREO_CTO"]
   const PROV_CORREO_RLEGAL: IConfigValues = Configs && Configs["PROV_CORREO_RLEGAL"]
   const TER_EDIT_DIR_TXT: IConfigValues = Configs && Configs["TER_EDIT_DIR_TXT"]
   const TER_INACTIVO: IConfigValues = Configs && Configs["TER_INACTIVO"]

   const metodos = useForm({
      defaultValues: {
         terNatJur: "",
         terRazonSocial: "",
         terPrimerNombre: "Cristian",
         terSegundoNombre: "Camilo",
         terPrimerApellido: "Pérez",
         terSegundoApellido: "Sandoval",
         terTipoDocumento: "CC",
         terNumeroIdentificacion: "583655",
         terDigitoV: "1",
         terTipo: "2",
         terCiudad: "25",
         terDireccion: "calle 2 ",
         terTelefono: "21",
         terCelular: "665665",
         terContactoPrincipalNombre: "Cristian",
         terContactoPrincipalEmail: "cristian@sdsd.com"
      },
      resolver: yupResolver(schemaTercero({
         TER_NOCALCULAR_DV,
         PROV_TELEFONO,
         TER_REQ_REPLEGAL,
         TER_FICHA_APIROS,
         TER_PERMITECARACTER,
         TER_CAMBIANATJUR,
         PROV_CORREO_CTO,
         PROV_CORREO_RLEGAL
      }
      )),
      mode: 'onChange',
      reValidateMode: 'onChange'
   })

   const { control, handleSubmit, watch, getValues } = metodos
   const terNatJur = watch("terNatJur")
   const terTipoDocumento = watch("terTipoDocumento")
   const navigate = useNavigate()

   const PermiteCambiarNaturaleza = () => {
      const tiposDocumentosPermitidos = TER_CAMBIANATJUR?.configObs.split(',') || []
      const tipoDocumentoActual = getValues('terTipoDocumento')
      const esPermitido = tiposDocumentosPermitidos.includes(tipoDocumentoActual) ? false : true
      
      return esPermitido
   }

   const VerFormularioDirecciones = () => {
      setVerModalDireccion(!verModalDireccion);
   }
   
   const propsInputs: Record<string, any> = {
      variant: "outlined",
      size: 'small',
      fullWidth: true,
   };

   const ConsultarConfigs = async () => {
      let PropsDefaultRequestConfigs:CrearPeticionAxios = {
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
               },
               {
                  configID: "TER_VALIDA_DV"
               },
               {
                  configID: "TER_NOCALCULAR_DV"
               },
               {
                  configID: "TER_FICHA_APIROS"
               },
               {
                  configID: "TER_PERMITECARACTER"
               },
               {
                  configID: "TER_LONG_DV"
               },
               {
                  configID: "TER_CAMBIANATJUR"
               },
               {
                  configID: "TER_BLOQUEA_DIR"
               },
               {
                  configID: "PROV_CORREO_CTO"
               },   
               {
                  configID: "PROV_CORREO_RLEGAL"
               },
               {
                  configID: "TER_EDIT_DIR_TXT"
               },
               {
                  configID: "TER_INACTIVO"
               }  
            ]
         }
      }).then((respuesta) => {
         if (respuesta != null) {
            setConfigs(respuesta.datos)
         }
      })
   }

   const ConsultarListas = async () => {
      let PropsDefaultRequest:CrearPeticionAxios = {
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
   
   const onClickSubmit = async (data: ITercero) => {

      let PropsDefaultRequestConfigs:CrearPeticionAxios = {
         API: "CUENTASPORPAGAR",
         URLServicio: "/AdministracionTerceros/CrearTerceroFicha",
         Type: "POST"
      };
      
      data.terCelular = data.terCelular && data.terCelular.toString();
      data.terTelefono = data.terCelular && data.terTelefono.toString();
      data.terNumeroIdentificacion = data.terNumeroIdentificacion && data.terNumeroIdentificacion.toString();
      
      await CrearPeticion({
         ...PropsDefaultRequestConfigs,
         Body: {
            usuarioID: 1,
            terEstado: TER_INACTIVO?.configValor ? false : true,
            ...data
         }
      }).then((response) => {
         
         if (response != null) {
            if (response.ok) {
               propsTercerosContexto.CambiarAlertas(
                  [1].map(alert => {
                     return <>
                        <Alert
                           key={1}
                           severity="success"
                           onClose={() => propsTercerosContexto.CerrarAlertas()}
                        >
                           <AlertTitle>!Bien hecho!</AlertTitle>
                           El tercero ha sido creado con éxito
                        </Alert>
                     </>
                  })
               )
               navigate('InformacionGeneralDatos')

            }
            else if (response.errores && response.errores.length > 0) {
               propsTercerosContexto.CambiarAlertas(
                  response.errores.map(x => {
                     return <>
                        <Alert
                           key={x.descripcion}
                           severity="warning"
                           onClose={() => propsTercerosContexto.CerrarAlertas()}
                           >
                           <AlertTitle>Error</AlertTitle>
                           {x.descripcion}
                        </Alert>
                     </>;
                  })
               );
            }
         }
      })
   };

   useEffect(() => {
      propsTercerosContexto.CambiarTituloPageHeader("Creación de tercero");
      ConsultarListas();
      ConsultarConfigs();
   }, [])

   useEffect(() => {
      PermiteCambiarNaturaleza();
   }, [terNatJur, terTipoDocumento])

   return (
      <>
         <FormProvider {...metodos}>
            <Stack direction="column" gap={1} paddingY={3} marginBottom={8} alignItems="center" width={"100%"}>
               <Card style={{ backgroundColor: "white", width: "60%" }}>
                  <Stack padding={3} gap={1}>
                     {/* Tipo de persona */}
                     <Stack direction="column">
                        <FormControl>
                           <Typography variant='caption' color="text.secondary" fontWeight={400}>
                              * Tipo de persona
                           </Typography>
                           <Controller
                              control={control}
                              name="terNatJur"
                              defaultValue=""
                              render={({ field: { onChange, value }, formState:{errors} }) => (
                                 <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="terNatJur"
                                    onChange={onChange}
                                    
                                 >
                                    <FormControlLabel checked={value == 'N'} value={'N'} control={<Radio />} label="Natural" />
                                    <FormControlLabel checked={value == 'J'} disabled={PermiteCambiarNaturaleza()} value={'J'} control={<Radio />} label="Jurídica" />
                                 </RadioGroup>
                              )}
                           />
                        </FormControl>
                     </Stack>

                     {
                        terNatJur == 'J' ?
                        <_SeccionRazonSocial />:
                        <_SeccionNombresTercero /> 
                     }


                     {/* Tipo Doc, Numero Ident, DV y Tipo */}
                     <Stack direction="row" gap={.5}>
                        <Stack width="50%" direction="column">
                           <Stack direction="row" gap={.5}>
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
                                       InputProps={{
                                          readOnly: (TER_NOCALCULAR_DV?.configValor == 1) ? false: true,
                                       }}
                                       inputProps={{
                                          maxLength: TER_LONG_DV?.configValor
                                       }}
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
                                    inputProps={{
                                       readOnly: TER_EDIT_DIR_TXT?.configValor ? false: true
                                    }}
                                 />
                              )}
                           />

                           <AddLocationAltOutlinedIcon onClick={VerFormularioDirecciones} color='secondary' sx={{ cursor: "pointer" }} />
                           {
                              verModalDireccion == true &&
                              <_SeccionDireccionTercero 
                                 estado={verModalDireccion} 
                                 cambiarEstado={VerFormularioDirecciones} 
                                 configs={{TER_BLOQUEA_DIR}}
                              />
                           }
                        </Stack>
                     </Stack>
                     <Stack direction="row" gap={.5}>
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

                     <_SeccionContactoTercero />

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
