import { Stack, Tooltip, Typography } from '@mui/material'

export interface InfoItemPorps {
  title: string,
  text: string,
  showTooltip?: boolean,
  color: string
}

const InfoItem = (InfoItemProps: InfoItemPorps) => {
  const { 
    title, 
    text, 
    showTooltip, 
    color 
  } = InfoItemProps;

  return (
    
    <Stack>
      <Typography color={color} variant="body2">{title}</Typography>
      <Tooltip title={ showTooltip  ? text : ""} placement="top" arrow>
        <Typography variant='body1' noWrap color={color}>{(text == null || text =="") ? "-":text }</Typography>
      </Tooltip>
    </Stack>
    
  )
}

export default InfoItem