import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';
import Cuentas from "./Componentes/CuentasBancarias/Cuentas";
import EditarInformacionGeneral from "./Componentes/InformacionGeneral/EditarInformacionGeneral";
import InformacionGeneralDatos from "./Componentes/InformacionGeneral/InformacionGeneralDatos";
import Contactos from './Componentes/Contactos/Contactos'
import MarcoTerceroProveedor from "./Contextos/MarcoTercerosProveedor";
import ConfiguracionTributaria from "./Componentes/ConfiguracionTributaria/ConfiguracionTributaria";
import RegistroDeDescuentos from './Componentes/RegistroDeDescuentos/RegistroDeDescuentos';
const CambiarTerceroMientras = ()=>{

}
const RoutesMarcoTerceros:RouteObject[] = [
    {
        children:[
            {
                path:"*",
                element: <InformacionGeneralDatos />,
            },
            {
                path:"Contactos",
                element: <Contactos />,
            },
            {
                path:"EditarInformacionGeneral",
                element: <EditarInformacionGeneral />,
            },
            {
                path:"CuentasBancarias",
                element: <Cuentas />
            },
            {
                path:'ConfiguracionTributaria',
                element: <ConfiguracionTributaria/>,
            },
            {
                path:"RegistroDeDescuentos",
                element:<RegistroDeDescuentos />,
                index:true
            }
        ]
    }
];

export const RoutesMarcoTerceroElement = ()=>{
    const RoutesMarcoTercerosElement = useRoutes(RoutesMarcoTerceros);
    return <>
        <MarcoTerceroProveedor>
            {
                RoutesMarcoTercerosElement
            } 
        </MarcoTerceroProveedor>
    </>
}

export default RoutesMarcoTerceros;
