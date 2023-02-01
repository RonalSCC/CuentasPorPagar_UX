import { Percent } from '@mui/icons-material'
import { Checkbox, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import CheckCard from './CheckCard'

const ConfiguracionTributaria = () => {

    const Inputsprops: Record<string, any> = {
        variant: "outlined",
        size: 'small',
    };

    return (
        <Stack gap={1.5} width="100%" >
            <Card>
                <Stack gap={1.5} p={2}>
                    <Stack gap={1.5}>
                        <Stack gap={1.5} direction="row">
                            <CheckCard title="Gran Contribuyente" />
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
                </Stack>
            </Card>
            <Card>
                <Stack gap={1.5} p={2}>
                    <Typography variant="h6" color="primary">
                        Otras Configuraciones
                    </Typography>
                    <Stack gap={1.5} direction="row">
                        <TextField
                            label="Porcentaje ICA" 
                            fullWidth
                            size="small" 
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">
                                    <Percent fontSize="small"></Percent>
                                </InputAdornment>,
                            }}
                            />
                        <FormControl size="small" fullWidth>
                            <TextField
                                size="small"
                                variant="outlined"
                                id="AgenteRetenedorICA"
                                label="Agente retenedor de ICA"
                                select
                            >
                                <MenuItem value="10">Ten</MenuItem>
                                <MenuItem value="20">Twenty</MenuItem>
                            </TextField>
                        </FormControl>
                        <FormControl size="small" fullWidth>
                            <TextField
                                id="AgenteRetenedorIVA"
                                size="small"
                                variant="outlined"
                                label="Agente retenedor de IVA"
                                select
                            >
                                <MenuItem value="10">Ten</MenuItem>
                                <MenuItem value="20">Twenty</MenuItem>
                            </TextField>
                        </FormControl>
                    </Stack>
                    <Stack gap={1.5}>
                        <Stack gap={1.5} direction="row">
                            <CheckCard title="Profesional Independiente" />
                            <CheckCard title="Declarante de renta" />
                            <CheckCard title="Agente retenedor de IVA" />
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
        </Stack>


    )
}

export default ConfiguracionTributaria