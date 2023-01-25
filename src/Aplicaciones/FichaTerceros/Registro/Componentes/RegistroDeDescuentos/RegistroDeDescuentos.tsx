import { Add } from "@mui/icons-material"
import { Fab, Stack, Typography } from "@mui/material"
import { useState } from "react"
import SinInformacion from "../Generales/SinInformacion"
import DescuentoCard from "./DescuentoCard"
import FormularioRegistroDeDescuentos from "./FormularioRegistroDeDescuentos"

const RegistroDeDescuentos = () => {

    const [descuentos, setDescuentos] = useState<Array<any>>([])

    const [verModalNuevoDescuento, setverModalNuevoDescuento] = useState(false);

    const VerModalNuevoDescuento = () => {
        setverModalNuevoDescuento(!verModalNuevoDescuento);
    }

    return (
        <>
            <Stack gap={3} width="100%" alignItems="center">
                {
                    descuentos.length > 0 ? 
                    <DescuentoCard tituloDescuento="Comercial"/> 
                    : 
                    <SinInformacion 
                        message="Registra aquí el porcentaje de reducción que hace el tercero a tus pagos en caso de cancelar
                                    antes de la fecha del plazo acordada"

                    /> 
                }
                <Stack>
                    <Fab color="secondary" variant="extended" onClick={VerModalNuevoDescuento}
                        sx={{
                            position: "fixed",
                            bottom: (theme) => theme.spacing(3),
                            right: (theme) => theme.spacing(3)
                        }} >
                        <Add></Add>
                        <Typography>
                            Nuevo Descuento
                        </Typography>
                    </Fab>
                </Stack>
                {
                    verModalNuevoDescuento == true &&
                    <FormularioRegistroDeDescuentos
                        estado={verModalNuevoDescuento}
                        cambiarEstado={VerModalNuevoDescuento}
                        title="Nuevo Descuento"
                    />
                }
            </Stack>
        </>
    )
}

export default RegistroDeDescuentos