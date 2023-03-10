import { Add } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Fab, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import ModalFormNuevaCuenta from './_ModalFormEditarCrearCuenta';
import SinCuentas from './SinCuentas';
import VisualizacionCuentas from './VisualizacionCuentas';
import { CuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasContexto';
import { paramsCuentasBancariasContexto } from '../../../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor';

export default function Cuentas() {

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
        {
            (!ListCuentasBancarias || ListCuentasBancarias.length == 0) ?
            <VisualizacionCuentas />: 
            <SinCuentas />
        }

            <Fab
                onClick={AbrirDialogNuevaCuenta}
                variant='extended'
                size='medium'
                sx={{
                    backgroundColor: "secondary.main",
                    position: "fixed",
                    bottom: "24px",
                    right: "24px"
                }}
                color="secondary"
            >
                <Add sx={{ color: 'secondary.contrast' }} />
                Nueva cuenta bancaria
            </Fab>

        <ModalFormNuevaCuenta />
    </>
  )
}
