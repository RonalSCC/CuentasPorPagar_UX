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
import ModalEliminar from '../Generales/_ModalEliminar'

export interface PropsAsociacionCuentaSucursal {
    ListaSucursales: ISucursal[] | undefined,
    Asociacion: ISucursalCuentaBancaria,
    CambiarAsociacionAPrincipal: (Asociacion: ISucursalCuentaBancaria) => void,
    EliminarAsociacion?: (TCBSId: number) => void,
    ActualizarAsociacionesCuenta: () => void
}
export default function AsociacionCuentaSucursal(AsociacionCuentaSucursalProps:PropsAsociacionCuentaSucursal) {    
    const {
        ListaSucursales,
        Asociacion,
        CambiarAsociacionAPrincipal,
        EliminarAsociacion,
        ActualizarAsociacionesCuenta
    } = AsociacionCuentaSucursalProps;

    /* #region Contextos */
    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        CambiarAlertas,
        CerrarAlertas
    } = propsTercerosContexto;
    
    const {paramsCuentasBancariasContexto}:{paramsCuentasBancariasContexto:paramsCuentasBancariasContexto} = useContext<any>(CuentasBancariasContexto);
    const {
      CuentaExpandida
    } = paramsCuentasBancariasContexto;
    /* #endregion */
    
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

    // const CambioSucursal = (valor: number, onChange: (...event: any[]) => void)=> {
    //     if (valor) {
    //         Asociacion.sucId = valor;
    //         let CambioRespuesta:boolean = CambiarSucursalCuenta(Asociacion);
    //         if (CambioRespuesta) {
    //             onChange(valor);
    //         }else{
    //             CambiarAlertas([<Alert className='UpZIndex' severity="info" onClose={()=> CerrarAlertas()}>Ya existe una relación con la sucursal seleccionada</Alert>]);
    //         }
    //     }
    // }



    const EliminarSucursalCuenta = ()=>{
        if (Asociacion.sucTCBSId != -1) {
            if (EliminarAsociacion) {
                EliminarAsociacion(Asociacion.sucTCBSId);
            }
        }else{
            // const posicion = SucursalesCuenta?.map(suc=> suc.sucTCBSId).indexOf(Asociacion.sucTCBSId);
            // if (posicion != -1) {
            //     CambiarListaSucursalesCuenta([...SucursalesCuenta.splice(posicion, 1)])
            // }
            // CambiarEstadoNuevaSucursal(false);
        }
    }
  return (
    <>
        <Stack 
            direction={"row"} 
            gap={.5} 
            width="100%"
        >
            {
                ListaSucursales && 
                    <TextField
                        label={Asociacion.sucTCBSId != -1 ? "Sucursal": "Nueva Sucursal"}
                        placeholder={Asociacion.sucTCBSId != -1 ? "Sucursal": "Nueva Sucursal"}
                        onChange={(event: any) => {
                            Asociacion.sucId = parseInt(event.target.value);
                            ActualizarAsociacionesCuenta();
                        }}
                        value={Asociacion.sucId}
                        select
                        fullWidth
                    >
                        {
                            ListaSucursales?.map(suc => {
                                return <MenuItem key={suc.SucID} value={suc.SucID}>{suc.SucDesc}</MenuItem>
                            })
                        }
                    </TextField>

            }
            

            <IconButton disabled={!Asociacion.sucPermiteEliminar} onClick={()=> EliminarSucursalCuenta()}>
                <DeleteOutlined color={!Asociacion.sucPermiteEliminar ? "disabled": "error"}/>
            </IconButton>

            <FormControl sx={{
                width: "15%"
            }}>
                
                <FormControlLabel 
                    value={"Asociacion"+ (Asociacion.sucTCBSId)} 
                    onChange={(event, checked) => {
                        CambiarAsociacionAPrincipal(Asociacion);
                    }}
                    control={
                        <Radio
                            checked={Asociacion.sucPrincipal}
                        />
                    } 
                    label="Principal" 
                />
            </FormControl>
        </Stack>
    </>
  )
}
