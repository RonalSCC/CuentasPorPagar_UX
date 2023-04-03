import { Add } from "@mui/icons-material"
import { Button, Fab, Stack, Typography } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { SendRequest } from "../../../../../Consumos/Request"
import { DescuentosTerceroContexto } from "../../../Contextos/Registro/Descuentos/DescuentosTerceroContexto"
import { paramsDescuentosTerceroContexto } from "../../../Contextos/Registro/Descuentos/DescuentosTercerosProveedor"
import { TercerosContexto } from "../../../Contextos/TercerosContexto"
import { PropsTerceroContexto } from "../../../Contextos/TercerosProveedor"
import IDescuentoTercero from "../../../Interfaces/Registro/Descuentos/IDescuentoTercero"
import SinInformacion from "../Generales/SinInformacion"
import DeleteDescuento from "./DeleteDescuento"
import DescuentoCard from "./DescuentoCard"
import ModalFormularioRegistroDeDescuentos from "./ModalFormularioRegistroDeDescuentos"

const RegistroDeDescuentos = () => {
    //Contexto
    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {parametrosReturnDescuentos}:{parametrosReturnDescuentos:paramsDescuentosTerceroContexto} = useContext<any>(DescuentosTerceroContexto);
    const {
        TerceroSeleccionadoLista
    } = propsTercerosContexto;

    const {
        ConfirmarEliminar, 
        CambiarConfirmarEliminacion,
        DescuentoSeleccionado,
        CambiarDescuentoSeleccionado
    } = parametrosReturnDescuentos;

    const [descuentos, setDescuentos] = useState<Array<IDescuentoTercero>>([])
    const [verModalNuevoDescuento, setverModalNuevoDescuento] = useState(false);
    const [estadoModalEliminar, setEstadoModalEliminar] = useState(false);
    const [estadoModalCrearEditar, setEstadoModalCrearEditar] = useState(false);

    useEffect(() => {
        ConsultarDescuentosTercero();
    }, []);

    useEffect(() => {
        if (ConfirmarEliminar == true) {
            EliminarDescuento();
            CambiarConfirmarEliminacion(false);
        }
    }, [ConfirmarEliminar])
    
    
    const ConsultarDescuentosTercero = useCallback(()=> {
        SendRequest.get({
            URLServicio: "/DescuentosTercero/ConsultarTerceroDescuentos",
            API: "CUENTASPORPAGAR",
            Body: {
                TerId:TerceroSeleccionadoLista?.TerID
            }
        }).then((respuesta)=> {
            if (respuesta) {
                if (respuesta != null && respuesta.ok == true) {
                    setDescuentos([...respuesta.datos]);
                }
            }
        });
    }, [TerceroSeleccionadoLista?.TerID]);

    const EliminarDescuento = useCallback(() => {
        SendRequest.delete({
            URLServicio: "/DescuentosTercero/EliminarDescuentoTercero",
            API: "CUENTASPORPAGAR",
            Body: {
                idDescuento:DescuentoSeleccionado?.terDesId
            }
        }).then((respuesta)=> {
            if (respuesta) {
                if (respuesta != null && respuesta.ok == true) {
                    ConsultarDescuentosTercero();
                    CambiarEstadoModalEliminar(false);
                }
            }
        });
    },[DescuentoSeleccionado?.terDesId]);

    const CambiarEstadoModalEliminar = (estado:boolean)=> {
        setEstadoModalEliminar(estado);
    }
    
    const CambiarEstadoModalEditarCrear = (estado:boolean)=> {
        setEstadoModalCrearEditar(estado);
    }

    const AbrirNuevoDescuento = ()=> {
        CambiarEstadoModalEditarCrear(true);
        CambiarDescuentoSeleccionado(undefined);
    }

    return (
        <>
            <Stack alignItems={"flex-start"} width={"100%"} height="100%" gap={1}> 
                <Button
                    startIcon={<Add/>}
                    onClick={()=> AbrirNuevoDescuento()}
                >
                    Nuevo descuento
                </Button>
                {
                    descuentos.length > 0 &&
                    descuentos.map(d=> {
                        return <DescuentoCard 
                                    key={d.terDesId}
                                    CambiarEstadoModalEliminar={CambiarEstadoModalEliminar} 
                                    CambiarEstadoModalCrearEditar={CambiarEstadoModalEditarCrear}
                                    InfoDescuento={d} />
                    })
                }

                {
                    descuentos.length == 0 && 
                        <SinInformacion
                            message="Registra aquí el porcentaje de reducción que hace el tercero a tus pagos en caso de cancelar
                                        antes de la fecha del plazo acordada"

                        />
                }

                {
                    estadoModalEliminar == true &&
                    <DeleteDescuento cambiarEstadoModal={CambiarEstadoModalEliminar}/>
                }

                {
                    estadoModalCrearEditar == true &&
                    <ModalFormularioRegistroDeDescuentos 
                        cambiarEstadoModal={CambiarEstadoModalEditarCrear} 
                        consultarDescuentosTercero={ConsultarDescuentosTercero}
                    />
                }
            </Stack>
        </>
    )
}

export default RegistroDeDescuentos