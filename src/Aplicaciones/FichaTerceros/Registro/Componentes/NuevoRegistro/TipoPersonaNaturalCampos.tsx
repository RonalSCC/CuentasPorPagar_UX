import { Stack, TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import React from 'react'


export default function TipoPersonaNaturalCampos(
    {
        propsInputs
    }:
        {
            propsInputs: Record<string, any>
        }
) {

    const { control } = useFormContext();
    return (
        <>
            {/* Nombre */}
            <Stack direction="row" gap={1.5}>
                <Controller
                    control={control}
                    name="terPrimerNombre"
                    defaultValue=""
                    render={({ field, formState: { errors } }) => (
                        <TextField
                            {...field}
                            {...propsInputs}
                            id="terPrimerNombre"
                            label="Primer nombre"
                            placeholder='Pimer Nombre'
                            required
                            error={!!errors.terPrimerNombre}
                            helperText={errors.terPrimerNombre && `${errors.terPrimerNombre.message}`}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="terSegundoNombre"
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...propsInputs}
                            id="terSegundoNombre"
                            label="Segundo nombre"
                            placeholder='Segundo Nombre'
                        />
                    )}
                />
            </Stack>
            <Stack direction="row" gap={1.5}>
                <Controller
                    control={control}
                    name="terPrimerApellido"
                    defaultValue=""
                    render={({ field, formState:{errors} }) => (

                        <TextField
                            {...field}
                            {...propsInputs}
                            id="terPrimerApellido"
                            label="Primer apellido"
                            required
                            error={!!errors.terPrimerApellido}
                            helperText={errors.terPrimerApellido && `${errors.terPrimerApellido.message}`}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="terSegundoApellido"
                    render={({ field }) => (
                        < TextField
                            {...field}
                            {...propsInputs}
                            id="terSegundoApellido"
                            label="Segundo apellido"
                        />
                    )}
                />
            </Stack>
        </>
    )
}
