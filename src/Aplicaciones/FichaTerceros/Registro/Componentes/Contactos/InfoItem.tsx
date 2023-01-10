import { Typography } from '@mui/material'
import React from 'react'

export interface InfoItemPorps {
  title: string,
  text: string
}

const InfoItem = ({ title, text }:InfoItemPorps) => {
  return (
    <>
      <Typography variant="caption">{title}</Typography>
      <Typography variant='body2' color="text.secondary">{text}</Typography>
    </>
  )
}

export default InfoItem