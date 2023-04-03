import { EditOutlined } from '@mui/icons-material'
import { Card, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

export interface IPropsCardInformacionGeneral{
    Titulo?:string,
    children: any,
    MetodoEditar: Function,
    propsTypography?: Record<string, string>
}
export default function CardInformacionGeneral(CardInformacionGeneralProps:IPropsCardInformacionGeneral) {

    const {
        Titulo,
        children,
        MetodoEditar, 
        propsTypography
    } = CardInformacionGeneralProps;
  return (
    <Card sx={{backgroundColor:"white"}}>
        <Stack direction="column" padding={2} gap={1.5}>
            <Stack direction="row" justifyContent={"space-between"} alignItems="center">
                <Typography variant="subtitle2" color="primary.main" {...propsTypography}>
                    {Titulo}
                </Typography>

                <IconButton onClick={() =>MetodoEditar()} size='small'>
                    <EditOutlined color='primary' fontSize='small'/>
                </IconButton>
            </Stack>
            
            {children}
        </Stack>
    </Card>
  )
}
