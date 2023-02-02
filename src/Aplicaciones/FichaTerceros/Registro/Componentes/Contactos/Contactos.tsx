import { Add } from '@mui/icons-material'
import { Alert, AlertTitle, Fab, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import FormularioContacto from './FormularioContacto'
import { CardContact } from './CardContact'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'
import { CrearPeticion } from '../../../../../Consumos/APIManager'

export interface IContactos {
    conId: number,
    conNombre: string,
    conCelular: string,
    conTelefono: string,
    conCargo: string,
    conCiudadId: number,
    conCiudad: string,
    conTipoId: number,
    conTipo: string,
    conEmail: string,
    conPrincipal: boolean,
    conNumeroDocumento: string
}


export default function Contactos() {

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const [verModalNuevoContacto, setverModalNuevoContacto] = useState(false);

    const [contactosList, setContactosList] = useState<IContactos[]>([]);

    const ConsultarListaContactos = async () => {
        //if(true){
        const response = await CrearPeticion({
            API: "CUENTASPORPAGAR",
            URLServicio: "/AdministracionTerceros/Consultar_ContactosTerceros",
            Type: "POST",
            Body: {
                usuarioId: 1,
                TerId: propsTercerosContexto.TerceroSeleccionadoLista?.TerID
            }
        });

        if (response != null) {
            if (response.ok) {
                setContactosList(response.datos)
            }
            else if (response.errores && response.errores.length > 0) {
                propsTercerosContexto.CambiarAlertas(
                    response.errores.map(x=> {
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
        //}
    }

    const VerModalNuevoContacto = () => {
        setverModalNuevoContacto(!verModalNuevoContacto);
    }

    useEffect(() => {
        ConsultarListaContactos();
    }, [propsTercerosContexto.TerceroSeleccionadoLista])


    return (
        <Stack>
            <Stack gap={1} direction="row" flexWrap="wrap">

                {
                    contactosList.map((contact) => <CardContact key={contact.conId} {...contact} />)
                }

            </Stack>
            <Fab color="secondary" variant="extended" onClick={VerModalNuevoContacto}
                sx={{
                    position: "fixed",
                    bottom: (theme) => theme.spacing(3),
                    right: (theme) => theme.spacing(3)
                }} >
                <Add></Add>
                <Typography>
                    Nuevo Contacto
                </Typography>
            </Fab>
            {
                verModalNuevoContacto == true &&
                <FormularioContacto estado={verModalNuevoContacto} cambiarEstado={VerModalNuevoContacto} title="Nuevo Contacto" />
            }
        </Stack>
    )
}

