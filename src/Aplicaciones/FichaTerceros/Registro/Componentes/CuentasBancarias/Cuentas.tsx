import { Add } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Fab, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import FormNuevaCuenta from './FormNuevaCuenta';
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
            (!ListCuentasBancarias || ListCuentasBancarias.length == 1) ?
            <SinCuentas />:
            <VisualizacionCuentas />
        }

        <Fab  
            onClick={AbrirDialogNuevaCuenta}
            variant='extended' 
            size='medium' 
            sx={{
                backgroundColor:"secondary.main",
                position:"fixed",
                bottom: "24px",
                right: "24px"
            }} 
            color="secondary"
        >
            <Add sx={{color:'secondary.contrast'}}/>
            Nueva cuenta bancaria   
        </Fab>

        <FormNuevaCuenta 
            DialogAbierto={dialogNuevaCuentaAbierta} 
            CerrarDialog={CerrarDialogNuevaCuenta} 
        />
    </>
  )
}
