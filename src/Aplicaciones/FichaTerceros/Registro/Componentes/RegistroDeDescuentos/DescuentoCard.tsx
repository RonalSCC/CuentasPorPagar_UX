import { EditOutlined, DeleteOutlined } from '@mui/icons-material'
import { Card, CardContent, Divider, IconButton, ListItemSecondaryAction, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { useState } from 'react'
import DeleteContact from '../Contactos/DeleteContact'
import DeleteDescuento from './DeleteDescuento'
import FormularioRegistroDeDescuentos from './FormularioRegistroDeDescuentos'

export interface DescuentoCardProps {
    tituloDescuento: string
}


const DescuentoCard = ({ tituloDescuento }: DescuentoCardProps) => {

    const [verModalEditDiscount, setverModalEditDiscount] = useState(false);
    const [verModalDeleteDiscount, setverModalDeleteDiscount] = useState(false);

    const handleEditDiscount = () => {
        setverModalEditDiscount(!verModalEditDiscount);
    }

    const handleDeleteDiscount = () => {
        setverModalDeleteDiscount(!verModalDeleteDiscount);
    }

    return (
        <Stack p={2} gap={1.5} >
            <Card elevation={0}>
                <CardContent >
                    <Stack direction="row" p={2} gap={1.5} bgcolor={"#FFFFFF"} justifyContent="space-between">
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

                        <Stack direction="row" gap={1} alignItems="center">
                            <Tooltip title="Eliminar" placement="top" arrow >
                                <IconButton size="small" color="error" onClick={handleDeleteDiscount}>
                                    <DeleteOutlined fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" placement="top" arrow >
                                <IconButton size="small" color="primary" onClick={handleEditDiscount}>
                                    <EditOutlined fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
            {
                verModalEditDiscount == true &&
                <FormularioRegistroDeDescuentos estado={verModalEditDiscount} cambiarEstado={handleEditDiscount} title="Editar Descuento" />
            }

            {
                verModalDeleteDiscount == true &&
                <DeleteDescuento estado={verModalDeleteDiscount} cambiarEstado={handleDeleteDiscount}/>
            }
        </Stack>
    )
}

export default DescuentoCard