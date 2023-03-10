import { CardActionArea, Checkbox } from '@mui/material'
import { Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { ChangeEvent, useState } from 'react'
import ICambioConfiguracionTributaria from '../../../Interfaces/Registro/ConfiguracionTributaria/ICambioConfiguracionTributaria'
import IImpuestoConfigTributaria from '../../../Interfaces/Registro/ConfiguracionTributaria/IImpuestoConfigTributaria'

export interface CheckCardProps {
    ImpuestoConfig: IImpuestoConfigTributaria,
    CambiarValor: (ConfiguracionTCambio: ICambioConfiguracionTributaria) => void
}

const CheckCard = ({ ImpuestoConfig, CambiarValor }: CheckCardProps) => {

    const isCheck = ImpuestoConfig?.valor == "1" || ImpuestoConfig?.valor?.toLocaleLowerCase() == "true" ? true: false
    const [checked, setChecked] = useState(isCheck);

    const [inputProps, setinputProps] = useState<Record<string, any>>({
        borderColor: isCheck ? "secondary.main" : "background.default",
        backgroundColor: isCheck ? "rgb(0 139 176 /0.1)" : ""
    });

    const CambiarEstadoCheck = (check:boolean) => {
        setChecked(check);
        if (check){
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
            Valor: check == true ? "1" : "0"
        });
    };

    return (
        <Stack width="23.5%">
            <Card variant="outlined" sx={{ ...inputProps }}>
                <CardActionArea>
                    <Stack>
                        <Stack p={2}>
                            <Stack direction="row" alignItems="center">
                                <Checkbox 
                                    id={ImpuestoConfig.id} 
                                    size="small" 
                                    color="secondary" 
                                    onChange={(e,check) =>  CambiarEstadoCheck(check)} 
                                    defaultChecked={ImpuestoConfig.valor == "1" ? true: false} 
                                    checked={checked} />
                                <Typography variant="subtitle2">{ImpuestoConfig.nombreMostrar}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardActionArea>
            </Card>
        </Stack>
    )
}

export default CheckCard