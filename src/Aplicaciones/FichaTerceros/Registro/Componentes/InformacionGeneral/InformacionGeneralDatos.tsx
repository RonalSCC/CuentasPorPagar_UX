import { Add, Edit } from '@mui/icons-material'
import Search from '@mui/icons-material/Search'
import { Alert, AlertTitle, Button, Chip, Divider, FormControl, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import React from 'react'

export default function InformacionGeneralDatos(props:any) {
  return (
    <>
        {/* -------------------------------- */}
        <Stack {...props} direction="row" width="100%">
            <Stack direction="column" gap={3} padding={3} width="100%" sx={{backgroundColor:"white"}}>
                <Stack direction="column" gap={1.5}>
                    <Stack direction="row"  gap={3}>
                        <Typography variant="h6" color="text.primary">
                            Información general
                        </Typography>

                        <Button 
                            size='medium' 
                            variant="outlined"
                            startIcon={ <Edit /> }
                        >
                            Editar
                        </Button>
                    </Stack>

                    <Stack direction="column" gap={1}>
                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Tipo de persona:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Natural
                                </Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center">
                                <FormControl disabled fullWidth component="fieldset">
                                    <FormControlLabel
                                        control={
                                            <Switch name="Estado" />
                                        }
                                        label="Activo"
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>   

                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Primer nombre:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Ronal
                                </Typography>
                            </Stack>

                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Segundo nombre:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Castaño
                                </Typography>
                            </Stack>
                        </Stack> 

                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Primer apellido:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Castaño
                                </Typography>
                            </Stack>

                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Segundo apellido:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Chaparro
                                </Typography>
                            </Stack>
                        </Stack> 

                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Número de identificación:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    C.C.: 1014296897 - 9
                                </Typography>
                            </Stack>

                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Forma de pago:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Contado
                                </Typography>
                            </Stack>
                        </Stack> 

                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Ciudad:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Bogotá D.C.
                                </Typography>
                            </Stack>

                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Dirección:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Carrera 94 i # 84 - 48
                                </Typography>
                            </Stack>
                        </Stack> 

                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Tipo:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Cliente y proveedor
                                </Typography>
                            </Stack>

                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Sub-tipo:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    -
                                </Typography>
                            </Stack>
                        </Stack> 

                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Actividad económica:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    -
                                </Typography>
                            </Stack>

                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Correo eléctronico:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    ronal.castano@sinco.com.co
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Télefono:
                                </Typography>
                                <Chip size='small' label="6789076" />
                            </Stack>

                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Celular:
                                </Typography>
                                <Chip size='small' label="3245859050" />
                                {/* <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    3245859050
                                </Typography> */}
                            </Stack>
                        </Stack>

                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Observaciones:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </Typography>
                            </Stack>
                        </Stack>

                    </Stack>

                    <Divider/>

                    <Stack direction="column" gap={1.5}>
                        <Typography variant="subtitle2" color="primary.light">
                            Contacto principal
                        </Typography>

                        <Stack direction="row" alignItems="center">
                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Nombre:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    Ronal Santiago Castaño Chaparro
                                </Typography>
                            </Stack>

                            <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                    Correo eléctronico:
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.primary">
                                    ronal.castano@sinco.com.co
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Divider/>

                    <Stack direction="column"  gap={1.5}>
                        <Typography variant="subtitle2" color="primary.light">
                            Representante legal
                        </Typography>

                        <Stack direction="column" gap={1}>
                            <Stack direction="row" alignItems="center">
                                <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                    <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                        Nombre:
                                    </Typography>
                                    <Typography textAlign={"center"} variant="body2" color="text.primary">
                                        Ronal Santiago Castaño Chaparro
                                    </Typography>
                                </Stack>

                                <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                    <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                        Número de identificación:
                                    </Typography>
                                    <Typography textAlign={"center"} variant="body2" color="text.primary">
                                        10143566789
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center">
                                <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                    <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                        Lugar de expedición:
                                    </Typography>
                                    <Typography textAlign={"center"} variant="body2" color="text.primary">
                                        Bogotá D.C.
                                    </Typography>
                                </Stack>

                                <Stack gap={.5} direction="row" width="50%" alignItems="center">
                                    <Typography textAlign={"center"} variant="subtitle2" color="text.primary">
                                        Correo eléctronico:
                                    </Typography>
                                    <Typography textAlign={"center"} variant="body2" color="text.primary">
                                        ronal.castano@sinco.com.co
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Alert severity="info">
                        Estudio de seguridad sin diligenciar
                    </Alert>   

                    <Stack direction="column">
                        <Stack direction="row" gap={.5}>
                            <Typography textAlign={"center"} variant="caption" color="text.primary">
                                Fecha de creación:
                            </Typography>
                            <Typography textAlign={"center"} variant="caption" color="text.primary">
                                Viviana Contreras Torres - 03/03/2017 08:57:00 a.m.
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Typography textAlign={"center"} variant="caption" color="text.primary">
                                Última modificación:
                            </Typography>
                            <Typography textAlign={"center"} variant="caption" color="text.primary">
                                Implementación Sincosoft - 03/03/2017 08:57:00 a.m.
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    </>
  )
}
