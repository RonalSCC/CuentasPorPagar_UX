import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { CrearPeticion } from '../../../../../Consumos/APIManager';
import IBanco from '../../../Interfaces/Generales/IBanco';
import ITipoCuenta from '../../../Interfaces/Generales/ITipoCuenta';
import { yupResolver } from "@hookform/resolvers/yup";
import { EsquemaCuentaBancaria } from '../../../EsquemasValidacion/Registro/CuentasBancarias/EsquemaCuentaBancaria';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';
import { paramsCuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor';
import { CuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasContexto';
import { IEnvioAPIGuardarEditarCuenta } from '../../../Interfaces/Registro/CuentasBancarias/IEnvioAPIGuardarEditarCuenta';
import { SendRequest, SendRequestAxios } from '../../../../../Consumos/Request';
import IRespuestaGeneral from '../../../../../Consumos/IRespuestaGeneral';

export default function ModalFormNuevaCuenta() 
{
    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        CambiarEstadoLoader,
        BloquearCamposAcceso
    } = propsTercerosContexto;
    const {paramsCuentasBancariasContexto}:{paramsCuentasBancariasContexto:paramsCuentasBancariasContexto} = useContext<any>(CuentasBancariasContexto);
    const {
      CuentaExpandida,
      ListaBancos,
      ListaTiposCuenta,
      ShowModalCrearEditar,
      CambiarEstadoModalCrearEditar,
      CambiarEstadoActualizarCuentas
    } = paramsCuentasBancariasContexto;

    let {
        handleSubmit,
        control,
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(EsquemaCuentaBancaria)
    });


    useEffect(() => {
        
    }, []);

    useEffect(() => {
        setValue("tcbCuentaNo", CuentaExpandida?.tcbNumeroCuenta);
        setValue("tcbPagoNit", CuentaExpandida?.tcbPagoPorNit);
        setValue("tcbTelefono", CuentaExpandida?.tcbTelefono);
        setValue("tcbContacto", CuentaExpandida?.tcbContacto);
        setValue("tcbEmail", CuentaExpandida?.tcbCorreoElectronico);
        setValue("tcbAbba", CuentaExpandida?.tcbAbbaIban);
        setValue("tcbSwift", CuentaExpandida?.tcbSwift);
        setValue("tcbTipo", CuentaExpandida?.tcbTipoCuentaId);
        setValue("tcbEntidad", CuentaExpandida?.tcbEntidadId);
    }, [CuentaExpandida]);


    
    
    const EnviarFormulario = async(data:any)=>  {

        let parametrosEnvio:SendRequestAxios= 
        {
            API: "CUENTASPORPAGAR",
            URLServicio: "/CuentasBancariasTerceros/Guardar_CuentaBancaria",
            Body:{
                ...data,
                tcbTercero: Number(propsTercerosContexto.TerceroSeleccionadoLista?.TerID),
                ruta:  window.location.href
            }
        }
        let promise: Promise<void | IRespuestaGeneral>;

        if (CuentaExpandida && CuentaExpandida.tcbId) {
            parametrosEnvio.URLServicio = "/CuentasBancariasTerceros/Editar_CuentaBancaria";
            parametrosEnvio.Body.tcbId =  CuentaExpandida.tcbId;
            promise = SendRequest.put(parametrosEnvio);
        }else{
            promise = SendRequest.post(parametrosEnvio);
        }
        
        // ---- Registrar cuenta ---- //
        promise.then((respuesta)=> {
            CambiarEstadoLoader(false);
            if (respuesta != null && respuesta.ok == true) {
                propsTercerosContexto.CambiarAlertas([<Alert severity="success">{respuesta.descripcion}</Alert>]);
                CambiarEstadoModalCrearEditar(false);
                CambiarEstadoActualizarCuentas(true);
                reset();
            }
        });
    }

    const propsInputs: Record<string, any> = {
        variant:"outlined", 
        size:'small',
        fullWidth:true,
    };

    const ValidarBloqueoAcceso = (ID:string) => {
        if (CuentaExpandida) {
            return BloquearCamposAcceso(ID);
        }else{
            return false;
        }
    }
  return (
    <>
    <Dialog
        open={ShowModalCrearEditar}
        onClose={() => CambiarEstadoModalCrearEditar(false)}
        fullWidth
    >
        <DialogTitle >
            <div>
                <Typography variant='h6' color="text.primary">
                    Cuenta bancaria
                </Typography>
            </div>
        </DialogTitle>
        <form onSubmit={handleSubmit(EnviarFormulario)}>
            <Stack direction="column" paddingY={1} paddingX={3} gap={1.5}>
                <Stack direction="row" gap={.5}>
                    <FormControl fullWidth size="small" id='EntidadControl'>
                        <Controller
                            name={"tcbEntidad"}
                            control={control}
                            render={({field: { onChange, value }, fieldState: {error}}) => (
                                <TextField
                                    label="Entidad"
                                    size='small'
                                    error={error ? true : false}
                                    helperText={error?.message}
                                    fullWidth
                                    onChange={onChange}
                                    value={value}
                                    select
                                    disabled={ValidarBloqueoAcceso("CBEntidad")}
                                    required
                                >
                                    {
                                        ListaBancos?.map(ban => {
                                            return <MenuItem key={ban.BcoCod} value={ban.BcoCod}>{ban.BcoDesc}</MenuItem>    
                                        })
                                    }
                                </TextField>
                            )}
                        />
                    </FormControl>    
                    

                    <FormControl  fullWidth size="small">
                        <Controller
                            name={"tcbTipo"}
                            control={control}
                            render={({field: { onChange, value }, fieldState: {error}}) => (
                                <TextField
                                    id="TipoDeCuenta"
                                    label="Tipo de cuenta"
                                    size='small'
                                    error={error ? true : false}
                                    helperText={error?.message}
                                    placeholder='Tipo de cuenta'
                                    fullWidth
                                    onChange={onChange}
                                    value={value ? value : ""}
                                    select
                                    disabled={ValidarBloqueoAcceso("CBTipoCuenta")}
                                    required
                                >
                                    {
                                        ListaTiposCuenta?.map(tp => {
                                            return <MenuItem key={tp.TCBCod} value={tp.TCBCod}>{tp.TCBDesc}</MenuItem>    
                                        })
                                    }
                                </TextField>
                            )}
                        />
                    </FormControl>    
                    
                </Stack>

                <Stack direction="row" gap={1.5}>
                    <Controller
                        name={"tcbCuentaNo"}
                        control={control}
                        render={({field: { onChange, value }, fieldState: {error}}) => (
                            <TextField
                                {...propsInputs}
                                type="number"
                                onChange={onChange}
                                value={value}
                                error={error ? true : false}
                                helperText={error?.message}
                                id="numeroDeCuenta" 
                                label="Número de cuenta"
                                disabled={ValidarBloqueoAcceso("CBNumeroCuenta")}
                                required
                            />
                        )}
                    />
                    
                </Stack>

                <Stack direction="row" gap={1.5}>
                    <Controller
                        name={"tcbSwift"}
                        control={control}
                        render={({field: { onChange, value }, fieldState: {error}}) => (
                            <TextField
                                {...propsInputs}
                                id="swift" 
                                label="Swift"
                                onChange={onChange}
                                value={value}
                                error={error ? true : false}
                                disabled={ValidarBloqueoAcceso("CBSwift")}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        name={"tcbAbba"}
                        control={control}
                        render={({field: { onChange, value }, fieldState: {error}}) => (
                            <TextField
                                {...propsInputs}
                                type="number"
                                id="abba-iban" 
                                label="ABBA/IBAN"
                                onChange={onChange}
                                value={value}
                                error={error ? true : false}
                                disabled={ValidarBloqueoAcceso("CBAbbaIban")}
                                helperText={error?.message}
                            />
                        )}
                    />
                    
                </Stack>

                <Typography variant='subtitle2' color="primary.light">
                    Tesorería
                </Typography>

                <Stack direction="row" gap={1.5}>
                    <Controller
                        name={"tcbEmail"}
                        control={control}
                        render={({field: { onChange, value }, fieldState: {error}}) => (
                            <TextField
                                {...propsInputs}
                                type="mail"
                                id="tcbEmail" 
                                label="Correo"
                                onChange={onChange}
                                value={value}
                                error={error ? true : false}
                                disabled={ValidarBloqueoAcceso("CBCorreoTesoreria")}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        name={"tcbContacto"}
                        control={control}
                        render={({field: { onChange, value }, fieldState: {error}}) => (
                            <TextField
                                {...propsInputs}
                                type="text"
                                id="tcbContacto" 
                                label="Contacto"
                                onChange={onChange}
                                value={value}
                                error={error ? true : false}
                                helperText={error?.message}
                                disabled={ValidarBloqueoAcceso("CBContactoTesoreria")}
                            />
                            
                        )}
                    />

                    
                </Stack>

                <Stack direction="row" gap={1.5}>
                    <Controller
                        name={"tcbTelefono"}
                        control={control}
                        render={({field: { onChange, value }, fieldState: {error}}) => (
                            <TextField
                                {...propsInputs}
                                type="number"
                                id="tcbTelefono" 
                                label="Télefono"
                                sx={{width:"49%"}}
                                onChange={onChange}
                                value={value}
                                error={error ? true : false}
                                helperText={error?.message}
                                disabled={ValidarBloqueoAcceso("CBTelefonoTesoreria")}
                            />
                        )}
                    />
                </Stack>

                <Stack direction="row" gap={1.5}>
                    <Controller
                        name={"tcbPagoNit"}
                        control={control}
                        render={({field: { onChange, value }, fieldState: {error}}) => (
                            <FormControl
                                error={error ? true : false}
                            >
                                <FormGroup>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                disabled={ValidarBloqueoAcceso("CBPagoPorNIT")}
                                                checked={!!value}
                                                value={value}
                                                onChange={onChange}
                                            />
                                        } 
                                        label="Pago por NIT" 
                                    />
                                </FormGroup>    
                                <FormHelperText>{error?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Stack>
            </Stack>

            <DialogActions>
                <Stack direction="row" gap={1}>
                    <Button onClick={() => CambiarEstadoModalCrearEditar(false)} size='medium' variant="text">
                        Cancelar
                    </Button>

                    <Button 
                        size='medium' 
                        variant="contained"
                        onClick={handleSubmit(EnviarFormulario)}
                    >
                        Guardar
                    </Button>
                </Stack>
            </DialogActions>

        </form> 


    </Dialog>
    </>
  )
}
