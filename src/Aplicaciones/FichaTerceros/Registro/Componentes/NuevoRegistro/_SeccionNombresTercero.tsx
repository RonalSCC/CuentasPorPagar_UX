import { Stack, TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import React, { useContext } from 'react'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';

export default function _SeccionNombreTercero() {

    const { propsTercerosContexto }: { propsTercerosContexto: PropsTerceroContexto } = useContext<any>(TercerosContexto);
    const {
       BloquearCamposAcceso
     } = propsTercerosContexto;
    const { control } = useFormContext();

    return (
        <>
            {/* Nombre */}
            <Stack direction="row" gap={1.5} width='100%'>
                <Controller
                    control={control}
                    name="terPrimerNombre"
                    defaultValue=""
                    render={({ field, formState: { errors } }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            size="small"
                            fullWidth
                            id="terPrimerNombre"
                            label="Primer nombre"
                            placeholder='Pimer Nombre'
                            required
                            error={!!errors.terPrimerNombre}
                            helperText={errors.terPrimerNombre && `${errors.terPrimerNombre.message}`}
                            disabled={BloquearCamposAcceso("TerNombre")}
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
                            variant="outlined"
                            size="small"
                            fullWidth
                            id="terSegundoNombre"
                            label="Segundo nombre"
                            placeholder='Segundo Nombre'
                            disabled={BloquearCamposAcceso("TerNombre")}
                        />
                    )}
                />
            </Stack>
            <Stack direction="row" gap={1.5} width='100%'>
                <Controller
                    control={control}
                    name="terPrimerApellido"
                    defaultValue=""
                    render={({ field, formState: { errors } }) => (

                        <TextField
                            {...field}
                            variant="outlined"
                            size="small"
                            fullWidth
                            id="terPrimerApellido"
                            label="Primer apellido"
                            required
                            error={!!errors.terPrimerApellido}
                            helperText={errors.terPrimerApellido && `${errors.terPrimerApellido.message}`}
                            disabled={BloquearCamposAcceso("TerNombre")}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="terSegundoApellido"
                    render={({ field }) => (
                        < TextField
                            {...field}
                            variant="outlined"
                            size="small"
                            fullWidth
                            id="terSegundoApellido"
                            label="Segundo apellido"
                            placeholder='Segundo Apellido'
                            disabled={BloquearCamposAcceso("TerNombre")}
                        />
                    )}
                />
            </Stack>
        </>
    )
}
