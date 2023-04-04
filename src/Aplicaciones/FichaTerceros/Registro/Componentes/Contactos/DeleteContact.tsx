import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogTitle, Stack, Typography } from '@mui/material'
import Image from 'mui-image'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CrearPeticion, CrearPeticionAxios } from '../../../../../Consumos/APIManager'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'

export interface DeleteContactProps {
  estado: boolean,
  cambiarEstado: Function,
  id: number
}

const DeleteContact = (DeleteContactProps: DeleteContactProps) => {
  const { 
    estado, 
    cambiarEstado, 
    id 
  } = DeleteContactProps;

  const { propsTercerosContexto }: { propsTercerosContexto: any } = useContext<any>(TercerosContexto);
  
  const navigate = useNavigate();

  const handleDeleteContact = async () => {

    let PorpsDefaultRequest:CrearPeticionAxios = {
      API: 'CUENTASPORPAGAR',
      URLServicio: '/ContactosTercero/EliminarContactoTercero',
      Type: 'DELETE',
      Body: {
        idContacto: id
      }
    }

    await CrearPeticion({
      ...PorpsDefaultRequest
    }).then(response => {
      if (response != null) {
        if (response.ok) {

          propsTercerosContexto.CambiarAlertas(
            [1].map(() => {
              return <>
                <Alert
                  key={1}
                  severity="success"
                  onClose={() => propsTercerosContexto.CerrarAlertas()}
                >
                  El contacto fue eliminado con exito
                  
                </Alert>
              </>
            })
          )
          cambiarEstado();
          navigate("/FichaTerceros/MarcoTerceros/Contactos", {
            state: {
              Reload: true
            }
          });

        }
        else if (response.errores && response.errores.length > 0) {
          propsTercerosContexto.CambiarAlertas(
            response.errores.map(x => {
              return <>
                <Alert
                  key={x.descripcion}
                  severity="warning"
                  onClose={() => propsTercerosContexto.CerrarAlertas()}
                >
                  <AlertTitle>Error</AlertTitle>
                  {x.descripcion}
                </Alert>
              </>;
            })
          );
        }
      }
    })

  }

  return (
    <>
      <Dialog
        open={estado}
        onClose={() => cambiarEstado()}
      >
        <Stack p={3} gap={3} maxWidth={444}>
          <Stack maxWidth={211} alignSelf="center">
            <Image fit='cover' src={"Imagenes/Terceros/EliminarContacto.svg"} alt="" duration={0}/>
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography
              textAlign="center"
              variant="h6"
              noWrap
              color="primary"
            >
              Eliminar Contacto
            </Typography>
            <Typography textAlign="center" variant="body1" color="text.secondary">
              Recuerda que toda la información suministrada será
              borrada definitivamente
            </Typography>
          </Stack>
        </Stack>
        <DialogActions>
          <Stack py={1} direction="row" alignItems="center" justifyContent="end">
            <Button onClick={() => cambiarEstado()}>
              Cancelar
            </Button>
            <Button
              variant='outlined'
              color='error'
              onClick={handleDeleteContact}
            >
              Eliminar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteContact