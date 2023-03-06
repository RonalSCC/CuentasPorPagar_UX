import { Alert, AlertTitle, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { CrearPeticion } from '../../../../../Consumos/APIManager';
import ICiudad from '../../../Interfaces/Generales/ICiudad';
import { ITipoContactos } from '../../../Interfaces/Generales/ITipoContactos';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from '@hookform/devtools';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { IContacto } from './Contactos';
import { useNavigate } from 'react-router-dom';
import IConfigValues from '../../../Interfaces/Generales/IConfig';

export interface FormularioContactoProps {
   estado: boolean,
   cambiarEstado: Function,
   contact?: IContacto,
}

const FormularioContacto = ({ estado, cambiarEstado, contact }: FormularioContactoProps) => {

   const { propsTercerosContexto }: { propsTercerosContexto: any } = useContext<any>(TercerosContexto);
   const [ListaCiudades, setListaCiudades] = useState<Array<ICiudad>>([]);
   const [ListaTipoContactos, setListaTipoContactos] = useState<Array<ITipoContactos>>([]);
   const [Configs, setConfigs] = useState<any>()

   const OCULTA_CHECK_CPRIN:IConfigValues = Configs && Configs["OCULTA_CHECK_CPRIN"] || {};
   
   const navigate = useNavigate();

   const schema = Yup.object().shape({
      tcNombre: Yup
         .string()
         .required("El nombre del contacto es obligatorio"),
      tcEmail: Yup
         .string()
         .email("El campo no corresponde a una dirección emal correcta")
         .nullable(),
      tcCelular: Yup.mixed()
         .when({
            is: (tcCelular: string) => tcCelular == "",
            then: Yup.string(),
            otherwise: Yup.number()
               .positive("Solo se acepta números positivos")
               .integer("Solo se acepta números enteros")
               .typeError("Este campo debe ser númerico"),
         }),
      tcTelefono: Yup
         .mixed()
         .when({
            is: (tcTelefono: string) => tcTelefono == "",
            then: Yup.string(),
            otherwise: Yup
               .number()
               .positive("Solo se acepta números positivos")
               .integer("Solo se acepta números enteros")
               .typeError("Este campo debe ser númerico")
         }),
      tcExtension: Yup
      .mixed()
      .when({
         is: (tcExtension: string) => tcExtension == "",
         then: Yup.string(),
         otherwise: Yup.number()
            .positive("Solo se acepta números positivos")
            .integer("Solo se acepta números enteros")
            .typeError("Este campo debe ser númerico"),
      }),
      tcTipoContacto: Yup
         .string()
         .required("Este campo es obligatorio"),
      tcCargo: Yup
         .string(),
      tcCiudad: Yup
         .string()
         .nullable(),
      tcContactoPrincipal: Yup
         .boolean()
   })

   const { control, handleSubmit, reset, setValue } = useForm({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
   });

   const ConsultarListas = async () => {
      let PropsDefaultRequest = {
         API: "CONFIGURACION",
         URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
         Type: "GET"
      };

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

      // ---- Lista Tipo de Contactos
      await CrearPeticion({
         ...PropsDefaultRequest,
         Body: {
            UsuarioID: 1,
            Clave: 'ListaTiposContactos'
         }
      }).then((respuesta) => {
         if (respuesta != null && respuesta.ok == true) {
            setListaTipoContactos(respuesta.datos);
         }
      });
   }

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
                  configID: "OCULTA_CHECK_CPRIN"
               },
            ]
         }
      }).then((respuesta) => {
         if (respuesta != null) {
            setConfigs(respuesta.datos)
         }
      })
   }

   //Eliminar cuando se modifique el API en la creación de tercero (Quitar Tipo y numero de doc)
   const getRandomInt = (min:number, max:number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
   //Eliminar cuando se modifique el API en la creación de tercero (Quitar Tipo y numero de doc)

   const onClickSubmit = async (data: any) => {
      let PropsDefaultRequest = {
         API: "CUENTASPORPAGAR",
         Type: "POST"
      };

      data.tcCelular = data.tcCelular && data.tcCelular.toString();
      data.tcExtension = data.tcExtension && data.tcExtension.toString();
      data.tcTelefono = data.tcTelefono && data.tcTelefono.toString();

      await CrearPeticion({
         ...PropsDefaultRequest,
         URLServicio:
            contact ?
               "/AdministracionTerceros/ActualizarContactoTercero"
               :
               "/AdministracionTerceros/CrearContactoTercero",
         Body: {
            tcId: contact?.conId,
            tcTercero: 5,
            tcTipoDocumento: "CC",//Eliminar cuando se modifique el API en la creación de tercero (Quitar Tipo y numero de doc)
            tcNumeroIdentificacion: getRandomInt(10,100000).toString(), //Eliminar cuando se modifique el API en la creación de tercero (Quitar Tipo y numero de doc)
            ...data
         }
      }).then((response) => {
         if (response != null) {
            if (response.ok) {
               reset();

               propsTercerosContexto.CambiarAlertas(
                  [1].map(alert => {
                     return <>
                        <Alert
                           key={1}
                           severity="success"
                           onClose={() => propsTercerosContexto.CerrarAlertas()}
                        >
                           {(contact) ?
                              "Los cambios han sido guardados con éxito"
                              :
                              "El contacto ha sido creado con éxito"
                           }
                        </Alert>
                     </>
                  })
               )
               cambiarEstado();
               navigate("/FichaTerceros/MarcoTerceros/Contactos", {
                  state: {
                     Reload: true
                  }
               });

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
      ConsultarListas();
      ConsultarConfigs();
   }, [])

   useEffect(() => {
      if (contact != null) {

         // Extrae Extensión del telefono

         const dataTelefono:Array<string> = contact.conTelefono.split(" - ");        

         setValue("tcNombre", contact.conNombre)
         setValue("tcCelular", contact.conCelular)
         setValue("tcTelefono", dataTelefono[0] || "")
         setValue("tcExtension", dataTelefono[1]|| "")
         setValue("tcCiudad", contact.conCiudadId)
         setValue("tcTipoContacto", contact.conTipoId)
         setValue("tcEmail", contact.conEmail)
         setValue("tcContactoPrincipal",contact.conPrincipal)
      }
   }, [])

   const propsInputs: Record<string, any> = {
      variant: "outlined",
      size: 'small',
   };

   return (
      <>
         <Dialog
            open={estado}
            onClose={() => cambiarEstado()}
            fullWidth
         >
            <DialogTitle paddingY={2} paddingX={3}>
               <Typography>{!!contact ? "Editar Contacto" : "Nuevo Contacto"}</Typography>
            </DialogTitle>

            <DialogContent >
               <Stack gap={1.5} direction="column">
                  <Stack direction="row" gap={0.5}>
                     <Controller
                        control={control}
                        name="tcNombre"
                        render={({ field, formState: { errors } }) => (
                           <TextField
                              {...field}
                              {...propsInputs}
                              label="Nombre"
                              fullWidth
                              error={!!errors.tcNombre}
                              helperText={errors.tcNombre && `${errors.tcNombre.message}`}
                           />
                        )}
                     />
                  </Stack>
                  <Stack>
                     <Controller
                        control={control}
                        name="tcEmail"
                        render={({ field, formState: { errors } }) => (
                           <TextField
                              {...field}
                              {...propsInputs}
                              label="Email"
                              name="email"
                              error={!!errors.tcEmail}
                              helperText={errors.tcEmail && `${errors.tcEmail.message}`}
                           />
                        )}
                     />
                  </Stack>
                  <Stack direction="row" gap={0.5}>
                     <Controller
                        control={control}
                        name="tcCelular"
                        render={({ field, formState: { errors } }) => (
                           <TextField
                              {...field}
                              {...propsInputs}
                              label="Celular"
                              fullWidth
                              type="number"
                              error={!!errors.tcCelular}
                              helperText={errors.tcCelular && `${errors.tcCelular.message}`}
                           />
                        )}
                     />
                     <Stack direction="row" gap={0.5} sx={{ width: "100%" }}>
                        <Controller
                           control={control}
                           name="tcTelefono"
                           render={({ field, formState: { errors } }) => (
                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 label="Telefono"
                                 type="number"
                                 error={!!errors.tcCelular}
                                 helperText={errors.tcTelefono && `${errors.tcTelefono.message}`}
                              />
                           )}
                        />
                        <Controller
                           control={control}
                           name="tcExtension"
                           render={({ field, formState: { errors } }) => (
                              <TextField
                                 {...field}
                                 {...propsInputs}
                                 label="Ext"
                                 type="number"
                                 error={!!errors.tcExtension}
                                 helperText={errors.tcExtension && `${errors.tcExtension?.message}`}
                              />
                           )}
                        />
                     </Stack>
                  </Stack>
                  <Stack direction="row" gap={0.5}>
                     <FormControl fullWidth size="small">
                        <Controller
                           control={control}
                           name="tcTipoContacto"
                           defaultValue={null}
                           render={({ field, formState: { errors } }) => (
                              <TextField
                                 {...field}
                                 id="tipo"
                                 label="Tipo"
                                 size='small'
                                 placeholder='Seleccione'
                                 select
                                 error={!!errors.tcTipoContacto}
                                 helperText={errors.tcTipoContacto && `${errors.tcTipoContacto.message}`}
                              >
                                 {
                                    ListaTipoContactos.map(tipo => {
                                       return <MenuItem key={tipo.Codigo} value={tipo.Codigo}>{tipo.Descripcion}</MenuItem>
                                    })
                                 }
                              </TextField>
                           )}
                        />
                     </FormControl>
                     <Controller
                        control={control}
                        name="tcCargo"
                        render={({ field, formState: { errors } }) => (
                           <TextField
                              {...field}
                              {...propsInputs}
                              label="Cargo"
                              fullWidth
                              error={!!errors.tcCargo}
                              helperText={errors.tcCargo && `${errors.tcCargo.message}`}
                           />
                        )}
                     />
                  </Stack>
                  <Stack>
                     <FormControl fullWidth size="small">
                        <Controller
                           control={control}
                           name="tcCiudad"
                           defaultValue={null}
                           render={({ field, formState: { errors } }) => (
                              <TextField
                                 {...field}
                                 id="ciudad"
                                 label="Ciudad"
                                 size='small'
                                 placeholder='Seleccione'
                                 select
                                 error={!!errors.tcCiudad}
                                 helperText={errors.tcCiudad && `${errors.tcCiudad.message}`}
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
                  </Stack>
                  {
                     (OCULTA_CHECK_CPRIN.configValor == 0) &&  // 1: Ocultar el Checkbox de Contacto Principal
                     <Stack px={1}>
                        <FormGroup>
                           <Controller
                              control={control}
                              name="tcContactoPrincipal"
                              render={({ field }) => (
                                 <FormControlLabel
                                    {...field}
                                    control={<Checkbox defaultChecked={contact?.conPrincipal} />}
                                    label="Contacto principal"
                                 />
                              )}
                           />
                        </FormGroup>
                     </Stack>
                     
                  }
               </Stack>
            </DialogContent>

            <DialogActions>
               <Stack direction="row" gap={1} p={1}>
                  <Button size='medium' variant="text" onClick={() => cambiarEstado()}>
                     Cancelar
                  </Button>

                  <Button
                     size='medium'
                     variant="contained"
                     onClick={handleSubmit(onClickSubmit)}
                  >
                     Guardar
                  </Button>
               </Stack>
            </DialogActions>
         </Dialog>
         <DevTool control={control} />
      </>
   )
}

export default FormularioContacto