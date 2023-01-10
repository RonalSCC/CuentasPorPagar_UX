import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { CrearPeticion } from '../../../../../Consumos/APIManager';

export default function AutocompleteTerceros(
    {
        SeleccionarTercero
    }:
    {
        SeleccionarTercero:Function
    }
) {
    const [ListaTerceros, setListaTerceros] = useState<Array<any>>();

    useEffect(() => {
        ConsultarTerceros();
    }, []);

    const  ConsultarTerceros = async () => {
        let Respuesta= await CrearPeticion({
            URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
            Body: {
                Clave: 1,
                UsuarioID: 1
            }
        });

        if (Respuesta && Array.isArray(Respuesta.Datos)) {
            setListaTerceros(Respuesta.Datos);
        }
    }

  return (

    <>
        <Autocomplete
            id="comboTerceros"
            getOptionLabel={ options => {
                if(options.TerID && options.TerTipoIden && options.TerNit && options.TerNombre){
                    return `[ID]: ${options.TerID} - [${options.TerTipoIden}]: ${options.TerNit} - ${options.TerNombre}`
                }else{

                    return "";
                }

            }}
            value={null}
            options={ListaTerceros as Array<any>}
            onChange={(event,select) => {SeleccionarTercero(select)}}
            fullWidth
            renderInput={(params) => {
                return (
                    <TextField 
                        {...params} 
                        fullWidth
                        InputProps={{ ...params.InputProps, 
                            endAdornment: (
                                <>
                                    <InputAdornment position="end"> 
                                        <SearchIcon sx={{color:"text.secondary"}}/> 
                                    </InputAdornment> 
                                </>
                            ),  
                        }}
                        placeholder='ID, número de identificación ó nombre'
                    />
                )}
            }
        />
    </>
  )
}
