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
                    name="primerNombre"
                    defaultValue=""
                    render={({ field, formState: { errors } }) => (
                        <TextField
                            {...field}
                            {...propsInputs}
                            id="primerNombre"
                            label="Primer nombre"
                            placeholder='Pimer Nombre'
                            required
                            error={!!errors.primerNombre}
                            helperText={errors.primerNombre && `${errors.primerNombre.message}`}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="segundoNombre"
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...propsInputs}
                            id="segundoNombre"
                            label="Segundo nombre"
                            placeholder='Segundo Nombre'
                        />
                    )}
                />
            </Stack>
            <Stack direction="row" gap={1.5}>
                <Controller
                    control={control}
                    name="primerApellido"
                    defaultValue=""
                    render={({ field, formState:{errors} }) => (

                        <TextField
                            {...field}
                            {...propsInputs}
                            id="primerApellido"
                            label="Primer apellido"
                            required
                            error={!!errors.primerApellido}
                            helperText={errors.primerApellido && `${errors.primerApellido.message}`}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="segundoApellido"
                    render={({ field }) => (
                        < TextField
                            {...field}
                            {...propsInputs}
                            id="segundoApellido"
                            label="Segundo apellido"
                        />
                    )}
                />
            </Stack>
        </>
    )
}
