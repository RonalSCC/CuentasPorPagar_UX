import React, { useState } from 'react'
import { MarcoTerceroContexto } from './MarcoTerceroContexto'


export default function MarcoTerceroProveedor(
    {
        children
    }:
    {
        children: any
    }
){
    const [opcionMenuSeleccionada, setOpcionMenuSeleccionada] = useState<any>(null);
    
    const CambiarOpcionSeleccionada = (nuevaRuta:string)=> {
        if (nuevaRuta) {
            setOpcionMenuSeleccionada(nuevaRuta);
        }
    }

    const propsMarcoTercero: Record<string, any> = {
        OpcionMenuSeleccionada: opcionMenuSeleccionada, 
        CambiarOpcionSeleccionada: CambiarOpcionSeleccionada,
    };

    return (
        <MarcoTerceroContexto.Provider value={{propsMarcoTercero}}>
            {children}
        </MarcoTerceroContexto.Provider>
    )
}
