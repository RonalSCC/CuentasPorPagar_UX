import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

export default function AutocompleteTerceros(
    {
        SeleccionarTercero
    }:
    {
        SeleccionarTercero:Function
    }
) {
    const lista_Terceros = [
        { 
            ID: '163', 
            TipoIdentificacion: "CC",
            Identificacion: "1001277214",
            NombreTercero: "Ronal Santiago Castaño Chaparro"
        }
    ];
  return (

    <>
        <Autocomplete
            id="comboTerceros"
            getOptionLabel={ options => {
                return `[ID]: ${options.ID} - [${options.TipoIdentificacion}]: ${options.Identificacion} - ${options.NombreTercero}`
            }}
            options={lista_Terceros}
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
                                        <SearchIcon color='secondary'/> 
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
