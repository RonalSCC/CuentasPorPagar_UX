import React, { useEffect, useState } from 'react'
import { TercerosContexto } from './TercerosContexto'


export default function TercerosProveedor(
    {
        children
    }:
    {
        children: any
    }
){
    const [terceroSeleccionado, setTerceroSeleccionado] = useState<any>(null);
    const [terceroConsulta, setTerceroConsulta] = useState<any>(null);
    const [nuevoRegistro, setNuevoRegistro] = useState<boolean>(false);
    const [tituloPageHeader, setTituloPageHeader] = useState("");
    useEffect(() => {
      ConsultarInformacionTercero();
    }, [terceroSeleccionado])

    const ConsultarInformacionTercero = ()=> {
        setTerceroConsulta(
            { 
                ID: '163', 
                TipoIdentificacion: "CC",
                Identificacion: "1001277214",
                NombreTercero: "Ronal Santiago Castaño Chaparro",
                TipoPersonaID: 1,
                Ciudad: "Bogotá D.C"
            }
        );
    }

    const CambiarTerceroSeleccionado = (TerceroNuevo:number) => {
        setTerceroSeleccionado(TerceroNuevo);
    }

    const CambiarEstadoNuevoRegistro = (NuevoEstado:boolean) => {
        setNuevoRegistro(NuevoEstado);
    }

    const CambiarTituloPageHeader = (titulo:string)=>{
        if (titulo) {
            setTituloPageHeader(titulo);
        }
    }
    const propsTercerosContexto: Record<string, any> = {
        TerceroSeleccionado: terceroSeleccionado, 
        CambiarTerceroSeleccionado: CambiarTerceroSeleccionado,
        NuevoRegistro: nuevoRegistro, 
        CambiarEstadoNuevoRegistro: CambiarEstadoNuevoRegistro,
        TerceroConsulta: terceroConsulta,
        CambiarTituloPageHeader,
        TituloPageHeader: tituloPageHeader
    };

    return (
        <TercerosContexto.Provider value={{propsTercerosContexto}}>
            {children}
        </TercerosContexto.Provider>
    )
}

