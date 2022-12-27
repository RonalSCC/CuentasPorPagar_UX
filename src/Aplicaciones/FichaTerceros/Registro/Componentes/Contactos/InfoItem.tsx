import { Typography } from '@mui/material'
import React from 'react'

const InfoItem = ({ title, text }:any) => {
  return (
    <>
      <Typography variant="caption">{title}</Typography>
      <Typography variant='body2' color="text.secondary">{text}</Typography>
    </>
  )
}

export default InfoItem