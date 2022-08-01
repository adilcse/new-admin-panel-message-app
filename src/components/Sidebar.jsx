import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { motion } from 'framer-motion';
import {FaHome} from 'react-icons/fa';
import { Button, Stack, Typography } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';

const routes = [
  {
    path: "/",
    name: " Home",
    icon: <FaHome/>,
  }
]



 const Sidebar = (props) => {
  return (
    <Stack sx={{background: '#9ba3eb', height: '92vh', width: props.expandedMenu ? '150px' : '50px'
    ,boxShadow: 'rgba(99, 99, 99, 0.3) 4px 0px 8px 0px', mr: 2}}>
        <Stack direction="column" sx={{color: '#fff', mb: 3, alignItems: 'center', mt: 3}}>
        <Link to="/" style={{textDecoration :'none'}} >
          <Button sx={{color: '#fff', direction: 'column'}}>
          <Stack direction="column" sx={{color: '#fff', mb: 3, alignItems: 'center'}}>
           <SpeedIcon sx={{ fontSize: 27, textDecoration :'none'}}/><Typography sx={{textAlign: 'center', fontWeight: 600}} variant='body1'>{ props.expandedMenu ? 'Dashboard': ''}</Typography>
         </Stack>
         </Button>
         </Link>
        </Stack>
        <Stack direction="column" sx={{color: '#fff', display: 'flex', alignItems: 'center', mb: 3}}>
          <Link to="/editnumber" style={{textDecoration :'none'}} >
           <Button style={{color: '#fff', direction: 'column'}}>
           <Stack direction="column" sx={{color: '#fff', mb: 3, alignItems: 'center'}}>
              <FolderIcon sx={{ fontSize: 27}}/>
              <Typography style={{textAlign: 'center', fontWeight: 600}} variant='body1'>{ props.expandedMenu ? 'Edit number': ''}</Typography>
            </Stack>
            </Button>
            </Link>
        </Stack>
        <Stack direction="column" sx={{color: '#fff', mb: 3, alignItems: 'center'}}>
          <Link to="/changepassword" style={{textDecoration :'none'}}>
          <Button sx={{color: '#fff', display: 'inline-flex', textDecoration: 'none'}}>
            <Stack direction="column" sx={{color: '#fff', mb: 3, alignItems: 'center'}}>
           <PersonRoundedIcon sx={{ fontSize: 27}}/>
           <Typography sx={{textAlign: 'center', fontWeight: 600}} variant='body1'>{ props.expandedMenu ? 'Profile': ''}</Typography>
           </Stack>
         </Button>
         </Link>
        </Stack>
      
    </Stack>
  );

  
    return(
       <div className='main-container'>
        <motion.div >
        <main>
          {props.children}
        </main>
        </motion.div>
    </div>
    );
}
export default Sidebar;
