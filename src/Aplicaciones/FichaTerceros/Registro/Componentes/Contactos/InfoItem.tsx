import { Stack, Tooltip, Typography } from '@mui/material'

export interface InfoItemPorps {
  title: string,
  text: string,
  showTooltip?: boolean
}

const InfoItem = ({ title, text, showTooltip }: InfoItemPorps) => {
  return (
    
    <Stack>
      <Typography color="text.primary" variant="body2">{title}</Typography>
      <Tooltip title={ showTooltip != undefined ? text : ""} placement="top" arrow>
        <Typography variant='body1' noWrap color="text.secondary">{(text == null || text =="") ? "-":text }</Typography>
      </Tooltip>
    </Stack>
    
  )
}

export default InfoItem