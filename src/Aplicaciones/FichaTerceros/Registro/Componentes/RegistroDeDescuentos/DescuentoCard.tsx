import { EditOutlined, DeleteOutlined } from '@mui/icons-material'
import { Card, CardContent, Divider, IconButton, ListItemSecondaryAction, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { useContext, useState } from 'react'
import { DescuentosTerceroContexto } from '../../../Contextos/Registro/Descuentos/DescuentosTerceroContexto'
import { paramsDescuentosTerceroContexto } from '../../../Contextos/Registro/Descuentos/DescuentosTercerosProveedor'
import IDescuentoTercero from '../../../Interfaces/Registro/Descuentos/IDescuentoTercero'
import DeleteContact from '../Contactos/DeleteContact'
import DeleteDescuento from './DeleteDescuento'
import FormularioRegistroDeDescuentos from './ModalFormularioRegistroDeDescuentos'

export interface DescuentoCardProps {
    InfoDescuento: IDescuentoTercero,
    CambiarEstadoModalEliminar: (estado: boolean) => void,
    CambiarEstadoModalCrearEditar: (estado: boolean) => void
}


const DescuentoCard = (DescuentoCardProps: DescuentoCardProps) => {

    const { 
        CambiarEstadoModalEliminar,
        CambiarEstadoModalCrearEditar,
        InfoDescuento 
    } = DescuentoCardProps;
    
    //Contexto
    const {parametrosReturnDescuentos}:{parametrosReturnDescuentos:paramsDescuentosTerceroContexto} = useContext<any>(DescuentosTerceroContexto);
    const {CambiarDescuentoSeleccionado} = parametrosReturnDescuentos;

    const [verModalEditDiscount, setverModalEditDiscount] = useState(false);

    const handleEditDiscount = () => {
        setverModalEditDiscount(!verModalEditDiscount);
    }

    const CambiarEliminarAbrirModal = () => {
        CambiarDescuentoSeleccionado(InfoDescuento);
        CambiarEstadoModalEliminar(true);
    }
    return (
            <Card sx={{width:"100%"}} elevation={0}>
                <Stack padding={2} >
                    <Stack direction="row" gap={1.5} bgcolor={"#FFFFFF"} justifyContent="space-between">
                        <Stack gap={1}>
                            <Typography color="primary.main">{InfoDescuento.terDesDescripcion}</Typography>
                            <Stack>
                                <Stack direction="row" gap={1.5} divider={<Divider orientation={"vertical"} flexItem />}>
                                    <Stack gap={0.5} direction="row" alignItems={"center"}>
                                        <Typography variant="subtitle2">Plazo(dias):</Typography>
                                        <Typography variant="body2" color={"text.secondary"}>{InfoDescuento.terDesPlazo}</Typography>
                                    </Stack>
                                    <Stack gap={0.5} direction="row">
                                        <Typography variant="subtitle2">%:</Typography>
                                        <Typography variant="body2" color={"text.secondary"}>{InfoDescuento.terDesPorcentaje}</Typography>
                                    </Stack>
                                    <Stack gap={0.5} direction="row">
                                        <Typography variant="subtitle2">Ciudad:</Typography>
                                        <Typography variant="body2" color={"text.secondary"}>{InfoDescuento.terDesCiudadDesc}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction={"row"} gap={0.5}>
                                    <Stack gap={0.5} direction="row" alignItems={"center"}>
                                        <Typography variant="subtitle2">Observaciones:</Typography>
                                        <Typography variant="body2" color={"text.secondary"}>{InfoDescuento.terDesObs}</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack direction="row" gap={1} alignItems="center">
                            <Tooltip title="Eliminar" placement="top" arrow >
                                <IconButton size="small" color="error" onClick={()=> CambiarEliminarAbrirModal()}>
                                    <DeleteOutlined fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar" placement="top" arrow >
                                <IconButton 
                                    size="small" 
                                    color="primary" 
                                    onClick={() => { 
                                        CambiarDescuentoSeleccionado(InfoDescuento);
                                        CambiarEstadoModalCrearEditar(true);
                                    }}
                                >
                                    <EditOutlined fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
    )
}

export default DescuentoCard