import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';
import MarcoTerceros from "./Registro/Componentes/MarcoTerceros";
import FormularioRegistroTercero from "./Registro/Componentes/NuevoRegistro/FormularioRegistroTercero";
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
                path:"MarcoTerceros",
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
                path:"FormularioRegistro",
                element: <FormularioRegistroTercero/>,
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