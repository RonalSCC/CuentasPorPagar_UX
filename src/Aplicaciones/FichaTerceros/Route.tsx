import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';
import MarcoTerceros from "./Registro/Componentes/MarcoTerceros";
import FormularioCrearTercero from "./Registro/Componentes/NuevoRegistro/FormularioCrearTercero";
import SinSeleccion from "./Registro/Componentes/SinSeleccion";
import Terceros from "./Registro/Componentes/Terceros";
import MarcoTerceroProveedor from "./Registro/Contextos/MarcoTercerosProveedor";
import RoutesMarcoTerceros from "./Registro/Route";

const CambiarTerceroMientras = ()=>{

}
const RoutesTerceros:RouteObject[] = [
    {
        children:[
            {
                path:"MarcoTerceros/*",
                element: 
                    <>
                        <MarcoTerceroProveedor>
                            <MarcoTerceros/>
                        </MarcoTerceroProveedor>
                    </>
                ,
                children: RoutesMarcoTerceros
            },
            {
                path:"*",
                element: <SinSeleccion/>,
            },
            {
                path:"FormularioCrearTercero",
                element: <FormularioCrearTercero/>,
                index:true
            }
        ]
    }
];

export const RoutesTercerosElement = ()=>{
    const RoutesTecerosElement = useRoutes(RoutesTerceros);
    return <>
       {
            RoutesTecerosElement
       } 
    </>
}

export default RoutesTerceros;