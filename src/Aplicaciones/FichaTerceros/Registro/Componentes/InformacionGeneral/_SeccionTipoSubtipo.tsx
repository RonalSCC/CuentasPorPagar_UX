import { Stack, FormControl, TextField, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CrearPeticionAxios, CrearPeticion } from '../../../../../Consumos/APIManager'
import ITipoTercero from '../../../Interfaces/Generales/ITipoTercero'
import ISubTipoTercero from '../../../Interfaces/Generales/ISubTipoTercero'
import IConfigValues from '../../../Interfaces/Generales/IConfig'

const _SeccionTipoSubtipo = () => {

    const {control} = useFormContext()

    const [ListaTipoTercero, setListaTipoTercero] = useState<Array<ITipoTercero>>([]);
    const [ListaSubTiposTercero, setListaSubTiposTercero] = useState<Array<ISubTipoTercero>>([]);

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
     }

     useEffect(() => {
        ConsultarListas();
     },[])

    return (
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
    )
}

export default _SeccionTipoSubtipo