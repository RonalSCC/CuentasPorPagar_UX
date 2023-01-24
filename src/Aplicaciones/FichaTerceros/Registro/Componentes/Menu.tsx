import { AccountBalanceOutlined, ContentCopy, ContentCut, ContentPaste, ExpandLessRounded, ExpandMoreRounded, GroupOutlined, LocalOfferOutlined, MenuOpenOutlined, MenuOutlined, PercentOutlined, Person, PersonOutlined, ReceiptLongOutlined, SettingsOutlined } from '@mui/icons-material'
import { Badge, Fab, IconButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, MenuList, Paper, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
            paddingY={3} 
            justifyContent={"center"} 
            width="100%"
        >
            <Stack flexWrap={'wrap'} direction="row" paddingRight={1.5} paddingLeft={3} width="100%">
            {
                expandido == true &&
                <Stack flexWrap={'wrap'} direction="column" width={"80%"}>
                    <Stack direction="row" alignItems="center" gap={1} width="100%">
                        <Badge variant='dot' color='success'/>
                        <Typography overflow="hidden" noWrap textOverflow={"ellipsis"} variant='subtitle2' color="primary.main">
                            Ronal Santiago Castaño Chaparro
                        </Typography>
                    </Stack>
                    <Stack width="100%">
                        <Typography overflow="hidden" noWrap textOverflow={"ellipsis"} variant='caption' color="text.primary">
                            ID: 1012  C.C.: 1001277214
                        </Typography>
                    </Stack>
                </Stack>   
            }
                

                <Fab 
                    variant='extended' 
                    size='small'
                    color='primary'
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
        
        <Paper sx={{ width: "100%"}} elevation={0}>
            <MenuList>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <PersonOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu} onClick={() => CambiarOpcionMenuSeleccionada("InformacionGeneral")}>Información general</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <GroupOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Contactos</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <AccountBalanceOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu} onClick={() => CambiarOpcionMenuSeleccionada("CuentasBancarias")}>Cuentas bancarias</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <PercentOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Configuración tributaría</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <LocalOfferOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Registro de descuentos</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <ReceiptLongOutlined {...PropsIconMenu}/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Constitución</ListItemText>
                </MenuItem>
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
                    <>
                        <MenuItem {...PropsMenu}>
                            <ListItemIcon {...PropsItemIcon}>
                            </ListItemIcon>
                            <ListItemText 
                                {...PropsTextMenu}
                                disableTypography
                                primary={<Typography variant="body2" color={"text.secondary"}>Documentos de tercero</Typography>}
                            >
                            </ListItemText>
                        </MenuItem>
                        <MenuItem {...PropsMenu}>
                            <ListItemIcon {...PropsItemIcon}>
                            </ListItemIcon>
                            <ListItemText 
                                {...PropsTextMenu}
                                disableTypography
                                primary={<Typography variant="body2" color={"text.secondary"}>Embargo / Endoso</Typography>}
                            >
                            </ListItemText>
                        </MenuItem>
                    </>:
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

            
        </Paper>
    </>
  )
}
