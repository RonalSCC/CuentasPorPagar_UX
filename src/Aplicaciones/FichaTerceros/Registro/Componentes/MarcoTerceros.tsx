import { Add, Edit, Search } from '@mui/icons-material'
import { Badge, Button, FormControl, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import BuscarTerceroDialog from './BuscarTerceroDialog'
import Menu from './Menu'
import { Outlet, useNavigate } from 'react-router-dom'

// ---------------- Context ---------------------
import InformacionGeneralDatos from './InformacionGeneral/InformacionGeneralDatos'
import { TercerosContexto } from '../../Contextos/TercerosContexto'
import { MarcoTerceroContexto } from '../Contextos/MarcoTerceroContexto'
import { RoutesMarcoTerceroElement } from '../Route'

export default function InformacionGeneral() {
    const [expandido, setExpandido] = useState(true);
    const [buscarTerceroDialog, setBuscarTerceroDialog] = useState(false);
    const [terceroConsultado, setterceroConsultado] = useState({});
    const {propsTercerosContexto}:{propsTercerosContexto:any} = useContext<any>(TercerosContexto);
    const {propsMarcoTercero}:{propsMarcoTercero:any} = useContext<any>(MarcoTerceroContexto);


    const navigate = useNavigate();

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
        <Stack 
            direction="row" 
            paddingX={3} 
            justifyContent="space-between" 
            height="100%"
        >
            <Stack 
                direction="column" 
                position={"sticky"} 
                paddingY={3} 
                alignItems={expandido ? "flex-end" : "center"} 
                gap={2}
                top={0}
                height={"fit-content"}
                left={0}
                width={expandido ? "21%" : "7%"}
            >
                <Menu expandido={expandido} expandirMenu={ExpandirMenu}/>
            </Stack>

            <Stack direction="column" width={expandido ? "77%" : "93%"} justifyContent="flex-start" >
                <Stack 
                    top={0} 
                    height={"fit-content"} 
                    position="sticky" 
                    justifyContent={!expandido ? "space-between":"flex-end"}
                    direction="row" 
                    padding={3} 
                    gap={1.5}
                    sx={{
                        backgroundColor: "background.paper"
                    }}
                >
                    {
                        !expandido &&
                        <Stack direction="row" alignItems={"center"} gap={1} >
                            <Badge variant='dot' color='success'>

                            </Badge>
                            <Typography variant='subtitle2' color="primary.main">
                                Ronal Santiago Castaño Chaparro
                            </Typography>

                            <Typography variant='caption' color="text.primary">
                                ID: 1012 C.C.: 1001277214
                            </Typography>
                        </Stack>
                    }
                    
                    <Stack gap={1.5} direction="row">
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
                            onClick={()=> propsTercerosContexto.CambiarEstadoNuevoRegistro(true)}
                        >
                            Crear tercero
                        </Button>
                    </Stack>
                </Stack>
                
                <Stack height="100%" direction="row">
                    <RoutesMarcoTerceroElement />
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
