import React from 'react';
import PasswordIcon from '@mui/icons-material/Password';
import { Button, Stack, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom';


const Sidebar = (props) => {
  return (
    <Stack sx={{
      background: '#9ba3eb', height: '90vh', width: props.expandedMenu ? '150px' : '50px'
      , boxShadow: 'rgba(99, 99, 99, 0.3) 4px 0px 8px 0px', mr: 2
    }}>

      <Stack direction="column" sx={{ color: '#fff', mb: 3, alignItems: 'center', mt: 3 }}>
        <Link to="/" style={{ textDecoration: 'none' }} >
          <Button sx={{ color: '#fff', direction: 'column' }}>
            <Stack direction="column" sx={{ color: '#fff', mb: 3, alignItems: 'center' }}>
              <DashboardIcon sx={{ fontSize: 27, textDecoration: 'none' }} /><Typography sx={{ textAlign: 'center', fontWeight: 600 }} variant='body1'>{props.expandedMenu ? 'Dashboard' : ''}</Typography>
            </Stack>
          </Button>
        </Link>
      </Stack>

      <Stack direction="column" sx={{ color: '#fff', display: 'flex', alignItems: 'center', mb: 3 }}> 
      <Link to="/messages" style={{ textDecoration: 'none' }} >
         <Button style={{ color: '#fff', direction: 'column' }}>
            <Stack direction="column" sx={{ color: '#fff', mb: 3, alignItems: 'center' }}>
              <MessageIcon sx={{ fontSize: 27 }} />
              <Typography style={{ textAlign: 'center', fontWeight: 600 }} variant='body1'>{props.expandedMenu ? 'Messages' : ''}</Typography>
            </Stack>
          </Button>
          </Link>
      </Stack>


      <Stack direction="column" sx={{ color: '#fff', display: 'flex', alignItems: 'center', mb: 3 }}>
        <Link to="/editnumber" style={{ textDecoration: 'none' }} >
          <Button style={{ color: '#fff', direction: 'column' }}>
            <Stack direction="column" sx={{ color: '#fff', mb: 3, alignItems: 'center' }}>
              <SettingsPhoneIcon sx={{ fontSize: 27 }} />
              <Typography style={{ textAlign: 'center', fontWeight: 600 }} variant='body1'>{props.expandedMenu ? 'Edit number' : ''}</Typography>
            </Stack>
          </Button>
        </Link>
      </Stack>

      <Stack direction="column" sx={{ color: '#fff', mb: 3, alignItems: 'center' }}>
        <Link to="/changepassword" style={{ textDecoration: 'none' }}>
          <Button sx={{ color: '#fff', display: 'inline-flex', textDecoration: 'none' }}>
            <Stack direction="column" sx={{ color: '#fff', mb: 3, alignItems: 'center' }}>
              <PasswordIcon sx={{ fontSize: 27 }} />
              <Typography sx={{ textAlign: 'center', fontWeight: 600 }} variant='body1'>{props.expandedMenu ? 'Change pass' : ''}</Typography>
            </Stack>
          </Button>
        </Link>
      </Stack>

    </Stack>
  );
}
export default Sidebar;
