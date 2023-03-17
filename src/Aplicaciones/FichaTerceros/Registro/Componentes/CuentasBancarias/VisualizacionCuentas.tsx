import { Delete, DeleteOutline, Edit, EditOutlined, ExpandMore, ExpandMoreOutlined, LabelImportant } from '@mui/icons-material'
import { Alert, AlertTitle, Button, Card, CardContent, Checkbox, Chip, Divider, FormControlLabel, FormGroup, IconButton, Stack, Switch, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'mui-image';
import CuentaPorSucursal_Visualizacion from './CuentaPorSucursal_Visualizacion';
import InformacionCuentaExpandida_Visualizacion from './InformacionCuentaExpandida_Visualizacion';
import CardCuenta from './CardCuenta';
import { ICuentaBancaria } from '../../../Interfaces/Registro/CuentasBancarias/ICuentaBancaria';
import { CrearPeticion } from '../../../../../Consumos/APIManager';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';
import { CuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasContexto';
import { paramsCuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor';
import { SendRequest } from '../../../../../Consumos/Request';

export default function VisualizacionCuentas() {

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {paramsCuentasBancariasContexto}:{paramsCuentasBancariasContexto:paramsCuentasBancariasContexto} = useContext<any>(CuentasBancariasContexto);
    const {
        CambiarCuentaSeleccionada, 
        CuentaExpandida,
        ActualizarCuentas
    } = paramsCuentasBancariasContexto;

    const [ListaCuentas, setListaCuentas] = useState<Array<ICuentaBancaria>>([])

    useEffect(() => {
      ConsultarInformacionCuentas();
    }, [])

    useEffect(() => {
        if (ActualizarCuentas) {
            setListaCuentas([]);
            ConsultarInformacionCuentas();
        }
    }, [ActualizarCuentas]);
    

    const ConsultarInformacionCuentas = async () => {
        SendRequest.get({
            API: "CUENTASPORPAGAR",
            URLServicio: "/CuentasBancariasTerceros/Consultar_TerceroCuentasBancarias",
            Body:{
                usuarioID: 1,
                terId: propsTercerosContexto.TerceroSeleccionadoLista?.TerID
            }
          }).then((respuesta)=> {
            if(respuesta){
                if (respuesta != null && respuesta.ok == true) {
                    setListaCuentas([...respuesta.datos]);
                }else if (respuesta.errores && respuesta.errores.length > 0) {
                    propsTercerosContexto.CambiarAlertas(
                        respuesta.errores.map(x=> {
                            return <>
                            <Alert 
                                key={x.descripcion} 
                                severity="warning"
                                onClose={()=> propsTercerosContexto.CerrarAlertas()}
                            >
                                <AlertTitle>Error</AlertTitle>
                                {x.descripcion}
                            </Alert>
                            </>;
                        })
                    );
                }
            }
          });
    }
    
  return (
    <>
        <Stack direction="column" gap={3} padding={3} width="100%">
            <Stack direction="column" gap={1.5} >
                {
                    ListaCuentas.map(Cuenta => {
                        return <CardCuenta 
                                    key={Cuenta.tcbId}
                                    objInfoCuenta={Cuenta}
                                    Expandida={CuentaExpandida?.tcbId == Cuenta.tcbId}
                                />;
                    })
                }
            </Stack>
        </Stack>
    </>
  )
}
