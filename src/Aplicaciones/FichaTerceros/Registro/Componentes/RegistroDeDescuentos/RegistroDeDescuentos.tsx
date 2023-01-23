import { Add } from "@mui/icons-material"
import { Fab, Stack, Typography } from "@mui/material"
import { useState } from "react"
import DescuentoCard from "./DescuentoCard"
import FormularioRegistroDeDescuentos from "./FormularioRegistroDeDescuentos"
import NotInformation from "./NotInformation"

const RegistroDeDescuentos = () => {

    const [descuentos, setDescuentos] = useState('')

    const [verModalNuevoDescuento, setverModalNuevoDescuento] = useState(false);

    const VerModalNuevoDescuento = () => {
        setverModalNuevoDescuento(!verModalNuevoDescuento);
    }

    return (
        <Stack gap={3}>
            {/* <NotInformation /> */}
            <DescuentoCard tituloDescuento="Comercial"/>
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
                    cambiarEstado = {VerModalNuevoDescuento}
                    ></FormularioRegistroDeDescuentos>
            }
        </Stack>
    )
}

export default RegistroDeDescuentos