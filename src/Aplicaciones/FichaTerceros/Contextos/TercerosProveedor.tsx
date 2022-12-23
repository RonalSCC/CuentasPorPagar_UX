import React, { useState } from 'react'
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
    const [nuevoRegistro, setNuevoRegistro] = useState<boolean>(false);

    const CambiarTerceroSeleccionado = (TerceroNuevo:number) => {
        setTerceroSeleccionado(TerceroNuevo);
    }

    const CambiarEstadoNuevoRegistro = (NuevoEstado:boolean) => {
        setNuevoRegistro(NuevoEstado);
    }

    const propsTercerosContexto: Record<string, any> = {
        TerceroSeleccionado: terceroSeleccionado, 
        CambiarTerceroSeleccionado: CambiarTerceroSeleccionado,
        NuevoRegistro: nuevoRegistro, 
        CambiarEstadoNuevoRegistro: CambiarEstadoNuevoRegistro
    };

    return (
        <TercerosContexto.Provider value={{propsTercerosContexto}}>
            {children}
        </TercerosContexto.Provider>
    )
}
