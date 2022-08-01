import React, { useState } from "react";
import { Stack, Box, CircularProgress } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";



const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const categoryButtons = [
    {
        id: 'yes',
        label: 'Yes',
    },
    {
        id: 'no',
        label: 'No'
    }]

const LogOut=(props)=>{
  let navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState(categoryButtons[0].id);
    const onButtonClicked = (id) => {
      if (id == 'no') {
      } else {
        props.logout()
      }
      navigate('/')
      setSelectedButton(id)
    }
    if (props.loading) {
      <CircularProgress fontSize={30} />
    }
    return(
        <>
        <Grid sx={{display: 'flex', justifyContent: 'center', marginBottom: '15%',margin:'auto'}}>
            <Card sx={{ maxWidth:300, maxHeight:500 , borderRadius: '20px',
                        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                        display: 'flex', justifyContent: 'center' }}>
      <CardContent>
        <Typography sx={{ fontSize: 27 ,display: 'flex', justifyContent: 'center', fontWeight: 540}} color="#000" gutterBottom>
          Logout?
        </Typography>
        <Typography sx={{ mb: 2 , fontSize: 'small', fontFamily: 'Poppins, sans-serif',display: 'flex', justifyContent: 'center'}} color="#7A868F " >
          Are you sure you want to logout?
        </Typography>

           <Stack direction="column" spacing={2}>
        {categoryButtons.map(data => {
            return  <Button key={data.id} onClick={()=> onButtonClicked(data.id)} variant={selectedButton === data.id ? "contained" : "outlined"} size="large" sx={{textTransform: 'none', borderRadius:3
              ,height:45,width:290, fontWeight: 550}}>{data.label} </Button>
        })}
        </Stack>            
        
      </CardContent>
     
    </Card>
    </Grid>
  
        </>
    )
    

}

export default LogOut;