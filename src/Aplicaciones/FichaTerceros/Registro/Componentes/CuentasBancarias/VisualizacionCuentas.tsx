import { Card, CardContent, FormControlLabel, FormGroup, Stack, Switch } from '@mui/material'
import React from 'react'

export default function VisualizacionCuentas() {
  return (
    <>
        <Stack direction="column" gap={3} padding={3}>
            <Stack direction="column" gap={1.5}>
                <Card>
                    <CardContent>
                        <Stack direction="column" paddingY={1.5} paddingX={2}>
                            <Stack direction="row" gap={1.5}>
                                <Stack direction="column" gap={1}>
                                    {/* Contenido */}
                                    <Stack direction="column">

                                    </Stack>
                                    {/* Switch */}
                                    <FormGroup>
                                        <FormControlLabel control={<Switch defaultChecked />} label="Activa" />
                                    </FormGroup>
                                </Stack>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Stack>
    </>
  )
}
