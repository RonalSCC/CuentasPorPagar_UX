import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material'
import React from 'react'

export interface PropsDatosCuentaEditar {
    ID?: string, 
    Name?: string
}
export default function DatosCuentaEditar(
    {
        ID,
        Name
    }:PropsDatosCuentaEditar
) {
  return (
    <>
        <Stack 
            direction={"row"} 
            gap={.5} 
            width="100%"
        >
            <TextField
                id={ID}
                name={Name}
                label="Cuenta"
                placeholder='Seleccione'
                select
                sx={{
                    width: "42%"
                }}
            >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
            </TextField>

            <TextField
                id={ID}
                name={Name}
                label="Sucursal"
                placeholder='Seleccione'
                select
                sx={{
                    width: "42%"
                }}
            >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
            </TextField>

            <FormControl sx={{
                    width: "15%"
                }}>
                <RadioGroup
                >
                    <FormControlLabel value="female" control={<Radio />} label="Principal" />
                </RadioGroup>
            </FormControl>
        </Stack>
    </>
  )
}
