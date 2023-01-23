import { Typography } from "@mui/material"
import { Stack } from "@mui/system"
import Image from "mui-image"

const NotInformation = () => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            bgcolor="#FFFFFF"
            border={0.8}
            borderColor="background.default"
            width="100%">

            <Stack py={5} px={3} gap={1.5} direction="column" justifyContent="center" alignItems="center" >
                <Stack maxWidth={183}>
                    <Image fit='cover' src={"Imagenes/Terceros/SinInformacion.svg"} alt="" />
                </Stack>
                <Typography color="text.primary" variant="h6">No hay Información</Typography>
                <Stack maxWidth={600}>
                    <Typography color="text.secondary" variant="body2" textAlign="center">
                        Registra aquí el porcentaje de reducción que hace el tercero a tus pagos en caso de cancelar
                        antes de la fecha del plazo acordada
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default NotInformation