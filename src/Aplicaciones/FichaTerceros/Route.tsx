import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';
import MarcoTerceros from "./Registro/Componentes/MarcoTerceros";
import FormularioRegistroTercero from "./Registro/Componentes/NuevoRegistro/FormularioRegistroTercero";
import SinSeleccion from "./Registro/Componentes/SinSeleccion";
import Terceros from "./Registro/Componentes/Terceros";
import RoutesMarcoTerceros from "./Registro/Route";

const CambiarTerceroMientras = ()=>{

}
const RoutesTerceros:RouteObject[] = [
    {
        children:[
            {
                path:"MarcoTerceros",
                element: <MarcoTerceros RegistrarNuevoTercero={CambiarTerceroMientras}/>,
                children: RoutesMarcoTerceros
            },
            {
                path:"*",
                element: <SinSeleccion RegistrarNuevoTercero={CambiarTerceroMientras}/>,
                index:true
            },
            {
                path:"FormularioRegistro",
                element: <FormularioRegistroTercero RegistrarNuevoTercero={CambiarTerceroMientras}/>
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