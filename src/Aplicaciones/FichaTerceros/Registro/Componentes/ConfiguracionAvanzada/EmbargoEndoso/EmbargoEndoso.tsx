import { Info } from '@mui/icons-material'
import { Stack, Card, Alert, TextField, Divider, FormControlLabel, FormGroup, Checkbox, Icon } from '@mui/material'
import Image from 'mui-image'
import React from 'react'

const EmbargoEndoso = () => {
    return (
        <>
            <Stack width={"100%"} border={0.8} borderColor="#F1F0EE" borderRadius={0.5}>
                <Card>
                    <Stack p={2} gap={0.8}>
                        <Stack>
                            <Alert icon={<Image width={47.78} fit='cover' src="Imagenes/Terceros/AccountingDocuments.svg" />} severity="info"
                            >
                                Aplica para el endoso de documentos contables
                            </Alert>
                        </Stack>
                        <Stack>
                            <TextField size="small" label="Beneficiario endoso" fullWidth></TextField>
                        </Stack>
                        <Divider orientation='horizontal' />
                        <Stack px={1} direction="row" alignItems="center">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox size="small" defaultChecked={false} />} label="Tercero Embargado" />
                            </FormGroup>
                            <Icon>
                                <Info fontSize="small" color="disabled"></Info>
                            </Icon>
                        </Stack>
                        <Stack>
                            <TextField size="small" label="Beneficiario del embargo" fullWidth></TextField>
                        </Stack>
                    </Stack>
                </Card>
            </Stack>
        </>
    )
}

export default EmbargoEndoso