import { Add } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Fab, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import ModalFormNuevaCuenta from './_ModalFormNuevaCuenta';
import SinCuentas from './SinCuentas';
import VisualizacionCuentas from './VisualizacionCuentas';

export default function Cuentas() {
    const [dialogNuevaCuentaAbierta, setDialogNuevaCuentaAbierta] = useState(false);
    const [ListCuentasBancarias, setListCuentasBancarias] = useState<Array<any>>([1]);

    const CerrarDialogNuevaCuenta = () => {
        setDialogNuevaCuentaAbierta(false);
    }

    const AbrirDialogNuevaCuenta = () => {
        setDialogNuevaCuentaAbierta(true);
    }
  return (
    <>
        {
            (!ListCuentasBancarias || ListCuentasBancarias.length == 0) ?
            <SinCuentas />:
            <VisualizacionCuentas />
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

        <ModalFormNuevaCuenta 
            DialogAbierto={dialogNuevaCuentaAbierta} 
            CerrarDialog={CerrarDialogNuevaCuenta} 
        />
    </>
  )
}
