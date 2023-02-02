import { Avatar, Card, CardActions, Chip, Divider, FormControlLabel, FormGroup, Icon, IconButton, Switch, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { DeleteOutlined, EditOutlined, Person } from '@mui/icons-material';
import React, { useState } from 'react'
import InfoItem from './InfoItem';
import FormularioContacto from './FormularioContacto';
import DeleteContact from './DeleteContact';
import { IContactos } from './Contactos';


const CardContact = (contact: IContactos) => {

	const {
		ConNombre,
		ConCelular,
		ConTelefono,
		ConCargo,
		ConCiudad,
		ConTipo,
		ConEmail,
		ConPrincipal,
		ConNumeroDocumento,
	} = contact

	const [verModalEditContact, setverModalEditContact] = useState(false);
	const [verModalDeleteContact, setVerModalDeleteContact] = useState(false);
	const [checked, setChecked] = useState(true);

	const handleEditContact = () => {
		setverModalEditContact(!verModalEditContact);
	}

	const handleDeleteContact = () => {
		setVerModalDeleteContact(!verModalDeleteContact);
	}

	const handleChange = (event:any) => {
		setChecked(event.target.checked);
	};

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
									{ConNombre}
								</Typography>
								<Typography color="text.secondary" variant='body1'>
									{
										(ConCargo == null || ConCargo == "") ? "Desconocido" : ConCargo
									}
								</Typography>
							</Stack>
						</Stack>
						<Stack>
							{ConPrincipal && <Chip label="Contacto Principal" color="secondary" size="small" />}
						</Stack>
					</Stack>
					<Stack py={1.5} px={2} direction="row" divider={<Divider orientation="vertical" flexItem />} gap={0.5}>
						<Stack overflow="hidden" gap={0.5} width="50%">
							<InfoItem title="Número documento" text={ConNumeroDocumento} />
							<InfoItem title="Teléfono" text={ConTelefono} />
							<InfoItem title="Tipo" text={ConTipo} showTooltip={false}></InfoItem>
						</Stack>
						<Stack overflow="hidden" gap={0.5} width="50%">
							<InfoItem title="Celular" text={ConCelular} />
							<InfoItem title="Ciudad" text={ConCiudad}></InfoItem>
							<InfoItem title="Email" text={ConEmail} showTooltip={false}></InfoItem>
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
									!ConPrincipal &&
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
				<FormularioContacto estado={verModalEditContact} cambiarEstado={handleEditContact} title="Editar Contacto" />
			}

			{
				verModalDeleteContact == true &&
				<DeleteContact estado={verModalDeleteContact} cambiarEstado={handleDeleteContact}></DeleteContact>
			}
		</>
	)
}

export default CardContact