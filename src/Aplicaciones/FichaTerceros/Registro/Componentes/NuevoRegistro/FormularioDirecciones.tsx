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

export default function FormularioDirecciones({ estado, cambiarEstado }: FormularioDireccionesProps) {

    const [listaCalles, setListaCalles] = useState<Array<ICalle>>([]);

    const { control, setValue } = useFormContext();

    const propsInputs: Record<string, any> = {
        variant: "outlined",
        size: 'small',
        fullWidth: true,
    };

    const handleUpdateAddress = () =>{
        setValue("direccion", 'Calle 2 # 45 - 50')
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
    }  

    useEffect(() => {
      ConsultarListas();
      console.log(listaCalles)
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
                                            listaCalles.map(cl => <MenuItem key={cl.CalleID} id={cl.CalleID}>{cl.CalleDesc}</MenuItem>)
                                        }
                                    </TextField>
                                )}
                            />
                            <TextField
                                {...propsInputs}
                                id="numeroViaPrincipal"
                                label="Número"
                                required
                            />

                            <FormControl fullWidth size="small">
                                <InputLabel>Intersección</InputLabel>
                                <Select
                                    id="interseccionViaPrincipal"
                                    label="Intersección"
                                    size='small'
                                    placeholder='Seleccione'
                                >
                                    <MenuItem value={10}>1</MenuItem>
                                    <MenuItem value={20}>2</MenuItem>
                                    <MenuItem value={30}>3</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Typography variant='subtitle2' color="primary.main">
                            Vía secundaria
                        </Typography>

                        <Stack direction="row" gap={1.5}>
                            <TextField
                                {...propsInputs}
                                id="numeroViaSecundaria"
                                label="Número"
                                required
                            />

                            <FormControl fullWidth size="small">
                                <InputLabel>Intersección</InputLabel>
                                <Select
                                    id="interseccionViaSecundaria"
                                    label="Intersección"
                                    size='small'
                                    placeholder='Seleccione'
                                >
                                    <MenuItem value={10}>1</MenuItem>
                                    <MenuItem value={20}>2</MenuItem>
                                    <MenuItem value={30}>3</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                {...propsInputs}
                                id="numeroComplementoViaSecundaria"
                                label="Número"
                                required
                            />
                        </Stack>

                        <Divider />

                        <Stack direction="row" gap={1.5}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Unidad de identidad 1</InputLabel>
                                <Select
                                    id="unidadIdentidad1"
                                    label="Unidad de identidad 1"
                                    size='small'
                                    placeholder='Seleccione'
                                >
                                    <MenuItem value={10}>1</MenuItem>
                                    <MenuItem value={20}>2</MenuItem>
                                    <MenuItem value={30}>3</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                {...propsInputs}
                                id="numeroUnidadIdentidad1"
                                label="Número"
                            />
                        </Stack>

                        <Stack direction="row" gap={1.5}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Unidad de identidad 2</InputLabel>
                                <Select
                                    id="unidadIdentidad2"
                                    label="Unidad de identidad 2"
                                    size='small'
                                    placeholder='Seleccione'
                                >
                                    <MenuItem value={10}>1</MenuItem>
                                    <MenuItem value={20}>2</MenuItem>
                                    <MenuItem value={30}>3</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                {...propsInputs}
                                id="numeroUnidadIdentidad2"
                                label="Número"
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
