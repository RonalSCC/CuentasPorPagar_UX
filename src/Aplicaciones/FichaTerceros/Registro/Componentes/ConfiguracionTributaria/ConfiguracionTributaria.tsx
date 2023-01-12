import { Checkbox, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import CheckCard from './CheckCard'

const ConfiguracionTributaria = () => {

    const propsInputs: Record<string, any> = {
        variant: "outlined",
        size: 'small',
    }; 

    return (
        <Stack p={3} gap={1.5} width="100%" bgcolor="white" border={0.8} borderColor="background.default" borderRadius={0.5}>
            <Stack gap={3}>
                <Stack gap={1.5} direction="column">
                    <Stack gap={1.5} direction="row">
                        <CheckCard title="Gran Contribuyente"/>
                        <CheckCard title="Gran Contribuyente Bogotá" />
                        <CheckCard title="Responsable de IVA" />
                    </Stack>
                    <Stack gap={1.5} direction="row">
                        <CheckCard title="Régimen Simple" />
                        <CheckCard title="Régimen especial (otro)" />
                        <CheckCard title="No obligado a Facturar" />
                    </Stack>
                    <Stack gap={1.5} direction="row">
                        <CheckCard title="Autorretenedor RTF" />
                        <CheckCard title="Autorretenedor ICA" />
                        <CheckCard title="Exento de retención de CREE" />
                    </Stack>
                </Stack>
                <Typography variant="h6" color="primary">
                    Otras Configuraciones
                </Typography>
                <Stack gap={1.5} direction="row">
                    <TextField {...propsInputs} label="Porcentaje ICA" fullWidth></TextField>
                    <FormControl size="small" fullWidth>
                        <TextField {...propsInputs} id="select" label="Agente retenedor de ICA" select>
                            <MenuItem value="10">Ten</MenuItem>
                            <MenuItem value="20">Twenty</MenuItem>
                        </TextField>
                    </FormControl>
                    <FormControl size="small" fullWidth>
                        <TextField {...propsInputs} id="select" label="Agente retenedor de IVA" select>
                            <MenuItem value="10">Ten</MenuItem>
                            <MenuItem value="20">Twenty</MenuItem>
                        </TextField>
                    </FormControl>
                </Stack>
                <Stack gap={1.5}>
                    <Stack gap={1.5} direction="row">
                        <CheckCard title="Gran Contribuyente" />
                        <CheckCard title="Gran Contribuyente Bogotá" />
                        <CheckCard title="Responsable de IVA" />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ConfiguracionTributaria