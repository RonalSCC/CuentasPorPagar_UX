import { Delete, DeleteOutline, Edit, EditOutlined, ExpandMore, ExpandMoreOutlined, LabelImportant } from '@mui/icons-material'
import { Button, Card, CardContent, Checkbox, Chip, Divider, FormControlLabel, FormGroup, IconButton, Stack, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import Image from 'mui-image';
import CuentaPorSucursal_Visualizacion from './CuentaPorSucursal_Visualizacion';
import InformacionCuentaExpandida_Visualizacion from './InformacionCuentaExpandida_Visualizacion';
import CardCuenta from './CardCuenta';

export default function VisualizacionCuentas() {

    const [CuentaExpandidaID, setCuentaExpandidaID] = useState<number|null>(null);

    const CambiarCuentaExpandida = (CuentaID:number)=>{
        setCuentaExpandidaID(CuentaID);
    }
  return (
    <>
        <Stack direction="column" gap={3} padding={3} width="100%">
            <Stack direction="column" gap={1.5} >
                <CardCuenta 
                    objInfoCuenta={{ID:1}}
                    CambiarCuentaExpandida={CambiarCuentaExpandida} 
                    Expandida={CuentaExpandidaID==1}
                />
                <CardCuenta 
                    objInfoCuenta={{ID:2}}
                    CambiarCuentaExpandida={CambiarCuentaExpandida}
                    Expandida={CuentaExpandidaID==2}
                />
                <CardCuenta 
                    objInfoCuenta={{ID:3}}
                    CambiarCuentaExpandida={CambiarCuentaExpandida}
                    Expandida={CuentaExpandidaID==3}
                />
            </Stack>
        </Stack>
    </>
  )
}
