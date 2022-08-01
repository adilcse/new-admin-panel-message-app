
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import 'tachyons'
import { height } from "@mui/system";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
const styles={
    width: '350px',
    padding: '10px',
    borderRadius: '15px',
    margin: 'auto',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
    height: '300px',
    alignItems: 'center',
    display: 'flex',
    marginTop:20,
};

const LoginCard=({login})=>{
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const tryLogin = () => {
        login(values)
      }

    return(
      <>
          <Box
      component="form"
      style={styles}
      noValidate
      autoComplete="off"
      className=' justify-center  mt6'
    > 
    <Stack  spacing={2} direction="column" className="justify-center  items-center pa3 ">
    <Typography sx={{fontWeight: 600, fontSize: 'x-large', m: 2}}>
          Login
        </Typography>
    <TextField
        value={values.email}
        onChange={handleChange('email')}
        sx={{'& input': {height: '50px'}}}
          id="email-input"
          label="email"
          type="email"
          size="normal"
          autoComplete="current-email"
        />
   <FormControl sx={{ m: 1, width: '25ch', '& input': {height: '50px'} }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

<Button variant="contained" onClick={tryLogin}>
        Login
      </Button>
        </Stack>

        </Box>
        </>

       
    );
}

export default LoginCard;