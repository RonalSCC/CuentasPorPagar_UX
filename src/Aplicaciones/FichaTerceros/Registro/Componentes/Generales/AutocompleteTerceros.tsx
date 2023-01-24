import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { CrearPeticion } from '../../../../../Consumos/APIManager';
import { AutocompletarAYF } from '@ayf/generales';

export interface AutocompleteTercerosProps {
    SeleccionarTercero:Function
}
export default function AutocompleteTerceros({SeleccionarTercero}:AutocompleteTercerosProps) {

  return (
    <>

    <AutocompletarAYF 
        URLServicio={`${process.env.REACT_APP_URL_API_CONFIGURACION}/ConsultasGenerales/ConsultarInformacionListas`}
        Body={{
            Clave: 1,
            UsuarioID: 1,
        }}
        Paginado={true}
        PropsAutocomplete={{
            id:"ComboTerceros",
            getOptionLabel: options => {
                if(options.TerID && options.TerTipoIden && options.TerNit && options.TerNombre){
                    return `[ID]: ${options.TerID} - [${options.TerTipoIden}]: ${options.TerNit} - ${options.TerNombre}`
                }else{
                    return "";
                }
            },
            size:"small",
            onChange:(event,select) => {
                SeleccionarTercero(select)
            },
            renderInput:(params) => {
                return (
                    <TextField
                            {...params}
                            InputProps={{ ...params.InputProps, 
                                endAdornment: (
                                    <>
                                        <InputAdornment position="end"> 
                                            <SearchIcon sx={{color:"text.secondary"}}/> 
                                        </InputAdornment> 
                                    </>
                                ),  
                            }}
                    />
                )
            }
        }}
    />
    </>
  )
}
