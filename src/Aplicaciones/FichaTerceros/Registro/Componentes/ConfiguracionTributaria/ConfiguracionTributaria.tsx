import { yupResolver } from '@hookform/resolvers/yup'
import { Percent } from '@mui/icons-material'
import { Alert, Button, Checkbox, Divider, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { number, object } from 'yup'
import { CrearPeticion } from '../../../../../Consumos/APIManager'
import { SendRequest } from '../../../../../Consumos/Request'
import { TercerosContexto } from '../../../Contextos/TercerosContexto'
import { PropsTerceroContexto } from '../../../Contextos/TercerosProveedor'
import ICambioConfiguracionTributaria from '../../../Interfaces/Registro/ConfiguracionTributaria/ICambioConfiguracionTributaria'
import IImpuestoConfigTributaria from '../../../Interfaces/Registro/ConfiguracionTributaria/IImpuestoConfigTributaria'
import CheckCard from './CheckCard'

const ConfiguracionTributaria = () => {

    const {propsTercerosContexto}:{propsTercerosContexto:PropsTerceroContexto} = useContext<any>(TercerosContexto);
    const {
        BloquearCamposAcceso,
        CambiarAlertas
    } = propsTercerosContexto;

    const [ConfiguracionTributaria, setConfiguracionTributaria] = useState<Array<IImpuestoConfigTributaria>>([]);
    const {TerceroSeleccionadoLista} = propsTercerosContexto;
    const [ListaCambiosConfiguracion, setListaCambiosConfiguracion] = useState<Array<ICambioConfiguracionTributaria>>([]);
    const [PorcentICA, setPorcentICA] = useState<Number>(0);
    let {
        handleSubmit,
        control,
        setValue
    } = useForm({
        mode:"onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(object({
            PORICA: number()
                    .nullable()
                    .max(100,"El porcentaje no puede ser mayor a 100")
                    .min(0.0001, "No puede haber un porcentaje de 0")
                    .notRequired()
                    .default(0)
                    .typeError("El campo debe ser numerico")
        }))
    });

    useEffect(() => {
        ConsultarConfiguracionTributaria();
    }, [])

    const ConsultarConfiguracionTributaria = async ()=> {
        SendRequest.get({
            API: "CUENTASPORPAGAR",
            URLServicio: "/ConfiguracionTributariaTercero/Consultar_ConfiguracionTributariaTercero",
            Body: {
                TerID: TerceroSeleccionadoLista?.TerID
            }
        }).then((respuesta)=> {
            if (respuesta != null && respuesta.ok == true) {
                setConfiguracionTributaria([...respuesta.datos]);
            }
        });
    }

    const CambiarValorConfigTributaria = (ConfiguracionTCambio: ICambioConfiguracionTributaria)=>{
        if (ConfiguracionTCambio) {
            ConfiguracionTributaria.map(ct => {
                if (ct.id == ConfiguracionTCambio.TCTId) {
                    let indexElementoCambio = ListaCambiosConfiguracion.map(lcf => lcf.TCTId).indexOf(ct.id);
                    if (ct.valor != ConfiguracionTCambio.Valor) {
                        if (indexElementoCambio != -1) {
                            ListaCambiosConfiguracion[indexElementoCambio].Valor = ConfiguracionTCambio.Valor;
                        }else{
                            setListaCambiosConfiguracion([...ListaCambiosConfiguracion, {
                                TCTId : ct.id,
                                Valor: ConfiguracionTCambio.Valor
                            }]);
                        }
                    }else{
                        ListaCambiosConfiguracion.splice(indexElementoCambio, 1);
                        setListaCambiosConfiguracion([...ListaCambiosConfiguracion]);
                    }
                }
            })
        }
    }

    const CambiarValorLista = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, ID:string)=> {
        console.log(event);
        CambiarValorConfigTributaria({
            TCTId: ID,
            Valor: event.target.value
        });
    }

    const GuardarConfiguracion = () => {
        if (ValidarPorcentajeICA()) {
            let PorICA = ConfiguracionTributaria.filter(f => f.id == "PORICA");
            if (PorICA && PorICA.length > 0) {
                ListaCambiosConfiguracion.push({
                    TCTId : PorICA[0].id,
                    Valor: PorICA[0].valor
                });
            };
            
            SendRequest.put({
                API: 'CUENTASPORPAGAR',
                URLServicio: "/ConfiguracionTributariaTercero/Actualizar_ConfiguracionTributariaTercero",
                Body:{
                    terID: TerceroSeleccionadoLista?.TerID,
                    listaConfiguraciones: ListaCambiosConfiguracion
                }
            }).then((respuesta)=> {
                if (respuesta != null && respuesta.ok == true) {
                    propsTercerosContexto.CambiarAlertas([<Alert severity="success">{respuesta.descripcion}</Alert>]);
                    ConsultarConfiguracionTributaria();
                }
            });
        }
        
    }

    const ValidarPorcentajeICA = () =>{
        let PorICA = ConfiguracionTributaria.filter(f => f.id == "PORICA");
        if (PorICA && PorICA.length > 0) {
            let valor = parseFloat(PorICA[0].valor);
            if(valor > 0 && valor < 100){
                return true;
            }else{
                CambiarAlertas([<Alert severity='warning'>El valor del porcentaje ICA no puede ser igual o menor a 0 ni igual o mayor a 100</Alert>])
                return false;
            }
        }else{
            return true;
        };
    }

    return (
        <Stack gap={1.5} width="100%" >
            <Card>
                <Stack direction={"row"} gap={1} p={2} flexWrap="wrap">
                    {
                        ConfiguracionTributaria.filter(
                            ct=> ct.lista == null && 
                                 ct.oculto == false && 
                                 ct.id != "PORICA" &&
                                 ct.otrasConfiguraciones == false
                        ).map(ct => {
                            return <CheckCard key={ct.id} ImpuestoConfig={ct} CambiarValor={CambiarValorConfigTributaria}/>
                        })
                    }
                </Stack>
            </Card>
            <Card>
                <Stack gap={1.5} p={2}>
                    <Typography variant="h6" color="primary">
                        Otras Configuraciones
                    </Typography>
                    <Stack gap={1.5} direction="row" flexWrap={"wrap"}>
                        {
                            ConfiguracionTributaria.filter(
                                ct=> ct.lista != null 
                            ).map(ct => 
                                 <TextField
                                    key={ct.id}
                                    size="small"
                                    variant="outlined"
                                    sx={{width: "23.5%"}}
                                    id={ct.id}
                                    label={ct.nombreMostrar}
                                    defaultValue={ct.valor}
                                    onChange={(event)=> 
                                        CambiarValorLista(event, ct.id)
                                    }
                                    select
                                    disabled={BloquearCamposAcceso(ct.idAcceso)}
                                >
                                    {
                                        ct.lista?.map(item => {
                                            return  <MenuItem key={ct.id} value={item.valor}>{item.nombre}</MenuItem>
                                        })
                                    }
                                </TextField>
                            )
                        }   
                        
                        {
                            ConfiguracionTributaria.map((ct,index) => {
                                if (ct.id == "PORICA") {
                                    console.log(ct);
                                    console.log(parseFloat(ct.valor));
                                    return <TextField
                                                label={ct.nombreMostrar}
                                                type={"number"}
                                                sx={{width: "24.2%"}}
                                                size="small" 
                                                variant="outlined"
                                                placeholder="Digite el porcentaje"
                                                value={ct.valor ? Number(ct.valor.replace(',', '.')) : ""}
                                                disabled={BloquearCamposAcceso(ct.id)}
                                                onChange={(event)=> {
                                                    ConfiguracionTributaria[index].valor = event.target.value;
                                                    setConfiguracionTributaria([...ConfiguracionTributaria]);
                                                    CambiarValorLista(event, ct.id);
                                                }}
                                                inputProps={{
                                                    step:"0.0001"
                                                }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="start">
                                                        <Percent fontSize="small"></Percent>
                                                    </InputAdornment>
                                                }}
                                            />   
                                }
                                
                            })
                        }
                        
                    </Stack>
                    <Stack gap={1.5}>
                        <Stack gap={1.5} direction="row">
                            {
                                ConfiguracionTributaria.filter(
                                    ct=> ct.lista == null && 
                                         ct.oculto == false && 
                                         ct.otrasConfiguraciones == true
                                ).map(ct => {
                                    return <CheckCard key={ct.id} ImpuestoConfig={ct} CambiarValor={CambiarValorConfigTributaria}/>
                                })
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Card>

            <Stack 
                direction={"row"}
                flexWrap="wrap"
                position={"sticky"} 
                width="100%" 
                bottom={0} 
                right={0} 
                sx={{backgroundColor: "primary.contrastText"}}
            >
                <Divider sx={{width:"100%"}} orientation='horizontal'/>
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
                        onClick={()=> GuardarConfiguracion()}
                        disabled={BloquearCamposAcceso("CTGuardar")}
                    >
                        Guardar
                    </Button>
                </Stack>
            </Stack>         
        </Stack>
    )
}

export default ConfiguracionTributaria