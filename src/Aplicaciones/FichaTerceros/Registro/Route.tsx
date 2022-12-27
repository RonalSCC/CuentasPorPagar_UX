import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';
import InformacionGeneralDatos from "./Componentes/InformacionGeneral/InformacionGeneralDatos";
import Contactos from './Componentes/Contactos/Contactos'
const CambiarTerceroMientras = ()=>{

}
const RoutesMarcoTerceros:RouteObject[] = [
    {
        children:[
            {
                path:"InformacionGeneral",
                element: <InformacionGeneralDatos />,
                index:true
            },
            {
                path:"Contactos",
                element: <Contactos />,
            }
        ]
    }
];

export const RoutesMarcoTerceroElement = ()=>{
    const RoutesMarcoTercerosElement = useRoutes(RoutesMarcoTerceros);
    return <>
       {
            RoutesMarcoTercerosElement
       } 
    </>
}

export default RoutesMarcoTerceros;
