import { Stack, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export default function _SeccionTipoPersona() {
    
    const { control } = useFormContext();
    
    return (
        <Stack direction="row" gap={1.5}>
            <Controller
                control={control}
                name="terRazonSocial"
                render={({ field, formState: { errors } }) => (
                    <TextField
                        {...field}
                        variant= "outlined"
                        size="small"
                        fullWidth
                        type="text"
                        label="Razón Social"
                        error={!!errors.terRazonSocial}
                        helperText={errors.terRazonSocial && `${errors.terRazonSocial.message}`}
                    />
                )}
            />
        </Stack>
    )
}
