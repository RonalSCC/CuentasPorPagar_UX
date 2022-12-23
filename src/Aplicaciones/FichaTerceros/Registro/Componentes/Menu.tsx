import { AccountBalanceOutlined, ContentCopy, ContentCut, ContentPaste, ExpandLessRounded, ExpandMoreRounded, GroupOutlined, LocalOfferOutlined, MenuOpenOutlined, MenuOutlined, PercentOutlined, Person, PersonOutlined, ReceiptLongOutlined, SettingsOutlined } from '@mui/icons-material'
import { Fab, IconButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, MenuList, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

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
    
    const AbrirMenuEmergente_ConfigAvanzada = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const CerrarMenuEmergente_ConfigAvanzada = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const PropsMenu: Record<string, any> = {
        sx:{
            padding:"8px 16px",
            display:"flex",
            justifyContent: "center"
        }
    };
    
    const PropsTextMenu: Record<string, any> = {
        primaryTypographyProps:{
            variant:"body1", 
            color:"text.secondary"
        },
        sx:{
            paddingY: "4px"
        },
        hidden: !expandido
    };

    const PropsItemIcon: Record<string, any> = {
        sx:{
            ...(!expandido && {
                display: "flex",
                justifyContent: "center"
            })
        }
    };
      
  return (
    <>
        <Fab 
            variant='extended' 
            size='small'
            color='primary'
            onClick={()=> { expandirMenu()}}
        >
            {
                expandido ?
                    <MenuOpenOutlined /> :
                    <MenuOutlined/>
            }
        </Fab>
        <Paper sx={{ width: "100%"}} elevation={0}>
            <MenuList>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <PersonOutlined/>
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Información general</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <GroupOutlined />
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Contactos</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <AccountBalanceOutlined />
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Cuentas bancarias</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <PercentOutlined />
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Configuración tributaría</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <LocalOfferOutlined />
                    </ListItemIcon>
                    <ListItemText {...PropsTextMenu}>Registro de descuentos</ListItemText>
                </MenuItem>
                <MenuItem {...PropsMenu}>
                    <ListItemIcon {...PropsItemIcon}>
                        <ReceiptLongOutlined />
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
                        <SettingsOutlined/>
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
