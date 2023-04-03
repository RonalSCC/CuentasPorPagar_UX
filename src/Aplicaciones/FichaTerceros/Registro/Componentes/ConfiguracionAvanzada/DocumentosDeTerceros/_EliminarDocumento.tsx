import { Dialog, Stack, Typography, DialogActions, Button } from '@mui/material'
import Image from 'mui-image'

export interface EliminarDocumentoProps {
    estado: boolean,
    cambiarEstado: Function,
    eliminarDocTercero:() => void
}

const EliminarDocumento = ({ eliminarDocTercero, estado, cambiarEstado }: EliminarDocumentoProps) => {
    return (
        <Stack>
            <Dialog
                open={estado}
                onClose={() => cambiarEstado()}
                fullWidth
                maxWidth="xs"
                
            >
                <Stack p={3} gap={3} maxWidth={444}>
                    <Stack alignSelf="center">
                        <Image fit='cover' src={"Imagenes/Terceros/EliminarDocumento.svg"} alt="" />
                    </Stack>
                    <Stack direction="column" gap={1}>
                        <Typography textAlign="center" noWrap variant="h6" color="primary">Eliminar Documento</Typography>
                        <Typography textAlign="center" variant="body1" color="text.secondary">
                            Al eliminar el documento no se podrá rehacer
                        </Typography>
                    </Stack>
                </Stack>
                <DialogActions>
                    <Stack py={1} direction="row" alignItems="center" justifyContent="end">
                        <Button onClick={() => cambiarEstado()}>
                            Cancelar
                        </Button>
                        <Button variant='outlined' color='error' onClick={() => eliminarDocTercero()}>
                            Eliminar
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}

export default EliminarDocumento