import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material'
import { Alert, Card, CardContent, Chip, Divider, FormControlLabel, FormGroup, IconButton, Stack, Switch, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { GetValueOrDefault } from '../../../../../Utilidades/GetValueOrDefault'
import { CuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasContexto'
import { ICuentaBancaria } from '../../../Interfaces/Registro/CuentasBancarias/ICuentaBancaria'
import InformacionCuentaExpandida_Visualizacion from './InformacionCuentaExpandida_Visualizacion'
import { paramsCuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor';
import IConfigInfo from '../../../Interfaces/Config/IConfigInfo'
import { IEnvioAPIGuardarEditarCuenta } from '../../../Interfaces/Registro/CuentasBancarias/IEnvioAPIGuardarEditarCuenta'
import { CrearPeticion } from '../../../../../Consumos/APIManager'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import { SendRequest } from '../../../../../Consumos/Request'

export interface PropsCardCuenta {
    objInfoCuenta:ICuentaBancaria,
    Expandida?:boolean 
}
export default function CardCuenta(CardCuentaProps:PropsCardCuenta) {

    const  {
        objInfoCuenta,
        Expandida = false
    } = CardCuentaProps;

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {paramsCuentasBancariasContexto}:{paramsCuentasBancariasContexto:paramsCuentasBancariasContexto} = useContext<any>(CuentasBancariasContexto);
    const {
        CambiarCuentaSeleccionada,
        CambiarEstadoModalCrearEditar,
        CambiarEstadoActualizarCuentas,
        Configs
    } = paramsCuentasBancariasContexto;
    
    let Config_CTB_MATRICULARIESGOS:IConfigInfo = Configs && Configs["CTB_MATRICULARIESGOS"];
    let SucursalPrincipalGeneral = objInfoCuenta.tcbListaSucursales.filter(suc => suc.sucPrincipal == true);

    const CambiarEstadoCuenta = async(event: React.ChangeEvent<HTMLInputElement>, checked: boolean)=> {

        let dataSend:IEnvioAPIGuardarEditarCuenta ={
            tcbId: objInfoCuenta.tcbId,
            tcbTercero: objInfoCuenta.tcbTercero,
            tcbEntidad: objInfoCuenta.tcbEntidad,
            tcbTipo: objInfoCuenta.tcbTipoCuentaId,
            tcbCuentaNo: objInfoCuenta.tcbNumeroCuenta,
            tcbSwift: objInfoCuenta.tcbSwift ? objInfoCuenta.tcbSwift.toString(): "",
            tcbAbba: objInfoCuenta.tcbAbbaIban ? objInfoCuenta.tcbAbbaIban.toString() : "",
            tcbEmail: objInfoCuenta.tcbCorreoElectronico,
            tcbContacto: objInfoCuenta.tcbContacto,
            tcbTelefono: objInfoCuenta.tcbTelefono,
            tcbPagoNit: objInfoCuenta.tcbPagoPorNit,
            tcbActiva: checked,
            ruta: window.location.href
        }

        // ---- Registrar cuenta ---- //
        SendRequest.put({
            API: "CUENTASPORPAGAR",
            URLServicio: "/CuentasBancariasTerceros/Editar_CuentaBancaria",
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
        <Card>
            <Stack direction="column" paddingX={2} paddingY={2} gap={1.5}>
                <Stack direction="row" gap={.5} alignItems="center">
                    <Stack direction="column" gap={.5} width="95%">
                        <Stack direction="row" gap={.5}>
                            <Chip 
                                size='small' 
                                color='info' 
                                label={`ID: ${objInfoCuenta.tcbId}`} 
                                variant="outlined"
                            />

                            <Stack direction="row" alignItems="center" gap={.5}>
                                <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                    Cuenta No.:
                                </Typography>
                                <Typography variant='body1' color="text.secondary">
                                    {GetValueOrDefault(objInfoCuenta.tcbNumeroCuenta)}
                                </Typography>
                            </Stack>

                            <Divider orientation='vertical'/>

                            <Stack direction="row" alignItems="center" gap={.5}>
                                <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                    Tipo:
                                </Typography>
                                <Typography variant='body1' color="text.secondary">
                                    {`${GetValueOrDefault(objInfoCuenta.tcbEntidad)} / ${GetValueOrDefault(objInfoCuenta.tcbTipoCuenta)}`}
                                </Typography>
                            </Stack>
                        </Stack>

                                
                        <Stack direction="row" gap={.5} divider={<Divider orientation='vertical' sx={{height:"100%"}}/>}>
                            <Stack direction="row" gap={.5} alignItems="center">
                                <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                    Sucursal principal:
                                </Typography>
                                <Typography variant='body1' color="text.secondary">
                                    {SucursalPrincipalGeneral && SucursalPrincipalGeneral.length > 0 ? SucursalPrincipalGeneral[0].sucNombre : "Sin información"}
                                </Typography>
                            </Stack>
                            {
                                (Configs && Config_CTB_MATRICULARIESGOS?.configValor == 1) &&
                                <>
                                    <Stack direction="row" alignItems="center" gap={.5}>
                                        <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                        Matrícula riesgos:
                                        </Typography>
                                        <Typography variant='body1' color="text.secondary">
                                            {GetValueOrDefault(objInfoCuenta.tcbEstadoMatriculaRiesgoDesc)}
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" alignItems="center" gap={.5}>
                                        <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                            Estado:
                                        </Typography>
                                        <Typography variant='body1' color="text.secondary">
                                            {GetValueOrDefault(objInfoCuenta.tcbEstadoMatriculaRiesgo)}
                                        </Typography>
                                    </Stack>
                                </>
                            }
                            
                        </Stack>
                        {
                            Expandida == false &&
                            <FormGroup>
                                <FormControlLabel 
                                    control={
                                        <Switch 
                                            onChange={(event,checked)=> CambiarEstadoCuenta(event,checked)} 
                                            defaultChecked={objInfoCuenta.tcbActiva} 
                                        />} 
                                    label="Activa" />
                            </FormGroup>
                        }
                    </Stack>
                    <IconButton 
                        onClick={() => Expandida == true ? CambiarCuentaSeleccionada() : CambiarCuentaSeleccionada(objInfoCuenta)} 
                        color='primary' 
                        size='small' >
                        {
                            Expandida == true ? 
                            <ExpandLessOutlined/> :
                            <ExpandMoreOutlined/>
                        }
                    </IconButton>
                </Stack>

                {
                    Expandida == true &&
                    <InformacionCuentaExpandida_Visualizacion/>
                }
            </Stack>
        </Card>
    </>
  )
}
