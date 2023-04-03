import { Stack, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';

export default function _SeccionContactoTercero() {
    
    const { propsTercerosContexto }: { propsTercerosContexto: PropsTerceroContexto } = useContext<any>(TercerosContexto);
    const {
       BloquearCamposAcceso
     } = propsTercerosContexto;
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
                            disabled={BloquearCamposAcceso("TerNombreContacto")}
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
                            disabled={BloquearCamposAcceso("TerCorreoContacto")}
                        />
                    )}
                />
            </Stack>
        </>
    )
}


