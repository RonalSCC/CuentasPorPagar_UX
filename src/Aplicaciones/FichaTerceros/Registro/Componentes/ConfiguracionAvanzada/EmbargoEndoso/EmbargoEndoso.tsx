import { Info } from '@mui/icons-material'
import { Stack, Card, Alert, TextField, Divider, FormControlLabel, FormGroup, Checkbox, Icon, AlertTitle, Autocomplete, MenuItem } from '@mui/material'
import Image from 'mui-image'
import { useContext, useEffect, useState } from 'react';
import { SendRequest } from '../../../../../../Consumos/Request';
import { TercerosContexto } from '../../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../../Contextos/TercerosProveedor';
import { Controller, useForm } from 'react-hook-form'
import { ITercero } from '../../NuevoRegistro/_FormularioTercero';
import { DevTool } from '@hookform/devtools';

export interface ITerceroEndoso {
    tdaTerId: number,
    tdaEmbargado: boolean,
    tdaBeneficiario: string,
    tdaTerBenTransferencia: string
}

const EmbargoEndoso = () => {

    const { propsTercerosContexto }: { propsTercerosContexto: PropsTerceroContexto } = useContext<any>(TercerosContexto);
    const [TercerosList, setTercerosList] = useState<Array<any>>([])

    const { control, setValue } = useForm({
        defaultValues:{
            tdaBeneficiario:"",
            tdaEmbargado:false,
            tdaTerBenTransferencia:"",

        },
        mode: "onChange"
    })

    const ConsultarTerceros = () => {
        SendRequest.get({
            API: "CONFIGURACION",
            URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
            Body: {
                Clave: "TercerosClienteProveedor"
            }
        }).then(respuesta => {
            if (respuesta != null && respuesta.ok) {
                setTercerosList(respuesta.datos)
            }
        })
    }

    const EditarTerceroEndoso = () => {

    }

    const ConsultarTerceroEndoso = () => {
        SendRequest.get({
            API: "CUENTASPORPAGAR",
            URLServicio: "/EmbargoEndosoTerceros/Consultar_EmbargoEndosoTercero",
            Body: {
                TerId: propsTercerosContexto.TerceroSeleccionadoLista?.TerID
            }
        }).then(respuesta => {
            if (respuesta != null && respuesta.ok == true) {
                setValue("tdaEmbargado", respuesta.datos.tdaEmbargado || false)
                setValue("tdaBeneficiario", respuesta.datos.tdaBeneficiario || "")
                setValue("tdaTerBenTransferencia", respuesta.datos.tdaTerBenTransferencia || "")
            }
        }).catch(respuesta => {

            propsTercerosContexto.CambiarAlertas(
                respuesta.errores.map((x: any) => {
                    return <>
                        <Alert
                            key={x.descripcion}
                            severity="warning"
                            onClose={() => propsTercerosContexto.CerrarAlertas()}
                        >
                            <AlertTitle>Error</AlertTitle>
                            {x.descripcion}
                        </Alert>
                    </>;
                })
            );
        })
    }

    useEffect(() => {
        ConsultarTerceros()
    }, [])

    useEffect(() => {
        ConsultarTerceroEndoso()
    }, [])

    return (
        <>
            <Stack width={"100%"} border={0.8} borderColor="#F1F0EE" borderRadius={0.5}>
                <Card>
                    <Stack p={2} gap={1}>
                        <Stack>
                            <Alert
                                icon={<Image
                                    width={47.78}
                                    fit='cover'
                                    src="Imagenes/Terceros/AccountingDocuments.svg" />}
                                severity="info"
                                sx={{ alignItems: "center" }}>
                                Aplica para el endoso de documentos contables
                            </Alert>
                        </Stack>
                        <Stack>
                            <Controller
                                control={control}
                                name="tdaBeneficiario"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        size="small"
                                        label="Beneficiario endoso"
                                        fullWidth></TextField>
                                )}
                            />

                        </Stack>
                        <Divider orientation='horizontal' />
                        <Stack px={1} direction="row" alignItems="center">
                            <FormGroup>
                                <Controller
                                    control={control}
                                    name="tdaEmbargado"
                                     
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} name="tdaEmbargado" size="small" checked={field.value} />}
                                            label="Tercero Embargado" />
                                    )}
                                />
                            </FormGroup>
                            <Icon>
                                <Info fontSize="small" color="disabled"></Info>
                            </Icon>
                        </Stack>
                        <Stack>
                            <Controller
                                control={control}
                                name="tdaTerBenTransferencia"
                                render={({ field: { value, onChange, ref } }) => (
                                    <Autocomplete
                                        value={
                                            value ? (TercerosList.find((option) => value === option.TerID) ?? null) : null
                                        }
                                        getOptionLabel={(option) => option.TerNit + " - " + option.TerNombre}
                                        onChange={(e: any, newValue) => {
                                            onChange(newValue ? newValue.TerID : null);
                                        }}
                                        options={TercerosList}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={"Beneficiiaro"}
                                                inputRef={ref}
                                            />
                                        )}
                                    />
                                    // <TextField
                                    //     {...field}
                                    //     name="tdaBeneficiario"
                                    //     size="small"
                                    //     label="Beneficiario del embargo"
                                    //     fullWidth
                                    //     select
                                    //     >{
                                    //         TercerosList.map((ter) => <MenuItem key={ter.TerID} value={ter.TerID}>{ter.TerNit} - {ter.TerNombre}</MenuItem>)
                                    //     }
                                    // </TextField>
                                )}
                            />
                        </Stack>
                    </Stack>
                </Card>
            </Stack >
            <DevTool control={control}></DevTool>
        </>
    )
}

export default EmbargoEndoso