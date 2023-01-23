import { Card, CardContent, Divider, ListItemSecondaryAction, Typography } from '@mui/material'
import { Stack } from '@mui/material'

export interface DescuentoCardProps {
    tituloDescuento: string
}


const DescuentoCard = ({ tituloDescuento }: DescuentoCardProps) => {
    return (
        <Stack p={2} gap={1.5} >
            <Card elevation={0}>
                <CardContent >
                    <Stack direction="row" gap={1.5} bgcolor={"#FFFFFF"}>
                        <Stack gap={1}>
                            <Typography color="primary.main">{tituloDescuento}</Typography>
                            <Stack>
                                <Stack direction="row" gap={1.5} divider={<Divider orientation={"vertical"} flexItem />}>
                                    <Stack gap={0.5} direction="row" alignItems={"center"}>
                                        <Typography variant="subtitle2">Plazo(dias):</Typography>
                                        <Typography variant="body2" color={"text.secondary"}>2</Typography>
                                    </Stack>
                                    <Stack gap={0.5} direction="row">
                                        <Typography variant="subtitle2">%:</Typography>
                                        <Typography variant="body2" color={"text.secondary"}>20</Typography>
                                    </Stack>
                                    <Stack gap={0.5} direction="row">
                                        <Typography variant="subtitle2">Ciudad:</Typography>
                                        <Typography variant="body2" color={"text.secondary"}>Bogotá</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction={"row"} gap={0.5}>
                                    <Stack gap={0.5} direction="row" alignItems={"center"}>
                                        <Typography variant="subtitle2">Observaciones:</Typography>
                                        <Typography variant="body2" color={"text.secondary"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack>
                            {/* Iconos */}
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    )
}

export default DescuentoCard