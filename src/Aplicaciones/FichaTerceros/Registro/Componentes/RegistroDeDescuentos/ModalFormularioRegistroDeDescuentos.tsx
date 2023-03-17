import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import IRespuestaGeneral from '../../../../../Consumos/IRespuestaGeneral';
import { SendRequest, SendRequestAxios } from '../../../../../Consumos/Request';
import { DescuentosTerceroContexto } from '../../../Contextos/Registro/Descuentos/DescuentosTerceroContexto';
import { paramsDescuentosTerceroContexto } from '../../../Contextos/Registro/Descuentos/DescuentosTercerosProveedor';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';
import { EsquemaDescuentoTercero } from '../../../EsquemasValidacion/Registro/DescuentosTercero/EsquemaDescuentoTercero';
import ICiudad from '../../../Interfaces/Generales/ICiudad';
import ITiposDescuentos from '../../../Interfaces/Registro/Descuentos/ITiposDescuentos';

export interface FormularioRegistroDeDescuentosProps {
    cambiarEstadoModal:  (estado: boolean) => void,
    consultarDescuentosTercero: () => void
}

const ModalFormularioRegistroDeDescuentos = (ModalFormularioRegistroDeDescuentosProps: FormularioRegistroDeDescuentosProps) => {

    const {
        cambiarEstadoModal,
        consultarDescuentosTercero
    } = ModalFormularioRegistroDeDescuentosProps;
    
    let {
        handleSubmit,
        control,
        setValue
    } = useForm({
        resolver: yupResolver(EsquemaDescuentoTercero)
    });
    
    //Contexto Descuento
    const {parametrosReturnDescuentos}:{parametrosReturnDescuentos:paramsDescuentosTerceroContexto} = useContext<any>(DescuentosTerceroContexto);
    const {
        CambiarDescuentoSeleccionado,
        DescuentoSeleccionado
    } = parametrosReturnDescuentos;

    //Contexto Terceros
    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        TerceroSeleccionadoLista,
        CambiarAlertas
    } = propsTercerosContexto;

    const [ListaTiposDescuento, setListaTiposDescuento] = useState<Array<ITiposDescuentos>>([]);
    const [ListaCiudades, setListaCiudades] = useState<Array<ICiudad>>([]);

    useEffect(() => {
      ConsultarInformacionListas();
    }, [])
    
    useEffect(() => {
        setValue("terDesTipo", DescuentoSeleccionado?.terDesTipo);
        setValue("terDesPlazo", DescuentoSeleccionado?.terDesPlazo);
        setValue("terDesPorcentaje", DescuentoSeleccionado?.terDesPorcentaje);
        setValue("terDesObs", DescuentoSeleccionado?.terDesObs);
        setValue("terDesCiudad", DescuentoSeleccionado?.terDesCiudad);
    }, [DescuentoSeleccionado]);
    
    const EnviarFormularioDescuento = async (data:any) => {
        if (data) {
            data.terId = TerceroSeleccionadoLista?.TerID;
            let urlServicio = "/DescuentosTercero/CrearDescuentoTercero";
            let respuesta:void | IRespuestaGeneral;
            if (DescuentoSeleccionado) {
                data.terDesId = DescuentoSeleccionado.terDesId;
                respuesta = await SendRequest.put({
                    API: 'CUENTASPORPAGAR',
                    URLServicio: "/DescuentosTercero/ActualizarDescuentoTercero",
                    Body:data
                });
            }else{
                respuesta = await SendRequest.post({
                    API: 'CUENTASPORPAGAR',
                    URLServicio: "/DescuentosTercero/CrearDescuentoTercero",
                    Body:data
                });
            }

            if (respuesta != null && respuesta.ok) {
                cambiarEstadoModal(false);
                consultarDescuentosTercero();
                CambiarAlertas([<Alert severity="success">{respuesta.descripcion}</Alert>]);
            }
        }
    }

    const ConsultarInformacionListas = ()=> {
        let parametrosEnvioAPI:SendRequestAxios = {
            API: 'CONFIGURACION',
            URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
        };

        SendRequest.get({
            ...parametrosEnvioAPI,
            Body:{
                Clave: "TiposDescuentoTercero"
            }
        }).then((respuesta)=> {
            if (respuesta && respuesta.ok) {
                setListaTiposDescuento(respuesta.datos);
            }
        });

        SendRequest.get({
            ...parametrosEnvioAPI,
            Body:{
                Clave: "Ciudades"
            }
        }).then((respuesta)=> {
            if (respuesta && respuesta.ok) {
                setListaCiudades(respuesta.datos);
            }
        });
    }

    return (
        <Dialog 
            open={true}
            onClose={() => cambiarEstadoModal(false)}
            fullWidth
        >
            <DialogTitle>
                <Typography variant='h6'>
                    {
                        DescuentoSeleccionado ? "Editar descuento" : "Nuevo descuento"
                    }
                </Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit(EnviarFormularioDescuento)}>
                <Stack direction="column" py={1} px={3} gap={1.5}>
                    <Stack direction="row" gap={.5}>
                        <FormControl size="small" fullWidth>
                            <Controller
                                name={"terDesTipo"}
                                control={control}
                                render={({field: { onChange, value }, fieldState: {error}}) => (

                                    <TextField 
                                        onChange={onChange}
                                        value={value}
                                        placeholder="Seleccione una opción"
                                        variant="outlined"
                                        size="small"
                                        id="selectDescuento"
                                        label="Descuentos"
                                        select
                                    >
                                        {
                                            ListaTiposDescuento.map(td => 
                                                <MenuItem key={td.Id} value={td.Id}>{td.Descuento}</MenuItem>
                                            )
                                        }
                                    </TextField>
                                )}
                            />

                        </FormControl>

                        <Controller
                            name={"terDesPlazo"}
                            control={control}
                            render={({field, fieldState: {error}}) => (
                                <TextField 
                                    {...field}
                                    sx={{width:"25%"}}
                                    variant="outlined" 
                                    size="small" 
                                    label="Plazo (Días)"
                                >
                                </TextField>
                            )}
                        />

                        <Controller
                            name={"terDesPorcentaje"}
                            control={control}
                            render={({field, fieldState: {error}}) => (
                                <TextField 
                                    {...field}
                                    variant="outlined" 
                                    size="small" 
                                    id="select" 
                                    label="%" 
                                    sx={{ width: "10%" }}
                                >
                                </TextField>
                            )}
                        />

                        
                    </Stack>
                    <Stack>
                        <FormControl size="small" fullWidth>
                            <Controller
                                name={"terDesCiudad"}
                                control={control}
                                render={({field: { onChange, value }, fieldState: {error}}) => (

                                    <TextField 
                                        onChange={onChange}
                                        value={value}
                                        placeholder="Seleccione una opción"
                                        variant="outlined"
                                        size="small"
                                        label="Ciudad" 
                                        select
                                    >
                                        {
                                            ListaCiudades.map(ciu => 
                                                 <MenuItem key={ciu.CiuID} value={ciu.CiuID}>{ciu.CiuNombre}</MenuItem>
                                            )
                                        }
                                    </TextField>
                                )}
                            />
                        </FormControl>
                    </Stack>
                    <Stack>
                        <Controller
                            name={"terDesObs"}
                            control={control}
                            render={({field: { onChange, value }, fieldState: {error}}) => (
                                <TextField 
                                    onChange={onChange}
                                    value={value}
                                    label="Observaciones" 
                                    rows={5} 
                                    multiline
                                >
                                </TextField>
                            )}
                        />
                    </Stack>
                </Stack>
                <DialogActions>
                    <Stack direction="row" gap={1}>
                        <Button size='medium' variant="text" onClick={() => cambiarEstadoModal(false)}>
                            Cancelar
                        </Button>

                        <Button
                            size='medium'
                            variant="contained"
                            onClick={handleSubmit(EnviarFormularioDescuento)}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </DialogActions>
            </form>
        </Dialog>

    )
}

export default ModalFormularioRegistroDeDescuentos