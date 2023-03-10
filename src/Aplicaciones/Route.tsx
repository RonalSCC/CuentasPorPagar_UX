
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from "react-router-dom";
import { useContext } from 'react';
import TercerosProveedor from './FichaTerceros/Contextos/TercerosProveedor';
import RoutesTerceros from './FichaTerceros/Route';
import Terceros from './FichaTerceros/Registro/Componentes/Terceros';

const RoutesCuentasPorPagar:RouteObject[] = [
    {
        children:[
            {
                path:"FichaTerceros/*",
                element: <Terceros />,
                children:RoutesTerceros,
                
            }
        ]
    }
];

export const RoutesCuentasPorPagarElement = ()=>{
    const RoutesCuentasPorPagarElement = useRoutes(RoutesCuentasPorPagar);
    return <>
        <TercerosProveedor>
            {
                RoutesCuentasPorPagarElement
            }
        </TercerosProveedor>
    </>
}
