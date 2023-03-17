import { Alert, AlertTitle, Avatar, Card, CardActions, Chip, Divider, FormControlLabel, FormGroup, IconButton, Switch, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { DeleteOutlined, EditOutlined, Person } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react'
import InfoItem from './InfoItem';
import FormularioContacto from './FormularioContacto';
import DeleteContact from './DeleteContact';
import { IContacto } from './Contactos';
import { CrearPeticion } from '../../../../../Consumos/APIManager';
import { Controller, useForm } from 'react-hook-form';
import { TercerosContexto } from '../../../Contextos/TercerosContexto';
import { useNavigate } from 'react-router-dom';
import { FieldValues } from 'react-hook-form/dist/types';

export const CardContact = (contact: IContacto) => {
	const {
		conId,
		conNombre,
		conCelular,
		conTelefono,
		conCargo,
		conCiudad,
		conTipo,
		conTipoId,
		conEmail,
		conPrincipal,
		conNumDocumento,
		conEstado,
	} = contact

	const [Configs, setConfigs] = useState<any>();
	const { propsTercerosContexto }: { propsTercerosContexto: any } = useContext<any>(TercerosContexto);
	const [verModalEditContact, setverModalEditContact] = useState(false);
	const [verModalDeleteContact, setVerModalDeleteContact] = useState(false);
	const navigate = useNavigate()

	const OCULTA_CHECK_CPRIN = Configs && Configs["OCULTA_CHECK_CPRIN"] || {};

	const handleEditContact = () => {
		setverModalEditContact(!verModalEditContact);
	}

	const handleDeleteContact = () => {
		setVerModalDeleteContact(!verModalDeleteContact);
	}

	const CambiarEstadoContacto = async (tcEstado: boolean) => {

		await CrearPeticion({
			API: 'CUENTASPORPAGAR',
			URLServicio: '/AdministracionTerceros/ActualizarContactoTercero',
			Type: 'POST',
			Body: {
				tcId: conId,
				tcTercero: propsTercerosContexto.TerceroSeleccionadoLista?.TerID,
				tcNombre: conNombre,
				tcTipoContacto: conTipoId,
				tcEstado
			}

		}).then((respuesta) => {
			if (respuesta != null) {
				if (respuesta.ok) {
					propsTercerosContexto.CambiarAlertas(
						[1].map(alert => {
							return <>
								<Alert
									key={1}
									severity="success"
									onClose={() => propsTercerosContexto.CerrarAlertas()}
								>
									<AlertTitle>!Bien hecho!</AlertTitle>
									El contacto se ha actualizado con éxito
								</Alert>
							</>
						})
					)
					navigate("/FichaTerceros/MarcoTerceros/Contactos", {
						state: {
							Reload: true
						}
					});

				}
				else if (respuesta.errores && respuesta.errores.length > 0) {
					propsTercerosContexto.CambiarAlertas(
						respuesta.errores.map(x => {
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
				}
			}
		})
	}

	useEffect(() => {
		ConsultarConfigs();
	}, [])

	const ConsultarConfigs = async () => {

		await CrearPeticion({
			API: 'CONFIGURACION',
			URLServicio: '/ConsultasGenerales/ConsultarConfigs',
			Type: "POST",
			Body: {
				usuarioID: 1,
				listaConfigs: [
					{
						configID: "OCULTA_CHECK_CPRIN"
					}
				]
			}
		}).then(response => {
			if (response != null)
				setConfigs(response.datos)
		})

	}

	const propsInfoItem = {
		color: (conPrincipal || conEstado) ? "text.primary" : "text.disabled"
	}

	return (
		<>
			<Stack width={444}>
				<Card>
					<Stack direction="row" alignItems="start" px={2} py={1.5} justifyContent="space-between">
						<Stack direction="row" alignItems="center">
							<Stack paddingRight={2}>
								<Avatar sx={{ width: 32, height: 32 }} >
									<Person fontSize="small" sx={{ color: '#FFFFFF' }} />
								</Avatar >
							</Stack>
							<Stack>
								<Typography variant='h6'>
									{conNombre}
								</Typography>
								<Typography color="text.secondary" variant='body1'>
									{
										(!conCargo) ? "Desconocido" : conCargo
									}
								</Typography>
							</Stack>
						</Stack>
						<Stack pt={0.5}>
							{conPrincipal && (OCULTA_CHECK_CPRIN.configValor == 0) &&
								<Chip
									label="Contacto Principal"
									color="secondary"
									size="small"
									sx={{ borderRadius: "4px" }}
								/>
							}
						</Stack>
					</Stack>
					<Stack py={1.5} px={2} direction="row" divider={<Divider orientation="vertical" flexItem />} gap={0.5}>
						<Stack overflow="hidden" gap={0.5} width="50%">
							<InfoItem
								title="Número documento"
								text={conNumDocumento}
								{...propsInfoItem}
							/>
							<InfoItem
								title="Teléfono"
								text={conTelefono}
								{...propsInfoItem}
							/>
							<InfoItem
								title="Tipo"
								text={conTipo}
								{...propsInfoItem}
							/>
						</Stack>
						<Stack overflow="hidden" gap={0.5} width="50%">
							<InfoItem
								title="Celular"
								text={conCelular}
								{...propsInfoItem}
							/>
							<InfoItem
								title="Ciudad"
								text={conCiudad}
								{...propsInfoItem}
							/>
							<InfoItem
								title="Email"
								text={conEmail}
								showTooltip={true}
								{...propsInfoItem}
							/>
						</Stack>
					</Stack>
					<CardActions sx={{ padding: "0px" }}>
						<Stack px={2} py={1} direction="row" justifyContent="space-between" alignItems="center" width="100%">
							<Stack direction="row" gap={1}>
								<Tooltip title="Editar" placement="top" arrow >
									<IconButton
										size="small"
										color="primary"
										disabled={!(conPrincipal || conEstado)}
										onClick={handleEditContact}
									>
										<EditOutlined fontSize="small" />
									</IconButton>
								</Tooltip>
								{
									(!conPrincipal || (OCULTA_CHECK_CPRIN.configValor == 1)) &&
									<Tooltip title="Eliminar" placement="top" arrow >
										<IconButton 
										size="small" 
										color="error"
										disabled={!(conPrincipal || conEstado)} 
										onClick={handleDeleteContact}>
											<DeleteOutlined fontSize="small" />
										</IconButton>
									</Tooltip>
								}
							</Stack>
							<Stack direction="row">
								{
									(!conPrincipal || (OCULTA_CHECK_CPRIN.configValor == 1)) &&
									<FormGroup>
										<FormControlLabel
											defaultChecked={conEstado}
											control=
											{
												<Switch
													size="small"
													defaultChecked={conEstado}
													onChange={(e, checked) => CambiarEstadoContacto(checked)}
												/>
											}
											label="Activo"
											sx={{ marginRight: "0px" }}
										/>
									</FormGroup>
								}
							</Stack>
						</Stack>
					</CardActions>
				</Card>
			</Stack>

			{
				verModalEditContact == true &&
				<FormularioContacto estado={verModalEditContact} cambiarEstado={handleEditContact} contact={contact} />
			}

			{
				verModalDeleteContact == true &&
				<DeleteContact estado={verModalDeleteContact} cambiarEstado={handleDeleteContact} id={contact.conId}></DeleteContact>
			}
		</>
	)
}
