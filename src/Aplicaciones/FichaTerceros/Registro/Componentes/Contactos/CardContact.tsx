import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, Divider, FormControlLabel, FormGroup, Icon, IconButton, Switch, Typography } from '@mui/material'
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

	const propsCard: Record<string, any> = {

	}

	return (
		<>
			<Stack width={420}>
				<Card variant="outlined" sx={{ borderColor: "secondary.main" }}>
					<Stack direction="row" alignItems="center" px={1.5} py={2} justifyContent="space-between">
						<Stack direction="row" alignItems="center">
							<Stack paddingRight={2}>
								<Avatar >
									<Person sx={{ color: '#FFFFFF' }} />
								</Avatar >
							</Stack>
							<Typography variant='body1'>
								Cristian Pérez
							</Typography>
						</Stack>
						<Stack>
							<Chip label={"Contacto Principal"} color="secondary" size="small" />
						</Stack>
					</Stack>
					<Stack py={1.5} px={2}>
						<Stack direction="row" divider={<Divider orientation="vertical" flexItem />} gap={3}>
							<Stack>
								<InfoItem title="Nombre documento" text="-" />
								<InfoItem title="Telefono" text="-" />
							</Stack>
							<Stack>
								<InfoItem title="Celular" text="-" />
							</Stack>
						</Stack>
						<Stack gap={0.5}>
							<InfoItem title="Ciudad" text="Bogotá D.C"></InfoItem>
							<InfoItem title="Tipo" text="Financiero y Administrativo"></InfoItem>
							<InfoItem title="Email" text="cristian.perez@sinco.com.co"></InfoItem>
						</Stack>
					</Stack>
					<CardActions sx={{ padding: "0px" }}>
						<Stack px={2} py={1} direction="row" justifyContent="space-between" width="100%">
							<Stack direction="row">
								<IconButton color="primary" onClick={handleEditContact}>
									<EditOutlined />
								</IconButton>
								<IconButton color="error" onClick={handleDeleteContact}>
									<DeleteOutlined />
								</IconButton>
							</Stack>
							<Stack direction="row">
								<FormGroup>
									<FormControlLabel control={<Switch defaultChecked />} label="Activo" sx={{ marginRight: "0px" }} />
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
				<DeleteContact estado = {verModalDeleteContact} cambiarEstado = {handleDeleteContact}></DeleteContact>
			}
		</>
	)
}

export default CardContact