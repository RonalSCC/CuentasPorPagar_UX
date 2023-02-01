import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Stack, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import CuentaPorSucursal_Visualizacion from './CuentaPorSucursal_Visualizacion'
import Image from 'mui-image';
import ModalEditarCuentaBancaria from './_ModalEditarCuentaBancaria';
import ModalEditarSucursales from './_ModalEditarSucursales';
import ModalEliminar from '../Generales/_ModalEliminar';

export default function InformacionCuentaExpandida_Visualizacion() {

    const [VerModalEditarCuentaBancaria, setVerModalEditarCuentaBancaria] = useState(false);
    const [VerModalEditarCuentasSucursales, setVerModalEditarCuentasSucursales] = useState(false);
    const [VerModalEliminarCuenta, setVerModalEliminarCuenta] = useState(false);


    const EditarCuentaBancaria = (estado:boolean)=>{
        setVerModalEditarCuentaBancaria(estado);
    }

    const EditarCuentasSucursales = (estado:boolean)=>{
        setVerModalEditarCuentasSucursales(estado);
    }

    const CambiarEstadoModalEliminar = (estado:boolean)=>{
        setVerModalEliminarCuenta(estado);
    }

    const EliminarCuenta = ()=>{
    }
  return (
    <>
        <Divider sx={{width:"100%"}} orientation='horizontal'/>

        <Stack direction="column" gap={1.5}>
            <Stack direction="row" gap={3} alignItems="center">
                <Image width="5%" src='Imagenes/Terceros/ComentarioCuentasPorPagar.svg' fit='cover'/>

                <Stack direction="column" width="80%" gap={.5}>
                    <Typography variant='body1' color="primary.main">
                        Tesorería
                    </Typography>

                    <Stack direction="column">
                        <Stack direction="row" gap={1.5}>
                            <Stack direction="row" gap={.5} alignItems="center" width="50%">
                                <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                    Télefono:
                                </Typography>
                                <Typography variant='body2' color="text.secondary">
                                    3214567890
                                </Typography>
                            </Stack>

                            <Stack direction="row" gap={.5} alignItems="center" width="50%">
                                <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                    Contacto:
                                </Typography>
                                <Typography variant='body2' color="text.secondary">
                                    3456789
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack direction="row" gap={1.5}>
                            <Stack direction="row" gap={.5} alignItems="center" width="50%">
                                <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                    Email:
                                </Typography>
                                <Typography variant='body2' color="text.secondary">
                                    viviana.contreras@sinco.com.co
                                </Typography>
                            </Stack>

                            <FormGroup sx={{width:"50%"}}>
                                <FormControlLabel control={<Checkbox size='small'/>} label="Pago por NIT" />
                            </FormGroup>
                        </Stack>

                    </Stack>
                </Stack>

                <Button 
                    variant='text'
                    startIcon={<EditOutlined />}
                    onClick={()=> EditarCuentaBancaria(true)}
                >
                    Editar
                </Button>
            </Stack>

            <Divider />

            <Stack direction="row" gap={3} alignItems="center">
                <Image width="5%" src='Imagenes/Terceros/UbicacionCuentasPorPagar.svg' fit='cover'/>

                <Stack direction="column" gap={1} width="80%">
                    <Typography variant='subtitle2' color="text.primary">
                        Sucursales asignadas
                    </Typography>

                    <Stack direction="column" gap={1} >

                        <CuentaPorSucursal_Visualizacion objInfoCuenta={{}}/>

                        <CuentaPorSucursal_Visualizacion objInfoCuenta={{}}/>
                    </Stack>
                </Stack>

                <Button 
                    variant='text'
                    startIcon={<EditOutlined />}
                    onClick={()=> EditarCuentasSucursales(true)}
                >
                    Editar
                </Button>
            </Stack>
        </Stack>

        <Stack direction="row" padding={1} justifyContent="space-between">
            <IconButton onClick={()=> CambiarEstadoModalEliminar(true)} size='small'>
                <DeleteOutline fontSize='small' color='error' />
            </IconButton>

            <FormGroup>
                <FormControlLabel sx={{mr:"0px"}} control={<Switch checked size='small'/>} label="Activa" />
            </FormGroup>
        </Stack>

        {
            VerModalEditarCuentaBancaria == true &&
            <ModalEditarCuentaBancaria CerrarModal={EditarCuentaBancaria}/>

        }

        {
            VerModalEditarCuentasSucursales == true &&
            <ModalEditarSucursales CerrarModal={EditarCuentasSucursales} />
        }

        {
            VerModalEliminarCuenta == true &&
            <ModalEliminar 
                Titulo='Eliminar cuenta'
                Texto='Recuerde que toda la información bancaria suministrada será borrada totalmente'
                ImageSRC="Imagenes/Terceros/EliminarCuenta.svg"
                FunCerrarModal={() => CambiarEstadoModalEliminar(false)}
                FunEliminarRegistro={() => EliminarCuenta()}
            />
        }
    </>
  )
}

