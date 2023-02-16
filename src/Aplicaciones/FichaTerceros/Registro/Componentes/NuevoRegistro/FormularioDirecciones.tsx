import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { CrearPeticion } from '../../../../../Consumos/APIManager';

export interface FormularioDireccionesProps {
    estado: boolean,
    cambiarEstado: Function
}

export interface ICalle {
    CalleID: string,
    CalleDesc: string
}

export interface IViaPrincipal {
    AvPrincipalID: string,
    AvPrincipalDesc: string
}

export interface IUndIdentidad {
    UndIdentidadID: string,
    UndIdentidadDesc: string
}

export default function FormularioDirecciones({ estado, cambiarEstado }: FormularioDireccionesProps) {

    const [listaCalles, setListaCalles] = useState<Array<ICalle>>([]);
    const [listaViaPrincipales, setListaViaPrincipales] = useState<Array<IViaPrincipal>>([])
    const [listaUndIdentidades, setListaUndIdentidades] = useState<Array<IUndIdentidad>>([])

    const { control, setValue, getValues } = useFormContext();

    const propsInputs: Record<string, any> = {
        variant: "outlined",
        size: 'small',
        fullWidth: true,
    };

    const handleUpdateAddress = () => {
        
        const {
            calle,
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
        
       let direcciónCompleta = 
        calle + " " +
        numeroViaPrincipal + " " + 
        interseccionViaPrincipal + " " +
        numeroViaSecundaria + " " +
        interseccionViaSecundaria + " " +
        numeroComplementoViaSecundaria + " " +
        unidadIdentidad1 + " " +
        numeroUnidadIdentidad1 + " " +
        unidadIdentidad2 + " " +
        numeroUnidadIdentidad2;

        direcciónCompleta = direcciónCompleta.trim();
        direcciónCompleta = direcciónCompleta.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        
       setValue("direccion",direcciónCompleta);
       cambiarEstado();
    }

    const ConsultarListas = async () => {
        let PropsDefaultRequest = {
            API: "CONFIGURACION",
            URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
            Type: "GET"
        };

        // ---- Calles
        await CrearPeticion({
            ...PropsDefaultRequest,
            Body: {
                UsuarioID: 1,
                Clave: 'Calles'
            }
        }).then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
                setListaCalles(respuesta.datos);
            }
        });

        // ---- Avenidas
        await CrearPeticion({
            ...PropsDefaultRequest,
            Body: {
                UsuarioID: 1,
                Clave: 'Avenidas'
            }
        }).then((respuesta) => {
            if (respuesta != null && respuesta.ok == true) {
                setListaViaPrincipales(respuesta.datos);
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


    return (
        <>
            <Dialog
                open={estado}
                onClose={() => cambiarEstado()}
                fullWidth
            >
                <DialogTitle paddingY={2} paddingX={3}>
                    Ubicación
                </DialogTitle>
                <DialogContent sx={{ padding: "0px" }}>
                    <Stack gap={2} paddingY={1.5} paddingX={3}>
                        <Typography variant='subtitle2' color="primary.main">
                            Vía principal
                        </Typography>
                        <Stack direction="row" gap={1.5}>
                            <Controller
                                control={control}
                                name="calle"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...propsInputs}
                                        id="calle"
                                        label="Calle"
                                        size='small'
                                        select
                                        placeholder='Seleccione'
                                    >
                                        {
                                            listaCalles.map(cl => <MenuItem key={cl.CalleID} value={cl.CalleID}>{cl.CalleDesc}</MenuItem>)
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
                                            listaViaPrincipales.map(AvPrin =>
                                                <MenuItem key={AvPrin.AvPrincipalID} value={AvPrin.AvPrincipalID}>{AvPrin.AvPrincipalDesc}</MenuItem>
                                            )
                                        }
                                    </TextField>
                                )}
                            />
                        </Stack>

                        <Typography variant='subtitle2' color="primary.main">
                            Vía secundaria
                        </Typography>

                        <Stack direction="row" gap={1.5}>
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
                                            listaViaPrincipales.map(AvPrin =>
                                                <MenuItem key={AvPrin.AvPrincipalID} value={AvPrin.AvPrincipalID}>{AvPrin.AvPrincipalDesc}</MenuItem>
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

                        <Stack direction="row" gap={1.5}>
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
                                                <MenuItem key={und.UndIdentidadID} value={und.UndIdentidadID}>{und.UndIdentidadDesc }</MenuItem>
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

                        <Stack direction="row" gap={1.5}>
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
                                                <MenuItem key={und.UndIdentidadID} value={und.UndIdentidadID}>{und.UndIdentidadDesc }</MenuItem>
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
                        <Button size='medium' variant="text" onClick={() => cambiarEstado()}>
                            Cerrar
                        </Button>

                        <Button
                            size='medium'
                            variant="contained"
                            onClick={handleUpdateAddress}
                        >
                            Actualizar
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}
