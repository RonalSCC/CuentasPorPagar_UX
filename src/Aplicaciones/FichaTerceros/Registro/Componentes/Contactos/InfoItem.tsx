import { Tooltip, Typography } from '@mui/material'
import { useState } from 'react'

export interface InfoItemPorps {
  title: string,
  text: string,
  showTooltip?: boolean
}

const InfoItem = ({ title, text, showTooltip }: InfoItemPorps) => {
  return (
    <>
      <Typography variant="caption">{title}</Typography>
      <Tooltip title={ showTooltip != undefined ? text : ""} placement="top" arrow>
        <Typography variant='body2' noWrap color="text.secondary">{text}</Typography>
      </Tooltip>
    </>
  )
}

export default InfoItem