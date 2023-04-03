import { CardActionArea, Checkbox } from '@mui/material'
import { Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { ChangeEvent, useContext, useRef, useState } from 'react'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import ICambioConfiguracionTributaria from '../../../Interfaces/Registro/ConfiguracionTributaria/ICambioConfiguracionTributaria'
import IImpuestoConfigTributaria from '../../../Interfaces/Registro/ConfiguracionTributaria/IImpuestoConfigTributaria'

export interface CheckCardProps {
    ImpuestoConfig: IImpuestoConfigTributaria,
    CambiarValor: (ConfiguracionTCambio: ICambioConfiguracionTributaria) => void
}

const CheckCard = ( DatosCheckCard: CheckCardProps) => {

    const {
        ImpuestoConfig,
        CambiarValor
    } = DatosCheckCard;

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        BloquearCamposAcceso
    } = propsTercerosContexto;

    const isCheck = ImpuestoConfig?.valor == "1" || ImpuestoConfig?.valor?.toLocaleLowerCase() == "true" ? true: false
    const [checked, setChecked] = useState(isCheck);

    const [inputProps, setinputProps] = useState<Record<string, any>>({
        borderColor: isCheck ? "secondary.main" : "background.default",
        backgroundColor: isCheck ? "rgb(0 139 176 /0.1)" : ""
    });

    const checkRef = useRef(null);

    const CambiarEstadoCheck = () => {
        if (!BloquearCamposAcceso(ImpuestoConfig.idAcceso)) {
            setChecked(!checked);
            let estadoCheck = !checked;
            if (estadoCheck){
                setinputProps({
                    backgroundColor: "rgb(0 139 176 /0.1)",
                    borderColor: "secondary.main"
                })
            }
            else{
                setinputProps({
                    borderColor: "background.default"
                })
            }

            CambiarValor({
                TCTId: ImpuestoConfig.id,
                Valor: estadoCheck == true ? "1" : "0"
            });
        }
        
    };

    return (
        <Stack width="24.3%">
            <Card 
                variant="outlined" sx={{ ...inputProps }}
                onClick={(e) =>   CambiarEstadoCheck()}
            >
                <CardActionArea  >
                    <Stack>
                        <Stack p={1} >
                            <Stack direction="row" alignItems="center" >
                                <Checkbox 
                                    disabled={BloquearCamposAcceso(ImpuestoConfig.idAcceso)}
                                    ref={checkRef}
                                    id={ImpuestoConfig.id} 
                                    onChange={(e) =>  CambiarEstadoCheck()}
                                    size="small" 
                                    color="secondary" 
                                    defaultChecked={ImpuestoConfig.valor == "1" ? true: false} 
                                    checked={checked} />
                                <Typography variant="body2" >{ImpuestoConfig.nombreMostrar}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardActionArea>
            </Card>
        </Stack>
    )
}

export default CheckCard