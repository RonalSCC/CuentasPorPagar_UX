import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material'
import { Card, CardContent, Chip, Divider, FormControlLabel, FormGroup, IconButton, Stack, Switch, Typography } from '@mui/material'
import React from 'react'
import InformacionCuentaExpandida_Visualizacion from './InformacionCuentaExpandida_Visualizacion'

export default function CardCuenta(
    {
        objInfoCuenta,
        CambiarCuentaExpandida,
        Expandida = false
    }:
    {
        objInfoCuenta:any,
        CambiarCuentaExpandida:Function,
        Expandida?:boolean 
    }
) {
  return (
    <>
        <Card>
            <Stack paddingX={2}>
                <Stack direction="column" padding={2}>
                    <Stack direction="row" gap={1.5}>
                        <Stack direction="column" gap={1} width="95%">
                            {/* Contenido */}
                            <Stack direction="column">
                                <Stack direction="row" gap={1.5}>
                                    <Chip 
                                        size='small' 
                                        color='info' 
                                        label="ID: 1025" 
                                        variant="outlined"
                                    />

                                    <Stack direction="row" alignItems="center" gap={.5}>
                                        <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                            Cuenta No.:
                                        </Typography>
                                        <Typography variant='body1' color="text.secondary">
                                            23474859500
                                        </Typography>
                                    </Stack>

                                    <Divider orientation='vertical'/>

                                    <Stack direction="row" alignItems="center" gap={.5}>
                                        <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                            Tipo:
                                        </Typography>
                                        <Typography variant='body1' color="text.secondary">
                                            Banco de Bogotá S.A. / Ahorros
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction="row" gap={.5}>
                                    <Typography variant='subtitle2' fontWeight={500} color="text.primary">
                                        Sucursal principal:
                                    </Typography>
                                    <Typography variant='body1' color="text.secondary">
                                        ETB ULTIMA MILLA - AAA 2022 - OCT 4600019082
                                    </Typography>
                                </Stack>
                            </Stack>

                            {
                                2*2 == 5 &&
                                <FormGroup>
                                    <FormControlLabel control={<Switch defaultChecked />} label="Activa" />
                                </FormGroup>
                            }
                            
                        </Stack>
                        
                        <IconButton color='primary' size='small' >
                            {
                                Expandida == true ? 
                                <ExpandLessOutlined onClick={() => CambiarCuentaExpandida(null)}/> :
                                <ExpandMoreOutlined onClick={() => CambiarCuentaExpandida(objInfoCuenta.ID)}/>

                            }
                        </IconButton>
                    </Stack>
                    

                    {
                        Expandida == true &&
                        <InformacionCuentaExpandida_Visualizacion />
                    }
                </Stack>
            </Stack>
        </Card>
    </>
  )
}
