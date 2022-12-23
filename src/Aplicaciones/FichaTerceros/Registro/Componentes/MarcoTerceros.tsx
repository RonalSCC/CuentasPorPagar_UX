import { Add, Edit, Search } from '@mui/icons-material'
import { Button, FormControl, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import BuscarTerceroDialog from './BuscarTerceroDialog'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'

// ---------------- Context ---------------------
import InformacionGeneralDatos from './InformacionGeneral/InformacionGeneralDatos'
import { TercerosContexto } from '../../Contextos/TercerosContexto'
import { RoutesMarcoTerceroElement } from '../Route'

export default function InformacionGeneral(
    {
        RegistrarNuevoTercero
    }:
    {
        RegistrarNuevoTercero:Function
    }
) {
    const [expandido, setExpandido] = useState(true);
    const [buscarTerceroDialog, setBuscarTerceroDialog] = useState(false);
    const [terceroConsultado, setterceroConsultado] = useState({});

    const {propsTercerosContexto}:{propsTercerosContexto:any} = useContext<any>(TercerosContexto);

    useEffect(() => {
        BuscarTerceroAPI(propsTercerosContexto.terceroIDSeleccionado)
    }, [propsTercerosContexto.terceroIDSeleccionado])
    
    const BuscarTerceroAPI = (IDtercero: number)=> {
        
    }
    const ExpandirMenu = ()=>{
        setExpandido(!expandido);
    }

    const AbrirDialogBuscarTercero= (estado:boolean) => {
        setBuscarTerceroDialog(estado);
    }

    const CerrarDialogBuscarTercero = ()=>{
        setBuscarTerceroDialog(false);
    }
  return (
    <>
        <Stack direction="row" paddingX={3} justifyContent="flex-end">
            <Stack 
                direction="column" 
                position={"sticky"} 
                paddingY={1.5} 
                alignItems={expandido ? "flex-end" : "center"} 
                gap={2}
                top={0}
                height={"fit-content"}
                left={0}
                width={expandido ? "21%" : "7%"}
            >
                <Menu expandido={expandido} expandirMenu={ExpandirMenu}/>
            </Stack>
            <Stack direction="column" width={expandido ? "79%" : "93%"} justifyContent="flex-end">
                <Stack 
                    top={0} 
                    height={"fit-content"} 
                    position="sticky" 
                    justifyContent="flex-end"
                    direction="row" 
                    paddingY={1.5} 
                    paddingX={2} 
                    gap={1.5} 
                >
                    <Button 
                        variant="outlined"
                        startIcon={ <Search /> }
                        sx={{
                            zIndex: 1,
                            backgroundColor: "white"
                        }}
                        onClick={()=> AbrirDialogBuscarTercero(true)}
                    >
                        Buscar tercero
                    </Button>

                    <Button 
                        variant="contained"
                        startIcon={ <Add /> }
                        onClick={()=> RegistrarNuevoTercero(true)}
                    >
                        Crear tercero
                    </Button>
                </Stack>
                
                <Stack id="ContenedorAll" direction="row">
                    <RoutesMarcoTerceroElement/>
                </Stack>
            </Stack>
            
            <BuscarTerceroDialog 
                DialogAbierto={buscarTerceroDialog}
                CerrarBuscarTercero={CerrarDialogBuscarTercero}
            />
        </Stack>
    </>
  )
}
