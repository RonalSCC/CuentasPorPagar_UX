import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';
import InformacionGeneralDatos from "./Componentes/InformacionGeneral/InformacionGeneralDatos";
const CambiarTerceroMientras = ()=>{

}
const RoutesMarcoTerceros:RouteObject[] = [
    {
        children:[
            {
                path:"InformacionGeneral",
                element: <InformacionGeneralDatos />,
                index:true
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
