import styled from '@emotion/styled';
import { AccountBalanceOutlined, ContentCopy, ContentCut, ContentPaste, ExpandLessRounded, ExpandMoreRounded, GroupOutlined, LocalOfferOutlined, MenuOpenOutlined, MenuOutlined, PercentOutlined, Person, PersonOutlined, ReceiptLongOutlined, SettingsOutlined } from '@mui/icons-material'
import { Badge, Fab, IconButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, MenuList, Paper, Stack, Tooltip, Typography, withStyles } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TercerosContexto } from '../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../Contextos/TercerosProveedor';
import { MarcoTerceroContexto } from '../Contextos/MarcoTerceroContexto';

export default function MenuInformacionGeneral(
    {
        expandido,
        expandirMenu
    }:
    {
        expandido:boolean,
        expandirMenu: Function
    }
) {
    const [configuracionAvanzadaExpandida, setConfiguracionAvanzadaExpandida] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {propsMarcoTercero}:{propsMarcoTercero:any} = useContext<any>(MarcoTerceroContexto);
    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {TerceroSeleccionadoLista} = propsTercerosContexto;

    
    const navigate = useNavigate();
    const AbrirMenuEmergente_ConfigAvanzada = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const CerrarMenuEmergente_ConfigAvanzada = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const PropsMenu: Record<string, any> = {
        sx:{
            paddingTop:.5,
            paddingRight:1.5,
            paddingBottom:.5,
            paddingLeft:3,

            display:"flex",
            justifyContent: "center"
        }
    };
    
    const PropsTextMenu: Record<string, any> = {
        primaryTypographyProps:{
            variant:"body1", 
            color:"text.primary"
        },
        sx:{
            paddingY: "4px"
        },
        hidden: !expandido
    };

    const PropsIconMenu : Record<string, any> = {
        fontSize:"small"
    };

    const PropsItemIcon: Record<string, any> = {
        sx:{
            ...(!expandido && {
                display: "flex",
                justifyContent: "center"
            })
        }
    };
      
    const CambiarOpcionMenuSeleccionada = (nuevaRuta:string)=>{
        navigate(nuevaRuta);
    }

  return (
    <>
        <Stack 
            direction="row" 
            justifyContent={"center"} 
            width="100%"
        >
            <Stack flexWrap={'wrap'} gap={2.5} direction="row" paddingRight={1.5} paddingLeft={3} width="100%">
            {
                expandido == true &&
                <Stack flexWrap={'wrap'} direction="column" width={"70%"}>
                    <Stack direction="row" alignItems="center" gap={1} width="100%">
                        <Badge variant='dot' color='success'/>
                        <Typography overflow="hidden" noWrap textOverflow={"ellipsis"} variant='subtitle2' color="primary.main">
                            {TerceroSeleccionadoLista?.TerNombre}
                        </Typography>
                    </Stack>
                    <Stack width="100%">
                        <Typography overflow="hidden" noWrap textOverflow={"ellipsis"} variant='caption' color="text.primary">
                            {/* ID: 1012  C.C.: 1001277214 */}
                            {`ID: ${TerceroSeleccionadoLista?.TerID} ${TerceroSeleccionadoLista?.TerTipoIden}: ${TerceroSeleccionadoLista?.TerNit}` }
                        </Typography>
                    </Stack>
                </Stack>   
            }
                

                <Fab 
                    variant='extended' 
                    size='small'
                    color='secondary'
                    onClick={()=> { expandirMenu()}}
                    sx={{width: expandido ? "20%": "100%"}}
                >
                    {
                        expandido ?
                            <MenuOpenOutlined /> :
                            <MenuOutlined/>
                    }
                </Fab>
            </Stack>
            
        </Stack>
        
        <Stack direction={"column"} sx={{ width: "100%"}} >
            <MenuList>
                <MenuItem {...PropsMenu} onClick={() => { CambiarOpcionMenuSeleccionada("InformacionGeneral")}}>
                    <ListItemIcon {...PropsItemIcon}>
                        <PersonOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu} >Información general</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu} onClick={() => { CambiarOpcionMenuSeleccionada("Contactos")}}>
                    <ListItemIcon {...PropsItemIcon}>
                        <GroupOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu} >Contactos</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu} onClick={() => {CambiarOpcionMenuSeleccionada("CuentasBancarias")}}>
                    <ListItemIcon {...PropsItemIcon}>
                        <AccountBalanceOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu} >Cuentas bancarias</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu} onClick={() => {CambiarOpcionMenuSeleccionada("ConfiguracionTributaria")}}>
                    <ListItemIcon {...PropsItemIcon}>
                        <PercentOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu} >Configuración tributaría</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu} onClick={() => {CambiarOpcionMenuSeleccionada("RegistroDeDescuentos")}}>
                    <ListItemIcon {...PropsItemIcon}>
                        <LocalOfferOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu} >Registro de descuentos</ListItemText>
                </MenuItem>
                {/* <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <ReceiptLongOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Constitución</ListItemText>
                </MenuItem> */}
                <MenuItem 
                    {...PropsMenu}
                    onClick={
                        (e:any) => {
                            if (expandido) {
                                setConfiguracionAvanzadaExpandida(!configuracionAvanzadaExpandida);
                            }else{
                                AbrirMenuEmergente_ConfigAvanzada(e)
                            }
                        }
                    }  
                >
                    <ListItemIcon {...PropsItemIcon}>
                        <SettingsOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Configuración <br /> avanzada</ListItemText>
                    {
                        expandido &&
                            <ListItemSecondaryAction >
                                <IconButton
                                    sx={{color: "action.active"}}
                                >
                                    {
                                        !configuracionAvanzadaExpandida ? 
                                        <ExpandMoreRounded /> :
                                        <ExpandLessRounded />
                                    }
                                </IconButton>
                            </ListItemSecondaryAction>
                    }
                    
                </MenuItem>
                {
                    configuracionAvanzadaExpandida ? 
                    [
                        <MenuItem key={"DocumentosTercero"} {...PropsMenu}  onClick={() => CambiarOpcionMenuSeleccionada("DocumentosDeTerceros")}>
                            <ListItemIcon {...PropsItemIcon}>
                            </ListItemIcon>
                            <ListItemText 
                                {...PropsTextMenu}
                                disableTypography
                                primary={
                                <Typography variant="body2" color={"text.secondary"}>
                                    Documentos de tercero
                                </Typography>}
                            >
                            </ListItemText>
                        </MenuItem>,
                        <MenuItem key={"Embargo / Endoso"} {...PropsMenu} onClick={() => CambiarOpcionMenuSeleccionada("EmbargoEndoso")}>
                            <ListItemIcon {...PropsItemIcon}>
                            </ListItemIcon>
                            <ListItemText 
                                {...PropsTextMenu}
                                disableTypography
                                primary={<Typography variant="body2" color={"text.secondary"}
                                >Embargo / Endoso</Typography>}
                            >
                            </ListItemText>
                        </MenuItem>
                    ]:
                    <Menu
                        id="menuConfiguracionAvanzada"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={CerrarMenuEmergente_ConfigAvanzada}
                    >
                        <MenuItem onClick={CerrarMenuEmergente_ConfigAvanzada}>
                            <Typography variant="body2" color="text.primary">
                                Documentos tercero
                            </Typography>
                            
                        </MenuItem>
                        <MenuItem onClick={CerrarMenuEmergente_ConfigAvanzada}>
                            <Typography variant="body2" color="text.primary">
                                Embargo / Endoso
                            </Typography>
                        </MenuItem>
                    </Menu>
                }
            </MenuList>
        </Stack>
    </>
  )
}
