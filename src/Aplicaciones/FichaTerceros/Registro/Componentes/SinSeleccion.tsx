import React, { useContext, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Image from 'mui-image';
import Button from '@mui/material/Button';
// Icons
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import { TercerosContexto } from '../../Contextos/TercerosContexto';
import {AutocompletarAYF} from '@ayf/generales';
import { TerceroSeleccionadoLista } from '../../Contextos/TercerosProveedor';
import AutocompleteTerceros from './Generales/AutocompleteTerceros';


export default function SinSeleccion() {
    
    const {propsTercerosContexto}:{propsTercerosContexto:any} = useContext<any>(TercerosContexto);

    useEffect(() => {
        propsTercerosContexto.CambiarTituloPageHeader("Administración de terceros");
    }, [])
    
    const CambiarTercero = (seleccion:TerceroSeleccionadoLista) => {
        if (seleccion != null) {
            propsTercerosContexto.CambiarTerceroSeleccionadoLista(seleccion);
        }
    }
    
  return (
    <Stack direction="column" paddingX={3} height="100%" gap={3} width="100%">
        <Stack direction="column" position="relative">
            <Stack height="50%" direction="row" position="absolute" width="100%" style={{backgroundColor:"primary"}}>
                <Image fit='cover' src={"Imagenes/Terceros/FondoSeleccionarTerceros.png"} alt="" />
            </Stack>
            <Stack paddingTop={7} gap={1.5} zIndex={2} width="100%" direction="row" justifyContent="center">
                <Card style={{width: "48%", backgroundColor:"#FFFFFF"}}>
                    <CardContent>
                        <Stack gap={3} direction="column" padding={2}>
                            <Stack direction="column">
                                <Typography textAlign={"center"} variant="h6" color="text.primary">
                                    Selecciona el tercero que deseas consultar
                                </Typography>
                            </Stack>
                            <Stack direction="column">
                                <AutocompleteTerceros SeleccionarTercero={CambiarTercero} />
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Stack>
            
        <Stack gap={1.5} direction={"column"} display="flex" alignItems={"center"} >
            <Image src={"Imagenes/Terceros/Ilustracion-SinSeleccion.svg"} width="20%" alt="Nuevo Tercero" />
            <Button 
                variant="contained"
                onClick={ ()=> propsTercerosContexto.CambiarEstadoNuevoRegistro(true)}
            >
                Crear nuevo tercero
            </Button>
        </Stack>
    </Stack>
  )
}
