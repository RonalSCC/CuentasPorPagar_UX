import { Add, Edit } from '@mui/icons-material'
import Search from '@mui/icons-material/Search'
import { Alert, AlertTitle, Button, Chip, Divider, FormControl, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'
import CampoValorInfoGeneral from './CampoValorInfoGeneral'

export default function InformacionGeneralDatos(props:any) {
    const navigate = useNavigate();

    const {propsTercerosContexto}:{propsTercerosContexto:any} = useContext<any>(TercerosContexto);

    const EditarInformacionGeneral = ()=> {
        navigate("EditarInformacionGeneral");
    }
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
                            onClick={EditarInformacionGeneral}
                        >
                            Editar
                        </Button>
                    </Stack>

                    <Stack direction="column" gap={1}>
                        <Stack direction="row" alignItems="center">
                            <CampoValorInfoGeneral
                                Campo="Tipo de persona:"
                                Valor="Natural"
                            />
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

                        {
                            propsTercerosContexto.TerceroConsulta.TipoPersonaID == 1 &&
                            <>
                                <Stack direction="row" alignItems="center">
                                    <CampoValorInfoGeneral
                                        Campo="Primer nombre:"
                                        Valor="Ronal"
                                    />

                                    <CampoValorInfoGeneral
                                        Campo="Segundo nombre:"
                                        Valor="Castaño"
                                    />
                                </Stack> 

                                <Stack direction="row" alignItems="center">

                                    <CampoValorInfoGeneral
                                        Campo="Primer apellido:"
                                        Valor="Castaño"
                                    />

                                    <CampoValorInfoGeneral
                                        Campo="Segundo apellido:"
                                        Valor="Chaparro"
                                    />
                                </Stack> 
                            </>
                        }       

                        {
                            propsTercerosContexto.TerceroConsulta.TipoPersonaID != 1 && 
                            <Stack direction="row" alignItems="center">

                                <CampoValorInfoGeneral
                                    Campo="Razón social:"
                                    Valor="Chocolate chips cokies"
                                    PropsRow={
                                        {
                                            width: "100%"
                                        }
                                    }
                                />

                            </Stack> 
                        }  
                        
                        <Stack direction="row" alignItems="center">

                            <CampoValorInfoGeneral
                                Campo="Número de identificación:"
                                Valor="C.C.: 1014296897 - 9"
                            />

                            <CampoValorInfoGeneral
                                Campo="Forma de pago:"
                                Valor="Contado"
                            />
                        </Stack> 

                        <Stack direction="row" alignItems="center">
                            <CampoValorInfoGeneral
                                Campo="Ciudad:"
                                Valor="Bogotá D.C."
                            />

                            <CampoValorInfoGeneral
                                Campo="Dirección"
                                Valor="Carrera 94 i # 84 - 48"
                            />
                        </Stack> 

                        <Stack direction="row" alignItems="center">

                            <CampoValorInfoGeneral
                                Campo="Tipo:"
                                Valor="Cliente y proveedor"
                            />

                            <CampoValorInfoGeneral
                                Campo="Sub-tipo:"
                                Valor="-"
                            />
                        </Stack> 

                        <Stack direction="row" alignItems="center">

                            <CampoValorInfoGeneral
                                Campo="Actividad económica:"
                                Valor="-"
                            />

                            <CampoValorInfoGeneral
                                Campo="Correo eléctronico:"
                                Valor="ronal.castano@sinco.com.co"
                            />
                        </Stack>

                        <Stack direction="row" alignItems="center">
                            <CampoValorInfoGeneral
                                Campo="Télefono:"
                                Componente={<Chip size='small' label="6789076" />}
                            />

                            <CampoValorInfoGeneral
                                Campo="Celular:"
                                Componente={<Chip size='small' label="3245859050" />}
                            />
                        </Stack>

                        <Stack direction="row" alignItems="center">
                            <CampoValorInfoGeneral
                                Campo="Observaciones:"
                                Valor="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                PropsRow={
                                    {
                                        width:"100%"
                                    }
                                }
                            />
                        </Stack>

                    </Stack>

                    <Divider/>

                    <Stack direction="column" gap={1.5}>
                        <Typography variant="subtitle2" color="primary.light">
                            Contacto principal
                        </Typography>

                        <Stack direction="row" alignItems="center">
                            <CampoValorInfoGeneral
                                Campo="Nombre:"
                                Valor='Ronal Santiago Castaño Chaparro'
                            />

                            <CampoValorInfoGeneral
                                Campo="Correo eléctronico:"
                                Valor='ronal.castano@sinco.com.co'
                            />
                        </Stack>
                    </Stack>

                    <Divider/>

                    <Stack direction="column"  gap={1.5}>
                        <Typography variant="subtitle2" color="primary.light">
                            Representante legal
                        </Typography>

                        <Stack direction="column" gap={1}>
                            <Stack direction="row" alignItems="center">
                                <CampoValorInfoGeneral
                                    Campo="Nombre:"
                                    Valor='Ronal Santiago Castaño Chaparro'
                                />

                                <CampoValorInfoGeneral
                                    Campo="Número de identificación:"
                                    Valor='10143566789'
                                />
                            </Stack>

                            <Stack direction="row" alignItems="center">

                                <CampoValorInfoGeneral
                                    Campo="Lugar de expedición:"
                                    Valor='Bogotá D.C.'
                                />

                                <CampoValorInfoGeneral
                                    Campo="Correo eléctronico:"
                                    Valor='ronal.castano@sinco.com.co'
                                />
                            </Stack>
                        </Stack>
                    </Stack>

                    <Alert severity="info">
                        Estudio de seguridad sin diligenciar (SAGRILAFT)
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
                        <Stack direction="row" gap={.5}>
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
