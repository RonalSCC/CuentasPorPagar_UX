import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, Divider, FormControlLabel, FormGroup, Icon, IconButton, Switch, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { DeleteOutlined, EditOutlined, Person } from '@mui/icons-material';
import React, { useState } from 'react'
import InfoItem from './InfoItem';
import FormularioContacto from './FormularioContacto';
import DeleteContact from './DeleteContact';

const CardContact = () => {

	const [verModalEditContact, setverModalEditContact] = useState(false);
	const [verModalDeleteContact, setVerModalDeleteContact] = useState(false);

	const handleEditContact = () => {
		setverModalEditContact(!verModalEditContact);
	}

	const handleDeleteContact = () => {
		setVerModalDeleteContact(!verModalDeleteContact);
	}

	return (
		<>
			<Stack width={422}>
				<Card variant="outlined" sx={{ borderColor: "secondary.main" }}>
					<Stack direction="row" alignItems="center" px={2} py={1.5} justifyContent="space-between">
						<Stack direction="row" alignItems="center">
							<Stack paddingRight={2}>
								<Avatar sx={{ width: 32, height: 32 }} >
									<Person fontSize="small" sx={{ color: '#FFFFFF' }} />
								</Avatar >
							</Stack>
							<Stack>
								<Typography variant='h6'>
									Cristian Pérez
								</Typography>
								<Typography color="text.secondary" variant='body1'>
									Product Designer
								</Typography>
							</Stack>
						</Stack>
						<Stack>
							<Chip label={"Contacto Principal"} color="secondary" size="small" />
						</Stack>
					</Stack>
						<Stack py={1.5} px={2} direction="row" divider={<Divider orientation="vertical" flexItem />} gap={1.5}>
							<Stack overflow="hidden" gap={1.5} width="50%">
								<InfoItem title="Nombre documento" text="1012422532" />
								<InfoItem title="Telefono" text="3213353173" />
								<InfoItem title="Tipo" text="Financiero y Administrativo" showTooltip={false}></InfoItem>
							</Stack>
							<Stack overflow="hidden" gap={1.5} width="50%">
								<InfoItem title="Celular" text="3211234567" />
								<InfoItem title="Ciudad" text="Bogotá D.C"></InfoItem>
								<InfoItem title="Email" text="viviana.contreras@sinco.com.co" showTooltip={false}></InfoItem>
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
								<Tooltip title="Eliminar" placement="top" arrow >
									<IconButton size="small" color="error" onClick={handleDeleteContact}>
										<DeleteOutlined fontSize="small"/>
									</IconButton>
								</Tooltip>
							</Stack>
							<Stack direction="row">
								<FormGroup>
									<FormControlLabel control={<Switch size="small" defaultChecked />} label="Activo" sx={{ marginRight: "0px" }} />
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