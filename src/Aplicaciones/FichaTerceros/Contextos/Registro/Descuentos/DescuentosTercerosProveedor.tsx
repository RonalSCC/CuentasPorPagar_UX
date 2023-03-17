import React, { useEffect, useState } from 'react'
import ISucursalCuentaBancaria from '../../../Interfaces/Registro/CuentasBancarias/ISucursalCuentaBancaria'
import IDescuentoTercero from '../../../Interfaces/Registro/Descuentos/IDescuentoTercero'
import { DescuentosTerceroContexto } from './DescuentosTerceroContexto'

export interface DescuentosTerceroProveedorProps {
    children: any
}

export interface paramsDescuentosTerceroContexto {
    CambiarDescuentoSeleccionado: (NuevoDescuento: IDescuentoTercero|undefined) => void,
    CambiarConfirmarEliminacion: (estado: boolean) => void,
    DescuentoSeleccionado: IDescuentoTercero|undefined,
    ConfirmarEliminar:boolean
}

export default function DescuentosTerceroProveedor(
    {
        children
    }: DescuentosTerceroProveedorProps
) 
{
    const [DescuentoSeleccionado, setDescuentoSeleccionado] = useState<IDescuentoTercero>();
    const [ConfirmarEliminar, setConfirmarEliminar] = useState(false);

    const CambiarDescuentoSeleccionado = (NuevoDescuento:IDescuentoTercero|undefined)=> {
        setDescuentoSeleccionado(NuevoDescuento);
    }

    const CambiarConfirmarEliminacion = (estado:boolean)=> {
        setConfirmarEliminar(estado);
    }
    const parametrosReturnDescuentos:paramsDescuentosTerceroContexto = {
        CambiarDescuentoSeleccionado,
        CambiarConfirmarEliminacion,
        DescuentoSeleccionado,
        ConfirmarEliminar
    };

  return (
    <DescuentosTerceroContexto.Provider value={{parametrosReturnDescuentos}}>
        {children}
    </DescuentosTerceroContexto.Provider>
  )
}
