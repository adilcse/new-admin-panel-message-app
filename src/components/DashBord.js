import { Card, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react'

const DashBord = (props) => {
  if (props.loading) {
    return (
      <Card sx={{ margin:'auto', p: 20}}>
        <CircularProgress fontSize={30} />
      </Card>
    )
  }
  return (
  
    <Stack sx= {{ display: 'flex', alignItems: 'center', margin: 'auto'}}>
        <Typography sx={{fontSize: 70 ,fontFamily: 'Rubik Pixels, cursive', 
        fontWeight: 600, color: '#14213d' }}>Welcome to Dashboard :)</Typography>
      </Stack>
  );
}

export default DashBord;
