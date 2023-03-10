import { Stack, TextField, Chip } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export interface I_SeccionTelefono {
    nombreControl: string,
    label: string
}
export const _SeccionTelefono = ({nombreControl , label}:I_SeccionTelefono) => {
    
    const {control} = useFormContext()
    
    return (
        <>
            <Controller
                control={control}
                name={nombreControl.toString()}
                render={({ field, formState: { errors } }) => (

                    <TextField
                        {...field}
                        variant="outlined"
                        size="small"
                        fullWidth
                        id={nombreControl.toString()}
                        label={label}
                        error={!!errors.nombreControl}
                        helperText={errors.nombreControl && `${errors.nombreControl.message}`}
                    />
                )}
            />

            <Stack direction={"row"} gap={1.5} >
                <Chip size='small' label='Número1' />
                <Chip size='small' label='Número2' />

            </Stack>
        </>
    )
}
