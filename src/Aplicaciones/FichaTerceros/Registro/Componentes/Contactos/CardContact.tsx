import { Avatar, Card, CardActions, Chip, Divider, FormControlLabel, FormGroup, Icon, IconButton, Switch, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { DeleteOutlined, EditOutlined, Person } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import InfoItem from './InfoItem';
import FormularioContacto from './FormularioContacto';
import DeleteContact from './DeleteContact';
import { IContacto } from './Contactos';
import { CrearPeticion } from '../../../../../Consumos/APIManager';


export const CardContact = (contact: IContacto) => {

	const {
		conNombre,
		conCelular,
		conTelefono,
		conCargo,
		conCiudad,
		conTipo,
		conEmail,
		conPrincipal,
		conNumDocumento,
	} = contact

	const [Configs, setConfigs] = useState<any>();
	
	const [verModalEditContact, setverModalEditContact] = useState(false);
	const [verModalDeleteContact, setVerModalDeleteContact] = useState(false);
	const [checked, setChecked] = useState(true);

	const OCULTA_CHECK_CPRIN = Configs && Configs["OCULTA_CHECK_CPRIN"] || {};

	const handleEditContact = () => {
		setverModalEditContact(!verModalEditContact);
	}

	const handleDeleteContact = () => {
		setVerModalDeleteContact(!verModalDeleteContact);
	}

	const handleChange = (event: any) => {
		setChecked(event.target.checked);
	};

	useEffect(() => {
		ConsultarConfigs();
	}, [])

	const ConsultarConfigs =  async() => {
		
		await CrearPeticion({
			API: 'CONFIGURACION' ,
			URLServicio: '/ConsultasGenerales/ConsultarConfigs',
			Type:"POST",
			Body:{
				usuarioID: 1,
				listaConfigs:[
					{
						configID: "OCULTA_CHECK_CPRIN"
					}
				]
			}
		}).then(response => {
			if(response != null)
				setConfigs(response.datos)
		})
		
	}
	

	return (
		<>
			<Stack width={444}>
				<Card>
					<Stack direction="row" alignItems="center" px={2} py={1.5} justifyContent="space-between">
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
										(!!conCargo || conCargo == "") ? "Desconocido" : conCargo
									}
								</Typography>
							</Stack>
						</Stack>
						<Stack>
							{conPrincipal && (OCULTA_CHECK_CPRIN.configValor == 0) && <Chip label="Contacto Principal" color="secondary" size="small" />}
						</Stack>
					</Stack>
					<Stack py={1.5} px={2} direction="row" divider={<Divider orientation="vertical" flexItem />} gap={0.5}>
						<Stack overflow="hidden" gap={0.5} width="50%">
							<InfoItem title="Número documento" text={conNumDocumento} />
							<InfoItem title="Teléfono" text={conTelefono} />
							<InfoItem title="Tipo" text={conTipo} showTooltip={false}></InfoItem>
						</Stack>
						<Stack overflow="hidden" gap={0.5} width="50%">
							<InfoItem title="Celular" text={conCelular} />
							<InfoItem title="Ciudad" text={conCiudad}></InfoItem>
							<InfoItem title="Email" text={conEmail} showTooltip={false}></InfoItem>
						</Stack>
					</Stack>
					<CardActions sx={{ padding: "0px" }}>
						<Stack px={2} py={1} direction="row" justifyContent="space-between" alignItems="center" width="100%">
							<Stack direction="row" gap={1}>
								<Tooltip title="Editar" placement="top" arrow >
									<IconButton size="small" color="primary" onClick={handleEditContact}>
										<EditOutlined fontSize="small" />
									</IconButton>
								</Tooltip>
								{
									(!conPrincipal || (OCULTA_CHECK_CPRIN.configValor == 1)) &&
									<Tooltip title="Eliminar" placement="top" arrow >
										<IconButton size="small" color="error" onClick={handleDeleteContact}>
											<DeleteOutlined fontSize="small" />
										</IconButton>
									</Tooltip>
								}
							</Stack>
							<Stack direction="row">
								<FormGroup>
									<FormControlLabel
										control={<Switch size="small" />}
										label="Activo"
										checked={checked}
										onChange={handleChange}
										sx={{ marginRight: "0px" }} />
								</FormGroup>
							</Stack>
						</Stack>
					</CardActions>
				</Card>
			</Stack>

			{
				verModalEditContact == true &&
				<FormularioContacto estado={verModalEditContact} cambiarEstado={handleEditContact} contact={contact}/>
			}

			{
				verModalDeleteContact == true &&
				<DeleteContact estado={verModalDeleteContact} cambiarEstado={handleDeleteContact} id={contact.conId}></DeleteContact>
			}
		</>
	)
}
