import { Add, Edit, EditOutlined } from '@mui/icons-material'
import Search from '@mui/icons-material/Search'
import { Alert, AlertTitle, Button, Card, Chip, Divider, FormControl, FormControlLabel, IconButton, Stack, Switch, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CrearPeticion } from '../../../../../Consumos/APIManager'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import CampoValorInfoGeneral from './CampoValorInfoGeneral'
import CardInformacionGeneral from './_CardInformacionGeneral'

export interface IInfoUsuario{
    TerId: number,
    TerTipoPersona?: string,
    TerEstado: boolean,
    TerRazonSocial?: string,
    TerPrimerNombre?: string,
    TerSegundoNombre?: string,
    TerPrimerApellido?: string,
    TerSegundoApellido?: string,
    TerNumeroIndentificaion?: string,
    TerTipoIdentificacion?: string,
    TerDiv?: string,
    TerFormaPago?: string,
    TerCiudad?: string,
    TerDireccion?:string,
    TerTipo?: string,
    TerSubTipo?: null,
    TerActividadEconomica?: string,
    TerEmail?: string,
    TerTelefono?: string,
    TerCelular?: string,
    TerObservaciones?: string,
    TerContactoPrincipalNombre?: string,
    TerContactoPrincipalEmail?: string,
    TerRepresentanteLNombre?: string,
    TerRepresentanteLIdentificacion?: string,
    TerRepresentanteLExpedicion?: string,
    TerRepresentanteLEmail?: string,
    TerEstudioSeguridad: boolean
}
export default function InformacionGeneralDatos(props:any) {
    const navigate = useNavigate();

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const [InfoTercero, setInfoTercero] = useState<IInfoUsuario|undefined>();
    useEffect(() => {
      ConsultarInformacionTercero();
    }, [propsTercerosContexto.TerceroSeleccionadoLista])
    
    const EditarInformacionGeneral = async()=> {
        navigate("EditarInformacionGeneral");
    }

    const ConsultarInformacionTercero = async()=> {
        if (propsTercerosContexto.TerceroSeleccionadoLista) {
            let respuesta = await CrearPeticion({
                API: "CUENTASPORPAGAR",
                URLServicio: "/AdministracionTerceros/ConsultarTerceroFichaId",
                Body:{
                    UsuarioID: 1,
                    TerId: propsTercerosContexto.TerceroSeleccionadoLista.TerID
                }
            });

            if (respuesta != null) {
                if(respuesta.Ok){
                    setInfoTercero(respuesta.Datos);
                }
                else if (respuesta.Errores && respuesta.Errores.length > 0) {
                    propsTercerosContexto.CambiarAlertas(
                        respuesta.Errores.map(x=> {
                            return <>
                            <Alert 
                                key={x.Descripcion} 
                                severity="warning"
                                onClose={()=> propsTercerosContexto.CerrarAlertas()}
                            >
                                <AlertTitle>Error</AlertTitle>
                                {x.Descripcion}
                            </Alert>
                            </>;
                        })
                    );
                }
            }
        }
    }

    const EditarTercero = ()=> {
        navigate("EditarInformacionGeneral");
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
                            Valor={InfoTercero?.TerTipoPersona}
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
                        propsTercerosContexto.TerceroSeleccionadoLista?.TerNatJur == "N" &&
                        <>
                            <Stack direction="row" alignItems="center" gap={3}>
                                <CampoValorInfoGeneral
                                    Campo="Primer nombre:"
                                    Valor={InfoTercero?.TerPrimerNombre}
                                />

                                <CampoValorInfoGeneral
                                    Campo="Segundo nombre:"
                                    Valor={InfoTercero?.TerSegundoNombre}
                                />
                            </Stack> 

                            <Stack direction="row" alignItems="center" gap={3}>

                                <CampoValorInfoGeneral
                                    Campo="Primer apellido:"
                                    Valor={InfoTercero?.TerPrimerApellido}
                                />

                                <CampoValorInfoGeneral
                                    Campo="Segundo apellido:"
                                    Valor={InfoTercero?.TerSegundoApellido}
                                />
                            </Stack> 
                        </>
                    }       

                    {
                        propsTercerosContexto.TerceroSeleccionadoLista?.TerNatJur  != "N" && 
                        <Stack direction="row" alignItems="center" gap={3}>

                            <CampoValorInfoGeneral
                                Campo="Razón social:"
                                Valor={InfoTercero?.TerRazonSocial}
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
                            Valor={`${InfoTercero?.TerNumeroIndentificaion}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Forma de pago:"
                            Valor={`${InfoTercero?.TerFormaPago}`}
                        />
                    </Stack> 

                    <Stack direction="row" alignItems="center" gap={3}>
                        <CampoValorInfoGeneral
                            Campo="Ciudad:"
                            Valor={`${InfoTercero?.TerCiudad}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Dirección"
                            Valor={`${InfoTercero?.TerDireccion}`}
                        />
                    </Stack> 

                    <Stack direction="row" alignItems="center" gap={3}>

                        <CampoValorInfoGeneral
                            Campo="Tipo:"
                            Valor={`${InfoTercero?.TerTipo}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Sub-tipo:"
                            Valor={`${InfoTercero?.TerSubTipo}`}
                        />
                    </Stack> 

                    <Stack direction="row" alignItems="center" gap={3}>

                        <CampoValorInfoGeneral
                            Campo="Actividad económica:"
                            Valor={`${InfoTercero?.TerActividadEconomica}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Correo eléctronico:"
                            Valor={`${InfoTercero?.TerEmail}`}
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={3}>
                        <CampoValorInfoGeneral
                            Campo="Télefono:"
                            Componente={<Chip size='small' label={`${InfoTercero?.TerTelefono}`} />}
                        />

                        <CampoValorInfoGeneral
                            Campo="Celular:"
                            Componente={<Chip size='small' label={`${InfoTercero?.TerCelular}`} />}
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={3}>
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
            </CardInformacionGeneral>

            <CardInformacionGeneral 
                Titulo='Contacto principal'
                MetodoEditar={EditarTercero}
            >
               <Stack direction="row" alignItems="center" gap={3}>
                    <CampoValorInfoGeneral
                        Campo="Nombre:"
                        Valor={`${InfoTercero?.TerContactoPrincipalNombre}`}
                    />

                    <CampoValorInfoGeneral
                        Campo="Correo eléctronico:"
                        Valor={`${InfoTercero?.TerContactoPrincipalEmail}`}
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
                            Valor={`${InfoTercero?.TerRepresentanteLNombre}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Número de identificación:"
                            Valor={`${InfoTercero?.TerRepresentanteLIdentificacion}`}
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={3}>

                        <CampoValorInfoGeneral
                            Campo="Lugar de expedición:"
                            Valor={`${InfoTercero?.TerRepresentanteLExpedicion}`}
                        />

                        <CampoValorInfoGeneral
                            Campo="Correo eléctronico:"
                            Valor={`${InfoTercero?.TerRepresentanteLEmail}`}
                        />
                    </Stack>
                </Stack>
            </CardInformacionGeneral>

            <Stack direction="column" gap={3}>
                {
                    InfoTercero?.TerEstudioSeguridad == false && 
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
