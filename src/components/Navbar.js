import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

function Navbar(props){
    return(
        <Box sx={{ flexGrow: 1 }}>
           
      <AppBar sx={{position:'sticky'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.menuClicked}
          >
            <MenuIcon/>
          </IconButton>
          <Link to="/logout" 
          style={{marginLeft: 'auto', textDecoration :'none', color: '#fff', fontWeight: 600}}>
          <Button color="inherit" 
          >
            <LogoutIcon sx={{textDecoration: 'none', color: '#fff'}}/>LogOut</Button>
            </Link>
        </Toolbar>
      </AppBar> 
      
    </Box>
    );
}




export default Navbar;