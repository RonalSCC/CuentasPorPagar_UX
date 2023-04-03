import { Info } from '@mui/icons-material'
import { Stack, Card, Alert, TextField, Divider, FormControlLabel, FormGroup, Checkbox, Icon, AlertTitle, Autocomplete, MenuItem, Button, Tooltip, duration } from '@mui/material'
import Image from 'mui-image'
import { useContext, useEffect, useState } from 'react';
import { SendRequest } from '../../../../../../Consumos/Request';
import { TercerosContexto } from '../../../../Contextos/TercerosContexto';
import { PropsTerceroContexto } from '../../../../Contextos/TercerosProveedor';
import { Controller, useForm } from 'react-hook-form'
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

    const { control, setValue, handleSubmit, watch } = useForm({
        defaultValues: {
            tdaBeneficiario: "",
            tdaEmbargado: false,
            tdaTerBenTransferencia: "",

        },
        mode: "onChange"
    })

    const tdaEmbargado = watch("tdaEmbargado")

    const ConsultarTerceros = (data: ITerceroEndoso) => {
        SendRequest.get({
            API: "CONFIGURACION",
            URLServicio: "/ConsultasGenerales/ConsultarInformacionListas",
            Body: {
                Clave: "TercerosClienteProveedor",
                Condiciones: JSON.stringify({
                    TextoFiltrado: data.tdaTerBenTransferencia
                })
            }
        }).then(respuesta => {
            if (respuesta != null && respuesta.ok) {
                setTercerosList(respuesta.datos)
                setValue("tdaTerBenTransferencia", `${data.tdaTerBenTransferencia}` || "")
            }
        })
    }

    const EditarTerceroEndoso = (data: any) => {
        SendRequest.put({
            API: "CUENTASPORPAGAR",
            URLServicio: "/EmbargoEndosoTerceros/Actualizar_EmbargoEndosoTercero",
            Body: {
                TDATerId: propsTercerosContexto.TerceroSeleccionadoLista?.TerID,
                TDABeneficiario: data.tdaBeneficiario,
                TDAEmbargado: data.tdaEmbargado,
                TDATerBenTransferencia: data.tdaTerBenTransferencia
            }
        }).then(respuesta => {
            if (respuesta != null && respuesta.ok) {
                [1].map(() => (
                    <Alert
                        key={1}
                        severity="success"
                        onClose={() => propsTercerosContexto.CerrarAlertas()}
                    >
                        Información actualizada con éxito

                    </Alert>
                ))
            }
        })
    }

    const ConsultarTerceroEndoso = (callback: Function) => {
        SendRequest.get({
            API: "CUENTASPORPAGAR",
            URLServicio: "/EmbargoEndosoTerceros/Consultar_EmbargoEndosoTercero",
            Body: {
                TerId: propsTercerosContexto.TerceroSeleccionadoLista?.TerID
            }
        }).then(respuesta => {
            if (respuesta != null && respuesta.ok == true) {

                setValue("tdaBeneficiario", respuesta.datos.tdaBeneficiario || "")
                setValue("tdaEmbargado", respuesta.datos.tdaEmbargado || false)
                callback(respuesta.datos);

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
        ConsultarTerceroEndoso((data: ITerceroEndoso) => {
            ConsultarTerceros(data)
        })
    }, [])

    return (
        <>
            <Stack width={"100%"} height={"100%"} justifyContent="space-between" border={0.8} borderColor="#F1F0EE" borderRadius={0.5}>
                <Card>
                    <Stack p={2} gap={1}>
                        <Stack>
                            <Alert 
                                icon={<Image
                                        width={47.78}
                                        fit='cover'
                                        src="Imagenes/Terceros/AccountingDocuments.svg" 
                                        duration={0}
                                        />
                                    }
                                    severity="info"
                                    sx={{ alignItems: "center", zIndex:"1" }}
                                >
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
                            <Tooltip title="Solo aplica para cheque" placement='top' arrow >
                            <Icon>
                                <Info fontSize="small" color="disabled"></Info>
                            </Icon>
                            </Tooltip>
                        </Stack>

                        {
                            tdaEmbargado &&
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
                                    )}
                                />
                            </Stack>
                        }
                    </Stack>
                </Card>
                <Stack
                    direction={"row"}
                    flexWrap="wrap"
                    position={"sticky"}
                    width="100%"
                    bottom={0}
                    right={0}
                    sx={{ backgroundColor: "primary.contrastText" }}
                >
                    <Divider sx={{ width: "100%" }} orientation='horizontal' />
                    <Stack
                        width="100%"
                        direction={"row"}
                        paddingY={1.5}
                        paddingX={3}
                        gap={1.5}
                        justifyContent="flex-end">

                        <Button
                            variant="text"
                            size="small"
                        // onClick={()=> MetodoCancelar()}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            color='primary'
                            onClick={handleSubmit(EditarTerceroEndoso)}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </Stack>
            </Stack >

            <DevTool control={control}></DevTool>
        </>
    )
}

export default EmbargoEndoso