import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useForm, useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { CrearPeticion, CrearPeticionAxios } from '../../../../../Consumos/APIManager';
import IConfigValues from '../../../Interfaces/Generales/IConfig';

export interface FormularioDireccionesProps {
    estado: boolean,
    cambiarEstado: Function,
    configs: Record<string, IConfigValues>
    SetDireccion:Function
}

export interface IVia {
    AvenidaID: string,
    AvenidaDesc: string
}

export interface IInterseccion {
    InterseccionID: string,
    InterseccionDesc: string
}

export interface IUndIdentidad {
    UndIdentidadID: string,
    UndIdentidadDesc: string
}

export default function _SeccionDireccionTercero({ estado, cambiarEstado, configs, SetDireccion }: FormularioDireccionesProps) {

    const [listaAvenidas, setListaAvenidas] = useState<Array<IVia>>([]);
    const [listaIntersecciones, setListaIntersecciones] = useState<Array<IInterseccion>>([])
    const [listaUndIdentidades, setListaUndIdentidades] = useState<Array<IUndIdentidad>>([])

    const { control, getValues, trigger, setError, formState: { errors }, resetField, watch } = useForm();

    const propsInputs: Record<string, any> = {
        variant: "outlined",
        size: 'small',
        fullWidth: true,
    };

    const ActualizarDireccion = () => {

        const {
            via,
            numeroViaPrincipal,
            interseccionViaPrincipal,
            numeroViaSecundaria,
            interseccionViaSecundaria,
            numeroComplementoViaSecundaria,
            unidadIdentidad1,
            numeroUnidadIdentidad1,
            unidadIdentidad2,
            numeroUnidadIdentidad2,
        } = getValues()

        let error = false

        if (via == "" ) {
            setError("via", { type: "focus", message: "Selecciona" })
            error = true
        }
        if (numeroViaPrincipal == "") {
            setError("numeroViaPrincipal", { type: "focus", message: "Selecciona" })
            error = true
        }
        if (numeroViaSecundaria == "") {
            setError("numeroViaSecundaria", { type: "focus", message: "Selecciona" })
            error = true
        }

        if (error) return

        let dirCompleta

        if (configs["TER_BLOQUEA_DIR"]?.configValor == 0) {

            dirCompleta = via + " " + numeroViaPrincipal + interseccionViaPrincipal

            if (numeroViaSecundaria != "")
                dirCompleta += " # " + numeroViaSecundaria + interseccionViaSecundaria

            if (numeroComplementoViaSecundaria != "")
                dirCompleta += "-" + numeroComplementoViaSecundaria

            if (unidadIdentidad1 != "")
                dirCompleta += " " + unidadIdentidad1 + "-" + numeroUnidadIdentidad1

            if (unidadIdentidad2 != "")
                dirCompleta += " " + unidadIdentidad2 + "-" + numeroUnidadIdentidad2;
        }
        else {
            dirCompleta = via + " " +
                numeroViaPrincipal + " " +
                interseccionViaPrincipal + " " +
                numeroViaSecundaria + " " +
                interseccionViaSecundaria + " " +
                numeroComplementoViaSecundaria + " " +
                unidadIdentidad1 + " " +
                numeroUnidadIdentidad1 + " " +
                unidadIdentidad2 + " " +
                numeroUnidadIdentidad2;
        }

        dirCompleta = dirCompleta.trim();
        dirCompleta = dirCompleta.replace(/^\s+|\s+$|\s+(?=\s)/g, "");

        SetDireccion(dirCompleta);
        trigger("terDireccion")
        cambiarEstado();
    }

    const CerrarDialogoDirecciones = () => {
        
        resetField("via",{defaultValue:""})
        resetField("numeroViaPrincipal",{defaultValue:""})
        resetField("numeroViaSecundaria",{defaultValue:""})
        cambiarEstado()
    }

    const ConsultarListas = async () => {
        let PropsDefaultRequest: CrearPeticionAxios = {
            API: "CONFIGURACION",
            URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
            Type: "GET"
        };

        // ---- Calles
        await CrearPeticion({
            ...PropsDefaultRequest,
            Body: {
                UsuarioID: 1,
                Clave: 'Avenidas'
            }
        }).then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
                setListaAvenidas(respuesta.datos);
            }
        });

        // ---- Avenidas
        await CrearPeticion({
            ...PropsDefaultRequest,
            Body: {
                UsuarioID: 1,
                Clave: 'Intersecciones'
            }
        }).then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
                setListaIntersecciones(respuesta.datos);
            }
        });

        // ---- UnidadesIdentidad
        await CrearPeticion({
            ...PropsDefaultRequest,
            Body: {
                UsuarioID: 1,
                Clave: 'UnidadesIdentidad'
            }
        }).then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
                setListaUndIdentidades(respuesta.datos);
            }
        });
    }

    useEffect(() => {
        ConsultarListas();
    }, [])


    useEffect(() => {
        const subscription = watch(() => {
            trigger(['via','numeroViaPrincipal','numeroViaSecundaria'])
        })

    },[])

    return (
        <>
            <Dialog
                open={estado}
                onClose={() => CerrarDialogoDirecciones()}
                fullWidth
            >
                <DialogTitle paddingY={2} paddingX={3}>
                    Ubicación
                </DialogTitle>
                <DialogContent>
                    <Stack gap={1} paddingY={0.5}>
                        <Typography variant='subtitle2' color="primary.main">
                            Vía principal
                        </Typography>
                        <Stack direction="row" gap={0.5}>
                            <Controller
                                control={control}
                                name="via"
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="via"
                                        label="Via"
                                        size='small'
                                        select
                                        required
                                        placeholder='Seleccione'
                                        error={!!errors.via}
                                        helperText={errors.via && `${errors.via.message}`}
                                    >
                                        {
                                            listaAvenidas.map(av => <MenuItem key={av.AvenidaID} value={av.AvenidaID}>{av.AvenidaDesc}</MenuItem>)
                                        }
                                    </TextField>
                                )}
                            />
                            <Controller
                                control={control}
                                name="numeroViaPrincipal"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="numeroViaPrincipal"
                                        label="Número"
                                        required
                                        error={!!errors.numeroViaPrincipal}
                                        helperText={errors.numeroViaPrincipal && `${errors.numeroViaPrincipal.message}`}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="interseccionViaPrincipal"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="interseccionViaPrincipal"
                                        label="Intersección"
                                        size='small'
                                        placeholder='Seleccione'
                                        select
                                    >
                                        {
                                            listaIntersecciones.map(inter =>
                                                <MenuItem key={inter.InterseccionID} value={inter.InterseccionID}>{inter.InterseccionDesc}</MenuItem>
                                            )
                                        }
                                    </TextField>
                                )}
                            />
                        </Stack>

                        <Typography variant='subtitle2' color="primary.main">
                            Vía secundaria
                        </Typography>

                        <Stack direction="row" gap={0.5}>
                            <Controller
                                control={control}
                                name="numeroViaSecundaria"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="numeroViaSecundaria"
                                        label="Número"
                                        error={!!errors.numeroViaSecundaria}
                                        helperText={errors.numeroViaSecundaria && `${errors.numeroViaSecundaria.message}`}
                                    />

                                )}
                            />
                            <Controller
                                control={control}
                                name="interseccionViaSecundaria"
                                defaultValue=""
                                render={({ field }) => (

                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="interseccionViaSecundaria"
                                        label="Intersección"
                                        size='small'
                                        placeholder='Seleccione'
                                        select
                                    >
                                        {
                                            listaIntersecciones.map(inter =>
                                                <MenuItem key={inter.InterseccionID} value={inter.InterseccionID}>{inter.InterseccionDesc}</MenuItem>
                                            )
                                        }

                                    </TextField>
                                )}
                            />
                            <Controller
                                control={control}
                                name="numeroComplementoViaSecundaria"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="numeroComplementoViaSecundaria"
                                        label="Número"
                                    />
                                )}
                            />
                        </Stack>

                        <Divider />

                        <Stack direction="row" gap={0.5}>
                            <Controller
                                control={control}
                                name="unidadIdentidad1"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="unidadIdentidad1"
                                        label="Unidad de identidad 1"
                                        size='small'
                                        placeholder='Seleccione'
                                        select
                                    >
                                        {
                                            listaUndIdentidades.map(und => (
                                                <MenuItem key={und.UndIdentidadID} value={und.UndIdentidadID}>{und.UndIdentidadDesc}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                )}
                            />
                            <Controller
                                control={control}
                                name="numeroUnidadIdentidad1"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="numeroUnidadIdentidad1"
                                        label="Número"
                                    />
                                )}
                            />
                        </Stack>

                        <Stack direction="row" gap={0.5}>
                            <Controller
                                control={control}
                                name="unidadIdentidad2"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="unidadIdentidad2"
                                        label="Unidad de identidad 2"
                                        size='small'
                                        placeholder='Seleccione'
                                        select
                                    >
                                        {
                                            listaUndIdentidades.map(und => (
                                                <MenuItem key={und.UndIdentidadID} value={und.UndIdentidadID}>{und.UndIdentidadDesc}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                )}
                            />
                            <Controller
                                control={control}
                                name="numeroUnidadIdentidad2"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="numeroUnidadIdentidad2"
                                        label="Número"
                                    />
                                )}
                            />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" gap={1}>
                        <Button size='medium' variant="text" onClick={() => CerrarDialogoDirecciones()}>
                            Cerrar
                        </Button>

                        <Button
                            size='medium'
                            variant="contained"
                            onClick={ActualizarDireccion}
                        >
                            Actualizar
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}
