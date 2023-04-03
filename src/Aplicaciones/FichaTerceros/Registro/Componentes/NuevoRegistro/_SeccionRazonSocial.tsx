import { Stack, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor';

export default function _SeccionTipoPersona() {
    
    const { propsTercerosContexto }: { propsTercerosContexto: PropsTerceroContexto } = useContext<any>(TercerosContexto);
    const {
       BloquearCamposAcceso
     } = propsTercerosContexto;

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
                        disabled={BloquearCamposAcceso("TerNombre")}
                    />
                )}
            />
        </Stack>
    )
}
