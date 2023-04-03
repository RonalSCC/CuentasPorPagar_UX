import { Add, Edit, EditOutlined } from '@mui/icons-material'
import Search from '@mui/icons-material/Search'
import { Alert, AlertTitle, Button, Card, Chip, Divider, FormControl, FormControlLabel, IconButton, Stack, Switch, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CrearPeticion } from '../../../../../Consumos/APIManager'
import { SendRequest } from '../../../../../Consumos/Request'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import CampoValorInfoGeneral from './CampoValorInfoGeneral'
import CardInformacionGeneral from './_CardInformacionGeneral'

export interface IInfoUsuario{
    terId: number,
    terTipoPersona?: null | string,
    terEstado: boolean,
    terRazonSocial?: null | string,
    terPrimerNombre?: null | string,
    terSegundoNombre?: null | string,
    terPrimerApellido?: null | string,
    terSegundoApellido?: null | string,
    terNumeroIdentificacion?: null | string,
    terTipoIdentificacion?: null | string,
    terDiv?: null | string,
    terFormaPago?: null | string,
    terCiudad?: null | string,
    terDireccion?:null | string,
    terTipo?: null | string,
    terSubTipo?: null | string,
    terActividadEconomica?: null | string,
    terEmail?: null | string,
    terTelefono?: null | string,
    terCelular?: null | string,
    terObservaciones?: null | string,
    terContactoPrincipalNombre?: null | string,
    terContactoPrincipalEmail?: null | string,
    terRepresentanteLNombre?: null | string,
    terRepresentanteLIdentificacion?: null | string,
    terRepresentanteLExpedicion?: null | string,
    terRepresentanteLEmail?: null | string,
    terEstudioSeguridad: boolean
}
export default function InformacionGeneralDatos(props:any) {
    const navigate = useNavigate();

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const [InfoTercero, setInfoTercero] = useState<IInfoUsuario>();
            
    useEffect(() => {
      ConsultarInformacionTercero();
    }, [propsTercerosContexto.TerceroSeleccionadoLista]);
    
    const ConsultarInformacionTercero = async()=> {
        if (propsTercerosContexto.TerceroSeleccionadoLista) {
            SendRequest.get({
                API: "CUENTASPORPAGAR",
                URLServicio: "/AdministracionTerceros/ConsultarTerceroFichaId",
                Body:{
                    UsuarioID: 1,
                    TerId: propsTercerosContexto.TerceroSeleccionadoLista.TerID
                }
            }).then((respuesta)=> {
                if (respuesta) {
                    if(respuesta.ok){
                        setInfoTercero(respuesta.datos);
                    }
                    else if (respuesta.errores && respuesta.errores.length > 0) {
                        propsTercerosContexto.CambiarAlertas(
                            respuesta.errores.map(x=> {
                                return <>
                                <Alert 
                                    key={x.descripcion} 
                                    severity="warning"
                                    onClose={()=> propsTercerosContexto.CerrarAlertas()}
                                >
                                    <AlertTitle>Error</AlertTitle>
                                    {x.descripcion}
                                </Alert>
                                </>;
                            })
                        );
                    }
                }
            });
        }
    }

    const EditarTercero = ()=> {
                
        navigate("EditarInformacionGeneral", {
            state:InfoTercero
        });
    }
  return (
    <>
        {/* -------------------------------- */}
        <Stack direction="column" gap={3} paddingBottom={5} width="100%" >
            <CardInformacionGeneral
                Titulo='Información general'
                MetodoEditar={EditarTercero}
                propsTypography={{
                    variant: "h6"
                }}
            >
                <Stack direction="column" gap={1}>
                    <Stack direction="row" alignItems="center" gap={3}>
                        <CampoValorInfoGeneral
                            Campo="Tipo de persona:"
                            Valor={InfoTercero?.terTipoPersona}
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
                        InfoTercero?.terTipoPersona == "N" &&
                        <>
                            <Stack direction="row" alignItems="center" gap={3}>
                                <CampoValorInfoGeneral
                                    Campo="Primer nombre:"
                                    Valor={InfoTercero?.terPrimerNombre}
                                />

                                <CampoValorInfoGeneral
                                    Campo="Segundo nombre:"
                                    Valor={InfoTercero?.terSegundoNombre}
                                />
                            </Stack> 

                            <Stack direction="row" alignItems="center" gap={3}>

                                <CampoValorInfoGeneral
                                    Campo="Primer apellido:"
                                    Valor={InfoTercero?.terPrimerApellido}
                                />

                                <CampoValorInfoGeneral
                                    Campo="Segundo apellido:"
                                    Valor={InfoTercero?.terSegundoApellido}
                                />
                            </Stack> 
                        </>
                    }       

                    {
                        InfoTercero?.terTipoPersona  != "N" && 
                        <Stack direction="row" alignItems="center" gap={3}>

                            <CampoValorInfoGeneral
                                Campo="Razón social:"
                                Valor={InfoTercero?.terRazonSocial}
                                PropsRow={
                                    {
                                        width: "100%"
                                    }
                                }
                            />
                        </Stack> 
                    }  
                    
                    <Stack direction="row" alignItems="center" gap={3}>

                        <CampoValorInfoGeneral
                            Campo="Número de identificación:"
                            Valor={`${InfoTercero?.terNumeroIdentificacion}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Forma de pago:"
                            Valor={`${InfoTercero?.terFormaPago}`}
                        />
                    </Stack> 

                    <Stack direction="row" alignItems="center" gap={3}>
                        <CampoValorInfoGeneral
                            Campo="Ciudad:"
                            Valor={`${InfoTercero?.terCiudad}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Dirección"
                            Valor={`${InfoTercero?.terDireccion}`}
                        />
                    </Stack> 

                    <Stack direction="row" alignItems="center" gap={3}>

                        <CampoValorInfoGeneral
                            Campo="Tipo:"
                            Valor={`${InfoTercero?.terTipo}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Sub-tipo:"
                            Valor={`${InfoTercero?.terSubTipo}`}
                        />
                    </Stack> 

                    <Stack direction="row" alignItems="center" gap={3}>

                        <CampoValorInfoGeneral
                            Campo="Actividad económica:"
                            Valor={`${InfoTercero?.terActividadEconomica}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Correo eléctronico:"
                            Valor={`${InfoTercero?.terEmail}`}
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={3}>
                        <CampoValorInfoGeneral
                            Campo="Télefono:"
                            Componente={<Chip size='small' label={`${InfoTercero?.terTelefono}`} />}
                        />

                        <CampoValorInfoGeneral
                            Campo="Celular:"
                            Componente={<Chip size='small' label={`${InfoTercero?.terCelular}`} />}
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={3}>
                        <CampoValorInfoGeneral
                            Campo="Observaciones:"
                            Valor={InfoTercero?.terObservaciones}
                            PropsRow={
                                {
                                    width:"100%"
                                }
                            }
                        />
                    </Stack>

                </Stack>
            </CardInformacionGeneral>

            <CardInformacionGeneral 
                Titulo='Contacto principal'
                MetodoEditar={EditarTercero}
            >
               <Stack direction="row" alignItems="center" gap={3}>
                    <CampoValorInfoGeneral
                        Campo="Nombre:"
                        Valor={`${InfoTercero?.terContactoPrincipalNombre}`}
                    />

                    <CampoValorInfoGeneral
                        Campo="Correo eléctronico:"
                        Valor={`${InfoTercero?.terContactoPrincipalEmail}`}
                    />
                </Stack>
            </CardInformacionGeneral>

            <CardInformacionGeneral 
                Titulo='Representante legal'
                MetodoEditar={EditarTercero}
            >
               <Stack direction="column" gap={1}>
                    <Stack direction="row" alignItems="center" gap={3}>
                        <CampoValorInfoGeneral
                            Campo="Nombre:"
                            Valor={`${InfoTercero?.terRepresentanteLNombre}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Número de identificación:"
                            Valor={`${InfoTercero?.terRepresentanteLIdentificacion}`}
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={3}>

                        <CampoValorInfoGeneral
                            Campo="Lugar de expedición:"
                            Valor={`${InfoTercero?.terRepresentanteLExpedicion}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Correo eléctronico:"
                            Valor={`${InfoTercero?.terRepresentanteLEmail}`}
                        />
                    </Stack>
                </Stack>
            </CardInformacionGeneral>

            <Stack direction="column" gap={3}>
                {
                    InfoTercero?.terEstudioSeguridad == false && 
                        <Alert severity="info">
                            Estudio de seguridad sin diligenciar (SAGRILAFT)
                        </Alert>   
                }   
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
    </>
  )
}
