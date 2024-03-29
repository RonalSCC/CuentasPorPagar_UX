import { Add } from '@mui/icons-material'
import { Alert, AlertTitle, Button, Fab, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import FormularioContacto from './FormularioContacto'
import { CardContact } from './CardContact'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'
import { CrearPeticion } from '../../../../../Consumos/APIManager'
import { useLocation, useNavigate } from 'react-router-dom'
import { IInfoUsuario } from '../InformacionGeneral/InformacionGeneralDatos'
import SinInformacion from '../Generales/SinInformacion'
import { SendRequest } from '../../../../../Consumos/Request'

export interface IContacto {
    conId: number,
    conNombre: string,
    conCelular: string,
    conTelefono: string,
    conExtension: string,
    conCargo: string,
    conCiudadId: number,
    conCiudad: string,
    conTipoId: number,
    conTipo: string,
    conEmail: string,
    conPrincipal: boolean,
    conNumDocumento: string,
    conEstado:boolean
}

export default function Contactos() {

    const { propsTercerosContexto }: { propsTercerosContexto: PropsTerceroContexto } = useContext<any>(TercerosContexto);
    const {
        BloquearCamposAcceso
    } = propsTercerosContexto;
    const [verModalNuevoContacto, setverModalNuevoContacto] = useState(false);
    const [contactosList, setContactosList] = useState<Array<IContacto>>([]);

    const location = useLocation();
    const navigate = useNavigate();
    const ConsultarListaContactos = async () => {

        SendRequest.get({
            API: "CUENTASPORPAGAR",
            URLServicio: "/ContactosTercero/Consultar_ContactosTerceros",
            Body: {
                TerId: propsTercerosContexto.TerceroSeleccionadoLista?.TerID
            }
        }).then((response) => {
            if (response) {
                if (response.ok) {
                    setContactosList(response.datos)
                }
                else if (response.errores && response.errores.length > 0) {
                    propsTercerosContexto.CambiarAlertas(
                        response.errores.map(x => {
                            return <>
                                <Alert
                                    key={x.descripcion}
                                    severity="warning"
                                    onClose={() => propsTercerosContexto.CerrarAlertas()}
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

    const VerModalNuevoContacto = () => {
        setverModalNuevoContacto(!verModalNuevoContacto);
    }

    useEffect(() => {   
        ConsultarListaContactos();
    }, [propsTercerosContexto.TerceroSeleccionadoLista])

    useEffect(() => {
        if (location.state?.Reload) {
            ConsultarListaContactos();
            navigate(location.pathname, {});
        }
    }, [location.state?.Reload])

    return (
        <Stack width={"100%"}>
            <Stack py={0.5} direction="row" alignItems="center">
                <Button 
                    variant="text"
                    startIcon={<Add color="primary"></Add>}
                    onClick={VerModalNuevoContacto}
                    disabled={BloquearCamposAcceso("DatosContactos")}
                >
                    Agregar Contacto
                </Button>
            </Stack>
            <Stack gap={1} direction="row" flexWrap="wrap">
                {
                    contactosList.map((contact) => <CardContact key={contact.conId} {...contact} />)
                }
                
            </Stack>
            <Stack height={"100%"} width={"100%"}>
                {
                    contactosList.length == 0 && 
                    <SinInformacion message='No se ha encontrado información de contactos'/>
                }
            </Stack>
            {
                verModalNuevoContacto == true && (

                    <FormularioContacto
                        estado={verModalNuevoContacto}
                        cambiarEstado={VerModalNuevoContacto}
                    />
                )
            }
        </Stack>
    )
}

