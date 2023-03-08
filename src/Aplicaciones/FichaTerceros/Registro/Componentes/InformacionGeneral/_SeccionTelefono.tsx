import { Stack, TextField, Chip } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export interface I_SeccionTelefono {
    name: string,
    label: string
}
export const _SeccionTelefono = ({name = 'terTelefono', label = 'Teléfono'}:I_SeccionTelefono) => {
    
    const {control} = useFormContext()
    
    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field, formState: { errors } }) => (

                    <TextField
                        {...field}
                        variant="outlined"
                        size="small"
                        fullWidth
                        id="terTelefono"
                        label={label}
                        error={!!errors.terTelefono}
                        helperText={errors.terTelefono && `${errors.terTelefono.message}`}
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
