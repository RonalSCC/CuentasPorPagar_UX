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
    const [ListaTerceros, setListaTerceros] = useState<Array<any>>([
        {
            TerID: "0",
            TerNombre: "MUROS Y TECHOS SAS.",
            TerTipoIden: "NIT",
            TerNit: "000000000",
            TerDVNit: "0"
        },
        {
            TerID: "1",
            TerNombre: "GARCIA  ANDREA M ",
            TerTipoIden: "TI",
            TerNit: "800312546",
            TerDVNit: ""
        },
        {
            TerID: "2",
            TerNombre: "UNDEFINED UNDEFINED UNDEFINED UNDEFINED",
            TerTipoIden: "TI",
            TerNit: "800240247",
            TerDVNit: ""
        },
        {
            TerID: "5",
            TerNombre: "CHAVES ROCHA CARLOS ANDRÉS",
            TerTipoIden: "CC",
            TerNit: "80093286",
            TerDVNit: ""
        }
    ]);

    // useEffect(() => {
    //     ConsultarTerceros();
    // }, []);

    // const  ConsultarTerceros = async () => {
    //     let Respuesta= await CrearPeticion({
    //         URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
    //         Body: {
    //             Clave: 1,
    //             UsuarioID: 1
    //         }
    //     });

    //     if (Respuesta && Array.isArray(Respuesta.Datos)) {
    //         setListaTerceros(Respuesta.Datos);
    //     }
    // }

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
            size="small"
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
