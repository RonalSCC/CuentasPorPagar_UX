import { yupResolver } from '@hookform/resolvers/yup'
import { Delete, DeleteOutlined } from '@mui/icons-material'
import { Alert, FormControl, FormControlLabel, FormLabel, IconButton, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { CuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasContexto'
import { paramsCuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import { EsquemaAsociacionCuentaSucursal } from '../../../EsquemasValidacion/Registro/CuentasBancarias/EsquemaAsociacionCuentaSucursal'
import { ISucursal } from '../../../Interfaces/Generales/ISucursal'
import ISucursalCuentaBancaria from '../../../Interfaces/Registro/CuentasBancarias/ISucursalCuentaBancaria'

export interface PropsAsociacionCuentaSucursal {
    ListaSucursales: ISucursal[] | undefined,
    Asociacion: ISucursalCuentaBancaria,
    CambiarSucursalPrincipal: (SucId: number) => void,
    CambiarEstadoNuevaSucursal:(estado: boolean) => void
}
export default function AsociacionCuentaSucursal(
    {
        ListaSucursales,
        Asociacion,
        CambiarSucursalPrincipal,
        CambiarEstadoNuevaSucursal
    }:PropsAsociacionCuentaSucursal
) {    
    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        CambiarAlertas,
        CerrarAlertas
    } = propsTercerosContexto;
    const {paramsCuentasBancariasContexto}:{paramsCuentasBancariasContexto:paramsCuentasBancariasContexto} = useContext<any>(CuentasBancariasContexto);
    const {
      CuentaExpandida,
      SucursalesCuenta,
      CambiarSucursalCuenta,
      CambiarListaSucursalesCuenta
    } = paramsCuentasBancariasContexto;

    let {
        handleSubmit,
        control,
        setValue
        
    } = useForm({
        resolver: yupResolver(EsquemaAsociacionCuentaSucursal),
        defaultValues: {
            SucursalId: -1
        },
        mode:"onBlur"
    });

    useEffect(() => {
        setValue("SucursalId", Asociacion.sucId ? Asociacion.sucId: -1);
    }, []);

    const GuardarAsociacion = (data:any)=> {
        console.log(data);
    }

    const CambioSucursal = (valor: number, onChange: (...event: any[]) => void)=> {
        if (valor) {
            Asociacion.sucId = valor;
            let CambioRespuesta:boolean = CambiarSucursalCuenta(Asociacion);
            if (CambioRespuesta) {
                onChange(valor);
            }else{
                CambiarAlertas([<Alert className='UpZIndex' severity="info" onClose={()=> CerrarAlertas()}>Ya existe una relación con la sucursal seleccionada</Alert>]);
            }
        }
    }

    const CambioPrincipal = (checked: boolean)=> {
        Asociacion.sucPrincipal = checked;
        CambiarSucursalCuenta(Asociacion);
    }

    const EliminarSucursalCuenta = ()=>{
        
        if (Asociacion.sucTCBSId != -1) {
            
        }else{
            const posicion = SucursalesCuenta?.map(suc=> suc.sucTCBSId).indexOf(Asociacion.sucTCBSId);
            if (posicion != -1) {
                CambiarListaSucursalesCuenta([...SucursalesCuenta.splice(posicion, 1)])
            }
            CambiarEstadoNuevaSucursal(false);
        }
    }
  return (
    <>
        <form onSubmit={handleSubmit(GuardarAsociacion)} style={{width: "100%"}}>
            <Stack 
                direction={"row"} 
                gap={.5} 
                width="100%"
            >
                {
                    ListaSucursales && 
                    <Controller
                        name={"SucursalId"}
                        control={control}
                        render={({field: { onChange, value }, fieldState: {error}}) => (
                            <TextField
                                label={Asociacion.sucTCBSId != -1 ? "Sucursal": "Nueva Sucursal"}
                                placeholder={Asociacion.sucTCBSId != -1 ? "Sucursal": "Nueva Sucursal"}
                                error={error ? true : false}
                                helperText={error?.message}
                                onChange={(event: any) => {
                                    CambioSucursal(parseInt(event.target.value), onChange);
                                }}
                                value={value}
                                select
                                fullWidth
                            >
                                {
                                    ListaSucursales?.map(suc => {
                                        return <MenuItem key={suc.SucID} value={suc.SucID}>{suc.SucDesc}</MenuItem>
                                    })
                                }
                            </TextField>
                        )}
                    />
                }
                

                <IconButton onClick={()=> EliminarSucursalCuenta()}>
                    <DeleteOutlined color='error'/>
                </IconButton>

                <FormControl sx={{
                    width: "15%"
                }}>
                    
                    <FormControlLabel 
                        value={"Asociacion"+ (Asociacion.sucTCBSId)} 
                        onChange={(event, checked) => {
                            CambiarSucursalPrincipal(Asociacion.sucTCBSId);
                            CambioPrincipal(checked);
                        }}
                        control={
                            <Radio
                            />
                        } 
                        label="Principal" 
                    />
                </FormControl>
            </Stack>
        </form>
    </>
  )
}
