import { CircularProgress } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

export default function Loader() {
  return (
      <Stack 
        itemID='Loader' 
        zIndex={10000}  
        position={"fixed"} 
        height="100%"
        width="100%" 
        display={"none"} 
        justifyContent="center" 
        alignItems={"center"} 
        sx={{
          top:0,
        }}>
        <Stack sx={{opacity: 0.6}} position={"absolute"} height="100%" width="100%" bgcolor={"rgba(0,0,0,.3)"} >
          
        </Stack>
        <CircularProgress sx={{position: "absolute"}}/>
      </Stack>
  )
}
