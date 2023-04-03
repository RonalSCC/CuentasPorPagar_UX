import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle, Fab, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import ModalFormNuevaCuenta from './_ModalFormEditarCrearCuenta';
import SinCuentas from './SinCuentas';
import VisualizacionCuentas from './VisualizacionCuentas';
import { CuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasContexto';
import { paramsCuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor';
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import SinInformacion from '../Generales/SinInformacion';

export default function Cuentas() {

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const { 
    BloquearCamposAcceso 
    } = propsTercerosContexto;

    const {paramsCuentasBancariasContexto}:{paramsCuentasBancariasContexto:paramsCuentasBancariasContexto} = useContext<any>(CuentasBancariasContexto);
    const {
        CambiarCuentaSeleccionada, 
        CuentaExpandida,
        CambiarEstadoModalCrearEditar
    } = paramsCuentasBancariasContexto;
    
    const [ListCuentasBancarias, setListCuentasBancarias] = useState<Array<any>>();

    const CerrarDialogNuevaCuenta = () => {
        CambiarEstadoModalCrearEditar(false);
    }

    const AbrirDialogNuevaCuenta = () => {
        CambiarCuentaSeleccionada();
        CambiarEstadoModalCrearEditar(true);
    }
  return (
    <>
        <Stack alignItems={"flex-start"} width="100%" height={"100%"}>
            <Button
                disabled={BloquearCamposAcceso("CBCrearCuenta")}
                startIcon={<Add/>}
                onClick={()=> AbrirDialogNuevaCuenta()}
                sx={{
                    marginBottom: "1%"
                }}
            >
                Nueva cuenta bancaria
            </Button>

            <VisualizacionCuentas />

        </Stack>

        <ModalFormNuevaCuenta />
    </>
  )
}
