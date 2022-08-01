// const Users = () => {
//     return (<div className="title">
//         Dashboard
//     </div>);
// }

import { Stack, Typography } from '@mui/material';
import React from 'react'

const DashBord = () => {
  return (
  
    <Stack sx= {{ display: 'flex', alignItems: 'center', margin: 'auto'}}>
        <Typography sx={{fontSize: 70 ,fontFamily: 'Caveat, cursive', 
        fontWeight: 600, color: '#14213d' }}>Welcome to Dashboard :)</Typography>

      </Stack>
    
  );
}

export default DashBord;
