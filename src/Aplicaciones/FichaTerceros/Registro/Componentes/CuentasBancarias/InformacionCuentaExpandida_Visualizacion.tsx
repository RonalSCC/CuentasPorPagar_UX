import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Alert, Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Stack, Switch, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CuentaPorSucursal_Visualizacion from './CuentaPorSucursal_Visualizacion'
import Image from 'mui-image';
import ModalEditarSucursales from './_ModalEditarSucursales';
import ModalEliminar from '../Generales/_ModalEliminar';
import {GetValueOrDefault} from '../../../../../Utilidades/GetValueOrDefault'
import { CuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasContexto';
import { paramsCuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor';
import { CrearPeticion } from '../../../../../Consumos/APIManager';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';
import { IEnvioAPIGuardarEditarCuenta } from '../../../Interfaces/Registro/CuentasBancarias/IEnvioAPIGuardarEditarCuenta';
import { ICuentaBancaria } from '../../../Interfaces/Registro/CuentasBancarias/ICuentaBancaria';

export default function InformacionCuentaExpandida_Visualizacion() {

    const [VerModalEditarCuentaBancaria, setVerModalEditarCuentaBancaria] = useState(false);
    const [VerModalEditarCuentasSucursales, setVerModalEditarCuentasSucursales] = useState(false);
    const [VerModalEliminarCuenta, setVerModalEliminarCuenta] = useState(false);

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        BloquearCamposAcceso
    } = propsTercerosContexto;
    const {paramsCuentasBancariasContexto}:{paramsCuentasBancariasContexto:paramsCuentasBancariasContexto} = useContext<any>(CuentasBancariasContexto);
    const {
        CuentaExpandida,
        CambiarEstadoModalCrearEditar,
        CambiarEstadoActualizarCuentas
    } = paramsCuentasBancariasContexto;

    useEffect(() => {
        // BloquearCamposAcceso(true);
    }, []);
    

    const EditarCuentaBancaria = (estado:boolean)=>{
        setVerModalEditarCuentaBancaria(estado);
    }

    const EditarCuentasSucursales = (estado:boolean)=>{
        setVerModalEditarCuentasSucursales(estado);
    }

    const CambiarEstadoModalEliminar = (estado:boolean)=>{
        setVerModalEliminarCuenta(estado);
    }

    const EliminarCuenta = async()=>{
        // ---- Registrar cuenta ---- //
        await CrearPeticion({
            API: "CUENTASPORPAGAR",
            URLServicio: "/AdministracionTerceros/Eliminar_CuentaBancaria",
            Type:"DELETE",
            Body:{
                tcbId: CuentaExpandida?.tcbId,
                ruta: window.location.href
            }
        }).then((respuesta)=> {
            if (respuesta != null) {
                if (respuesta.ok) {
                    propsTercerosContexto.CambiarAlertas([<Alert className='UpZIndex' severity="success">{respuesta.descripcion}</Alert>]);
                    CambiarEstadoModalCrearEditar(false);
                    CambiarEstadoActualizarCuentas(true);
                }else{
                    propsTercerosContexto.CambiarAlertas([<Alert className='UpZIndex' severity="info">{respuesta.descripcion}</Alert>]);
                }
            }
        });
    }

    const CambiarEstadoCuenta = async(event: React.ChangeEvent<HTMLInputElement>, checked: boolean)=> {
        const DatosCuenta = CuentaExpandida as ICuentaBancaria;
        let dataSend:IEnvioAPIGuardarEditarCuenta ={
            tcbId: DatosCuenta.tcbId,
            tcbTercero: DatosCuenta?.tcbTercero,
            tcbEntidad: DatosCuenta?.tcbEntidad,
            tcbTipo: DatosCuenta?.tcbTipoCuentaId,
            tcbCuentaNo: DatosCuenta?.tcbNumeroCuenta,
            tcbSwift: DatosCuenta?.tcbSwift ? DatosCuenta?.tcbSwift.toString(): "",
            tcbAbba: DatosCuenta?.tcbAbbaIban ? DatosCuenta?.tcbAbbaIban.toString() : "",
            tcbEmail: DatosCuenta?.tcbCorreoElectronico,
            tcbContacto: DatosCuenta?.tcbContacto,
            tcbTelefono: DatosCuenta?.tcbTelefono,
            tcbPagoNit: DatosCuenta?.tcbPagoPorNit,
            tcbActiva: checked,
            ruta: window.location.href
        }

        // ---- Registrar cuenta ---- //
        await CrearPeticion({
            API: "CUENTASPORPAGAR",
            URLServicio: "/CuentasBancariasTerceros/Editar_CuentaBancaria",
            Type:"POST",
            Body:dataSend
        }).then((respuesta)=> {
            if (respuesta != null && respuesta.ok == true) {
                propsTercerosContexto.CambiarAlertas([<Alert severity="success">{respuesta.descripcion}</Alert>]);
                CambiarEstadoModalCrearEditar(false);
                CambiarEstadoActualizarCuentas(true);
            }
        });
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
                                    {GetValueOrDefault(CuentaExpandida?.tcbTelefono)}
                                </Typography>
                            </Stack>

                            <Stack direction="row" gap={.5} alignItems="center" width="50%">
                                <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                    Contacto:
                                </Typography>
                                <Typography variant='body2' color="text.secondary">
                                    {GetValueOrDefault(CuentaExpandida?.tcbContacto)}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack direction="row" gap={1.5}>
                            <Stack direction="row" gap={.5} alignItems="center" width="50%">
                                <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                    Email:
                                </Typography>
                                <Typography variant='body2' color="text.secondary">
                                    {GetValueOrDefault(CuentaExpandida?.tcbCorreoElectronico)}
                                </Typography>
                            </Stack>

                            <FormGroup sx={{width:"50%"}}>
                                <FormControlLabel control={<Checkbox defaultChecked={CuentaExpandida?.tcbPagoPorNit} size='small'/>} label="Pago por NIT" />
                            </FormGroup>
                        </Stack>

                    </Stack>
                </Stack>

                <Button 
                    variant='text'
                    startIcon={<EditOutlined />}
                    onClick={()=> CambiarEstadoModalCrearEditar(true)}
                >
                    Editar
                </Button>
            </Stack>

            <Divider />

            <Stack direction="row" gap={3} alignItems="center">
                <Image width="5%" src='Imagenes/Terceros/UbicacionCuentasPorPagar.svg' fit='cover'/>

                <Stack direction="column" gap={1} width="80%">

                    <Stack direction="column" gap={1} >
                        {
                            (CuentaExpandida?.tcbListaSucursales && CuentaExpandida?.tcbListaSucursales.length > 0) 
                            && 
                            <CuentaPorSucursal_Visualizacion ListaSucursales={CuentaExpandida?.tcbListaSucursales}/> 
                        }
                        {
                            (!CuentaExpandida?.tcbListaSucursales || CuentaExpandida?.tcbListaSucursales.length == 0) 
                            &&
                            <Stack direction={"row"}>
                               <Typography variant='subtitle1' color="text.disabled">
                                    No hay sucursales asignadas
                                </Typography>
                            </Stack>
                        }
                    </Stack>
                </Stack>

                <Button 
                    disabled={BloquearCamposAcceso("CBAsociarSucursales")}
                    variant='text'
                    startIcon={<EditOutlined />}
                    onClick={()=> EditarCuentasSucursales(true)}
                >
                    Editar
                </Button>
            </Stack>
        </Stack>

        <Stack direction="row" padding={1} justifyContent="space-between">
            <IconButton disabled={BloquearCamposAcceso("CBEliminarCuenta")} onClick={()=> CambiarEstadoModalEliminar(true)} size='small'>
                <DeleteOutline fontSize='small' color={!BloquearCamposAcceso("CBEliminarCuenta") ? "error" : 'disabled'} />
            </IconButton>

            <FormGroup>
                <FormControlLabel 
                    sx={{mr:"0px"}} 
                    control={
                        <Switch 
                            disabled={BloquearCamposAcceso("CBEstado")}
                            onChange={(event,checked)=> CambiarEstadoCuenta(event,checked)}
                            defaultChecked={CuentaExpandida?.tcbActiva} 
                            size='small'
                        />
                    } label="Activa" />
            </FormGroup>
        </Stack>

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

