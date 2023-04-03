// Componentes Material UI y react
import { Alert, AlertTitle, Card, Chip, FormControl, FormControlLabel, FormGroup, IconButton, MenuItem, Radio, RadioGroup, Stack, Switch, TextField, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

// Contextos
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';
import { CrearPeticion, CrearPeticionAxios } from '../../../../../Consumos/APIManager';

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
import { IActividadesEconomicas } from '../../../Interfaces/Generales/IActividadesEconomicas';
import { EsquemaEditarTercero } from '../../../EsquemasValidacion/CrearEditarTerceroSchema/EsquemaEditarTercero';
import IConfigValues from '../../../Interfaces/Generales/IConfig';
import { SendRequest } from '../../../../../Consumos/Request';

export default function EditarInformacionGeneral() {

   const { state: InfoTercero } = useLocation();
   const { propsTercerosContexto }: { propsTercerosContexto: PropsTerceroContexto } = useContext<any>(TercerosContexto);
   const [verModalDireccion, setVerModalDireccion] = useState(false);
   const [ListaFormaDePago, setListaFormaDePago] = useState<Array<IFormaPago>>([]);
   const [ListaActividadesEconomicas, setListaActividadesEconomicas] = useState<Array<IActividadesEconomicas>>([])
   const [ListaTipoTercero, setListaTipoTercero] = useState<Array<ITipoTercero>>([]);
   const [ListaSubTiposTercero, setListaSubTiposTercero] = useState<Array<ISubTipoTercero>>([]);
   const [ListaTipoDocumento, setListaTipoDocumento] = useState<Array<ITipoDocumento>>([]);
   const [ListaCiudades, setListaCiudades] = useState<Array<ICiudad>>([]);

   const [Configs, setConfigs] = useState<any>()

   const PROV_TELEFONO: IConfigValues = Configs && Configs["PROV_TELEFONO"];
   const TER_VALIDA_DV: IConfigValues = Configs && Configs["TER_VALIDA_DV"];
   const TER_NOCALCULAR_DV: IConfigValues = Configs && Configs["TER_NOCALCULAR_DV"];
   const TER_FICHA_APIROS: IConfigValues = Configs && Configs["TER_FICHA_APIROS"];
   const TER_PERMITECARACTER: IConfigValues = Configs && Configs["TER_PERMITECARACTER"];
   const TER_LONG_DV: IConfigValues = Configs && Configs["TER_LONG_DV"];
   const TER_CAMBIANATJUR: IConfigValues = Configs && Configs["TER_CAMBIANATJUR"];
   const TER_EDIT_DIR_TXT: IConfigValues = Configs && Configs["TER_EDIT_DIR_TXT"];
   const PROV_CORREO_CTO: IConfigValues = Configs && Configs["PROV_CORREO_CTO"];
   const PROV_CORREO_RLEGAL: IConfigValues = Configs && Configs["PROV_CORREO_RLEGAL"]
   const TER_REQ_REPLEGAL: IConfigValues = Configs && Configs["TER_REQ_REPLEGAL"];
   const TER_REQ_ACTIVECON: IConfigValues = Configs && Configs["TER_REQ_ACTIVECON"];
   const TER_BLOQUEA_DIR: IConfigValues = Configs && Configs["TER_BLOQUEA_DIR"];

   const metodos = useForm({
      defaultValues: {
         terNatJur: "",
         terRazonSocial: "",
         terPrimerNombre: "",
         terSegundoNombre: "",
         terPrimerApellido: "",
         terSegundoApellido: "",
         terTipoDocumento: "",
         terNumeroIdentificacion: "",
         terDigitoV: "",
         terFormaPago: "",
         terCiudad: "",
         terDireccion: "",
         terTipo: "",
         terSubTipo: "",
         terActividadEconomica: "",
         terEmail: "",
         terTelefono: "",
         terCelular: "",
         terObservaciones: "",
         terContactoPrincipalNombre: "",
         terContactoPrincipalEmail: "",
         terRepresentanteLNombre: "",
         terRepresentanteLTipoIdentificacion: "",
         terRepresentanteLIdentificacion: "",
         terRepresentanteLExpedicion: "",
         terRepresentanteLEmail: "",
         terEstado:false
      },
      resolver: yupResolver(EsquemaEditarTercero({
         TER_NOCALCULAR_DV,
         PROV_TELEFONO,
         TER_REQ_REPLEGAL,
         TER_FICHA_APIROS,
         PROV_CORREO_CTO,
         TER_PERMITECARACTER,
         TER_CAMBIANATJUR,
         PROV_CORREO_RLEGAL,
         TER_REQ_ACTIVECON
      })),
      mode: 'onSubmit',
   })

   const { control, handleSubmit, watch, setValue, getValues, trigger } = metodos
   const terNatJur = watch("terNatJur")
   const terTipoDocumento = watch("terTipoDocumento")

   const navigate = useNavigate();

   const PermiteCambiarNaturaleza = () => {
      const tiposDocumentosPermitidos = TER_CAMBIANATJUR?.configObs.split(',') || []
      const tipoDocumentoActual = getValues('terTipoDocumento')
      const tipoPermitido = tiposDocumentosPermitidos.includes(tipoDocumentoActual) ? true : false

      if (!tipoPermitido) {
         let terNatJurActual = getValues('terNatJur')
         
         if(terNatJurActual != 'N')
            setValue('terNatJur', 'N')
      }

      return tipoPermitido
   }

   const propsInputs: Record<string, any> = {
      variant: "outlined",
      size: 'small',
      fullWidth: true,
   };

   const GuardarInformacion = async (data: any) => {
      
      SendRequest.put({
         API: "CUENTASPORPAGAR",
         URLServicio: "/AdministracionTerceros/EditarTerceroFicha",
         Body: {
            ...data,
            terId: propsTercerosContexto.TerceroSeleccionadoLista?.TerID,
            terTipoIdentificacion: data.terTipoDocumento,
            terNumeroIdentificacion: data.terNumeroIdentificacion.toString(),
            terTipoTercero: data.terTipo,
            terTipoProveedor: data.terSubTipo,
            terCIIU: data.terActividadEconomica,
            terCorreo: data.terEmail,
            terNombreContactoPrincipal: data.terContactoPrincipalNombre,
            terCorreoContactoPrincipal: data.terContactoPrincipalEmail,
            terNombreRepresentanteLegal: data.terRepresentanteLNombre,
            terIdentificacionRepresentanteLegal: data.terRepresentanteLIdentificacion,
            terLugarExpedicionRepresentanteLegal: data.terRepresentanteLExpedicion,
            terCorreoRepresentanteLegal: data.terRepresentanteLEmail,
            terEstado: (data.terEstado) ? 1 : 0,
         }
      }).then((respuesta) => {
         if (respuesta) {
            if (respuesta.ok) {
               propsTercerosContexto.CambiarAlertas(
                  [1].map(alert => {
                     return <>
                        <Alert
                           key={1}
                           severity="success"
                           onClose={() => propsTercerosContexto.CerrarAlertas()}
                        >
                           <AlertTitle>!Bien hecho!</AlertTitle>
                           El tercero ha sido actualizado con éxito
                        </Alert>
                     </>
                  })
               )
               navigate('InformacionGeneralDatos')

            }
            else if (respuesta.errores && respuesta.errores.length > 0) {
               propsTercerosContexto.CambiarAlertas(
                  respuesta.errores.map(x => {
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
      });
   }

   const CancelarEdicion = () => {
      navigate("InformacionGeneralDatos");
   }

   const VerFormularioDirecciones = () => {
      setVerModalDireccion(!verModalDireccion);
   }

   const ConsultarListas = async () => {
      let PropsDefaultRequest: CrearPeticionAxios = {
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

      // Actividades Económicas
      await CrearPeticion({
         ...PropsDefaultRequest,
         Body: {
            UsuarioID: 1,
            Clave: 'ActividadesEconomicas'
         }
      })
         .then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
               setListaActividadesEconomicas(respuesta.datos);
            }
         });

   }

   const ConsultarConfigs = async () => {
      let PropsDefaultRequestConfigs: CrearPeticionAxios = {
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
                  configID: "PROV_CORREO_CTO"
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
                  configId: "TER_EDIT_DIR_TXT"
               },
               {
                  configID: "TER_BLOQUEA_DIR"
               },
               {
                  configID: "PROV_CORREO_RLEGAL"
               },
               {
                  configID: "TER_REQ_ACTIVECON"
               }
            ]
         }
      }).then((respuesta) => {
         if (respuesta != null) {
            setConfigs(respuesta.datos)
         }
      })
   }

   useEffect(() => {
      if (InfoTercero) {
         setValue('terNatJur', InfoTercero.terTipoPersona || "")
         setValue('terRazonSocial', InfoTercero.terRazonSocial || "")
         setValue('terPrimerNombre', InfoTercero.terPrimerNombre || "")
         setValue('terSegundoNombre', InfoTercero.terSegundoNombre || "")
         setValue('terPrimerApellido', InfoTercero.terPrimerApellido || "")
         setValue('terSegundoApellido', InfoTercero.terSegundoApellido || "")
         setValue('terTipoDocumento', InfoTercero.terTipoIdentificacionId || "")
         setValue('terNumeroIdentificacion', InfoTercero.terNumeroIdentificacion || "")
         setValue('terDigitoV', InfoTercero.terDiv || undefined)
         setValue('terFormaPago', InfoTercero.terFormaPagoId || "")
         setValue('terCiudad', InfoTercero.terCiudadId || "")
         setValue('terDireccion', InfoTercero.terDireccion)
         setValue('terTipo', InfoTercero.terTipoId || "")
         setValue('terSubTipo', InfoTercero.terSubTipoId || "")
         setValue('terActividadEconomica', InfoTercero.terCIIU || "")
         setValue('terEmail', InfoTercero.terEmail || "")
         setValue('terTelefono', InfoTercero.terTelefono || "")
         setValue('terCelular', InfoTercero.terCelular || "")
         setValue('terObservaciones', InfoTercero.terObservaciones || "")
         setValue('terContactoPrincipalNombre', InfoTercero.terContactoPrincipalNombre || "")
         setValue('terContactoPrincipalEmail', InfoTercero.terContactoPrincipalEmail || "")
         setValue('terRepresentanteLNombre', InfoTercero.terRepresentanteLNombre || "")
         setValue('terRepresentanteLTipoIdentificacion', InfoTercero.terRepresentanteLTipoIdentificacionId || "")
         setValue('terRepresentanteLIdentificacion', InfoTercero.terRepresentanteLIdentificacion || "")
         setValue('terRepresentanteLExpedicion', InfoTercero.terRepresentanteLExpedicion || "")
         setValue('terRepresentanteLEmail', InfoTercero.terRepresentanteLEmail || "")
         setValue('terEstado', InfoTercero.terEstado || false)
      }
   }, []);

   useEffect(() => {
      ConsultarListas();
      ConsultarConfigs();
   }, [])

   useEffect(() => {
      PermiteCambiarNaturaleza();
   }, [terNatJur, terTipoDocumento])

   return (
      <>
         <FormProvider {...metodos}>
            <Stack direction="column" width="100%" gap={1} overflow={'scroll'}>
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
                                 name="terNatJur"
                                 render={({ field: { onChange, value } }) => (
                                    <RadioGroup
                                       value={value}
                                       onChange={(e) => onChange(e.target.value)}
                                       row
                                       aria-labelledby="demo-row-radio-buttons-group-label"
                                       name="terTipoPersona"
                                    >
                                       <FormControlLabel value={'N'} control={<Radio />} label="Natural" />
                                       <FormControlLabel value={'J'} disabled={!PermiteCambiarNaturaleza()} control={<Radio />} label="Jurídica" />
                                    </RadioGroup>
                                 )}
                              />
                           </FormControl>
                        </Stack>

                        <FormGroup>
                           <Controller
                              control={control}
                              name="terEstado"
                              defaultValue={false}
                              render={({ field: { onChange, value } }) => (
                                 <FormControlLabel
                                    control={<Switch checked={value} onChange={(e) => onChange(e.target.checked)} />}
                                    label="Activo"
                                 />
                              )}
                           />
                        </FormGroup>
                     </Stack>

                     {
                        terNatJur == 'J' ?
                           <_SeccionRazonSocial /> :
                           <_SeccionNombresTercero />
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
                                 render={({ field, formState: { errors, dirtyFields } }) => (
                                    <TextField
                                       {...field}
                                       onChange={(e) => field.onChange(
                                          e.target.value,
                                          dirtyFields.terTipoDocumento && trigger("terDigitoV")
                                       )}
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
                                    InputProps={{
                                       readOnly: true
                                    }}
                                    inputProps={{
                                       maxLength: TER_LONG_DV?.configValor
                                    }}
                                 />
                              )}
                           />

                           <Controller
                              control={control}
                              name="terDigitoV"
                              render={({ field, formState: { errors } }) => (
                                 <Tooltip title={errors.terDigitoV && `${errors.terDigitoV.message}`} placement="top" arrow>
                                    <TextField
                                       {...field}
                                       {...propsInputs}
                                       id="terDigitoV"
                                       label="DV"
                                       type="text"
                                       error={!!errors.terDigitoV}
                                       InputProps={{
                                          readOnly: (TER_NOCALCULAR_DV?.configValor == 1) ? false : true,
                                       }}
                                       inputProps={{
                                          maxLength: TER_LONG_DV?.configValor
                                       }}
                                       sx={{
                                          width: "20%"
                                       }}
                                    />
                                 </Tooltip>
                              )}
                           />
                        </Stack>

                        <FormControl sx={{ width: "50%" }}>
                           <Controller
                              control={control}
                              name="terFormaPago"
                              defaultValue=""
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="terFormaPago"
                                    label="Forma de Pago"
                                    size='small'
                                    placeholder='Seleccione'
                                    select
                                    required
                                    error={!!errors.terFormaPago}
                                    helperText={errors.terFormaPago && `${errors.terFormaPago.message}`}
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
                              defaultValue=""
                              render={({ field, formState: { errors } }) => (
                                 <TextField
                                    {...field}
                                    id="terCiudad"
                                    label="Ciudad"
                                    size='small'
                                    select
                                    type="text"
                                    placeholder='Ciudad'
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
                                    inputProps={{
                                       readOnly: TER_EDIT_DIR_TXT?.configValor ? false : true
                                    }}
                                 />
                              )}
                           />

                           <IconButton onClick={VerFormularioDirecciones} size='small' sx={{ cursor: "pointer" }} >
                              <Edit fontSize='small' />
                           </IconButton>
                           {
                              verModalDireccion == true &&
                              <_SeccionDireccionTercero
                                 estado={verModalDireccion}
                                 cambiarEstado={VerFormularioDirecciones}
                                 configs={{ TER_BLOQUEA_DIR }}
                              />
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
                              defaultValue=""
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
                              defaultValue=""
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
                              defaultValue=''
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

                                    {
                                       ListaActividadesEconomicas.map(data => {
                                          return <MenuItem key={data.CIICod} value={data.CIICod}>{data.CIIDesc}</MenuItem>
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
                           <Controller
                              control={control}
                              name='terTelefono'
                              render={({ field, formState: { errors } }) => (

                                 <TextField
                                    {...field}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    id="terTelefono"
                                    label='Teléfono'
                                    required={PROV_TELEFONO?.configValor ? true : false}
                                    error={!!errors.terTelefono}
                                    helperText={errors.terTelefono && `${errors.terTelefono.message}`}
                                 />
                              )}
                           />

                           <Stack direction={"row"} gap={1.5} >
                              <Chip size='small' label='Número1' />
                              <Chip size='small' label='Número2' />

                           </Stack>
                        </Stack>

                        <Stack direction={"column"} gap={.5} width="50%">
                           <Controller
                              control={control}
                              name='terCelular'
                              render={({ field, formState: { errors } }) => (

                                 <TextField
                                    {...field}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    id="terCelular"
                                    label="Celular"
                                    required={PROV_TELEFONO?.configValor ? true: false}
                                    error={!!errors.terCelular}
                                    helperText={errors.terCelular && `${errors.terCelular.message}`}
                                 />
                              )}
                           />

                           <Stack direction={"row"} gap={1.5} >
                              <Chip size='small' label='Número1' />
                              <Chip size='small' label='Número2' />

                           </Stack>
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
                     <_SeccionContactoTercero configs={{ PROV_CORREO_CTO }} />
                  </Stack>
                  <ContenedorBotonesEditarInfo
                     MetodoGuardar={handleSubmit(GuardarInformacion)}
                     MetodoCancelar={CancelarEdicion}
                  />
               </Card>

               <Card sx={{ backgroundColor: "white", width: "100%" }}>
                  <Stack direction={"column"} p={2} gap={1}>
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
                                 required={TER_REQ_REPLEGAL?.configValor ? true : false}
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
                                 name='terRepresentanteLTipoIdentificacion'
                                 render={({ field, formState: { errors } }) => (
                                    <TextField
                                       {...field}
                                       id="terRepresentanteLTipoIdentificacion"
                                       label="Tipo de ID"
                                       size='small'
                                       select
                                       required={TER_REQ_REPLEGAL?.configValor ? true : false}
                                       error={!!errors.terRepresentanteLTipoIdentificacion}
                                       helperText={errors.terRepresentanteLTipoIdentificacion && `${errors.terRepresentanteLTipoIdentificacion.message}`}
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
                              name='terRepresentanteLIdentificacion'
                              defaultValue=""
                              render={({ field, formState: { errors } }) => (

                                 <TextField
                                    {...propsInputs}
                                    {...field}
                                    id="terRepresentanteLIdentificacion"
                                    label="Número de identificación"
                                    type={"number"}
                                    required={TER_REQ_REPLEGAL?.configValor ? true : false}
                                    error={!!errors.terRepresentanteLIdentificacion}
                                    helperText={errors.terRepresentanteLIdentificacion && `${errors.terRepresentanteLIdentificacion.message}`}
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
                                 required={TER_REQ_REPLEGAL?.configValor ? true : false}
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
                                 required={(TER_REQ_REPLEGAL?.configValor || PROV_CORREO_RLEGAL?.configValor) ? true : false}
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
         <DevTool control={control} />
      </>
   )
}


