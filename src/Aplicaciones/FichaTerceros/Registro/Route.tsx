import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';
import Cuentas from "./Componentes/CuentasBancarias/Cuentas";
import InformacionGeneralDatos from "./Componentes/InformacionGeneral/InformacionGeneralDatos";
import Contactos from './Componentes/Contactos/Contactos'
import MarcoTerceroProveedor from "./Contextos/MarcoTercerosProveedor";
import ConfiguracionTributaria from "./Componentes/ConfiguracionTributaria/ConfiguracionTributaria";
import RegistroDeDescuentos from './Componentes/RegistroDeDescuentos/RegistroDeDescuentos';
import DocumentosDeTerceros from "./Componentes/ConfiguracionAvanzada/DocumentosDeTerceros/DocumentosDeTerceros";
import EmbargoEndoso from "./Componentes/ConfiguracionAvanzada/EmbargoEndoso/EmbargoEndoso";
import FormularioEdicionTercero from "./Componentes/InformacionGeneral/FormularioEdicionTercero";
import CuentasBancariasProveedor from "../Contextos/Registro/CuentasBancarias/CuentasBancariasProveedor";
import DescuentosTerceroProveedor from "../Contextos/Registro/Descuentos/DescuentosTercerosProveedor";
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
                element: <FormularioEdicionTercero />,
                index:true
            },
            {
                path:"CuentasBancarias",
                element: <CuentasBancariasProveedor>
                    <Cuentas />
                </CuentasBancariasProveedor>
            },
            {
                path:'ConfiguracionTributaria',
                element: <ConfiguracionTributaria/>,
            },
            {
                path:"RegistroDeDescuentos",
                element:<DescuentosTerceroProveedor>
                    <RegistroDeDescuentos />
                </DescuentosTerceroProveedor>
            },
            {
                path:"DocumentosDeTerceros",
                element:<DocumentosDeTerceros />,
            },
            {
                path:"EmbargoEndoso",
                element:<EmbargoEndoso />,
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
