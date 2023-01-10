import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';
import Cuentas from "./Componentes/CuentasBancarias/Cuentas";
import EditarInformacionGeneral from "./Componentes/InformacionGeneral/EditarInformacionGeneral";
import InformacionGeneralDatos from "./Componentes/InformacionGeneral/InformacionGeneralDatos";
import Contactos from './Componentes/Contactos/Contactos'
import MarcoTerceroProveedor from "./Contextos/MarcoTercerosProveedor";
const CambiarTerceroMientras = ()=>{

}
const RoutesMarcoTerceros:RouteObject[] = [
    {
        children:[
            {
                path:"*",
                element: <InformacionGeneralDatos />,
                index:true
            },
            {
                path:"Contactos",
                element: <Contactos />,
            },
            {
                path:"EditarInformacionGeneral",
                element: <EditarInformacionGeneral />,
                index:true
            },
            {
                path:"CuentasBancarias",
                element: <Cuentas />
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
