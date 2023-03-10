import { Stack, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export default function _SeccionContactoTercero() {
    
    const {control} = useFormContext();
    
    return (
        <>
            {/* Nombre, mail contacto */}
            <Stack direction="row" gap={.5}>
                <Controller
                    control={control}
                    name="terContactoPrincipalNombre"
                    defaultValue={undefined}
                    render={({ field, formState: { errors } }) => (

                        <TextField
                            {...field}
                            variant="outlined"
                            size="small"
                            fullWidth
                            id="terContactoPrincipalNombre"
                            label="Nombre"
                            error={!!errors.terContactoPrincipalNombre}
                            helperText={errors.terContactoPrincipalNombre && `${errors.terContactoPrincipalNombre.message}`}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="terContactoPrincipalEmail"
                    defaultValue={undefined}
                    render={({ field, formState: { errors } }) => (

                        <TextField
                            {...field}
                            variant="outlined"
                            size="small"
                            fullWidth
                            id="terContactoPrincipalEmail"
                            label="Email"
                            error={!!errors.terContactoPrincipalEmail}
                            helperText={errors.terContactoPrincipalEmail && `${errors.terContactoPrincipalEmail.message}`}
                        />
                    )}
                />
            </Stack>
        </>
    )
}


