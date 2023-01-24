import { Add, Edit, Search } from '@mui/icons-material'
import { Badge, Button, Divider, FormControl, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
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
    
  return (
    <>
        <Stack 
            direction="row" 
            width="100%"
            justifyContent="space-between" 
            height="100%"
        >
            <Stack 
                direction="column" 
                position={"sticky"}
                alignItems={expandido ? "flex-end" : "center"} 
                gap={2}
                top={"10%"}
                height={"fit-content"}
                left={0}
                width={expandido ? "21%" : "7%"}
            >
                <Menu expandido={expandido} expandirMenu={ExpandirMenu}/>
                <Divider orientation='vertical'/>
            </Stack>
            <Divider orientation='vertical'/>

            <Stack direction="column" width={expandido ? "79%" : "93%"} >
                {
                    !expandido &&
                    <Stack 
                        top={"5%"} 
                        height={"fit-content"} 
                        direction="row" 
                        paddingY={1.5} 
                        paddingX={3} 
                        gap={1.5}
                        sx={{
                            backgroundColor: "background.paper"
                        }}
                    >
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
                    </Stack>
                }
                
                
                <Stack height="100%" direction="row"  paddingY={expandido ? 2 : 0} paddingX={2}>
                    <RoutesMarcoTerceroElement />
                </Stack>
            </Stack>
        </Stack>
    </>
  )
}
