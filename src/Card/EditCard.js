import { Card, TextField, Typography, Button, CircularProgress } from '@mui/material';
import React from 'react';

const style={
    width:'20rem',
    height:'25rem',
    margin:'auto',
 borderRadius: '20px',

}

const EditCard=({data, onClick, loading})=>{
    const [to, setTo] = React.useState("");

    const [toError, setToError] = React.useState(false);
    React.useEffect(()=> {
        if(data) {
          if(data.to) {
          setTo(data.to);
          }
        }
      }, [data]);
    const handleSend = () => {
        if(to.length < 10) {
          setToError(true)
          alert("Plese enter valid number");
          return;
        }
        setToError(false)
       onClick({to})
      }
      if (loading) {
        return (
          <Card sx={{ margin:'auto', p: 20}}>
            <CircularProgress fontSize={30} />
          </Card>
          )
      }
    return(
        <>
        <Card sx={style}>
            <Typography sx={{fontWeight:600,fontSize:'x-large',display:'flex',justifyContent:'center', mt: 3}}>Edit</Typography>
            
            <Typography sx={{fontWeight:500,fontSize:'medium',display:'flex',justifyContent:'center',marginTop:'4%'}} >number</Typography>
            <TextField error={toError} sx={{height: '5px', width: '10rem', display: 'flex', ml: '5px',margin:'auto'}} value={to} onChange={event => setTo(event.target.value)} variant="outlined"  /> 
              <Button variant="contained" sx={{ display: 'flex', ml: '5px',margin:'auto',marginTop:'3rem'}} onClick={handleSend}>Submit</Button>
        </Card>
        </>
    );
}
export default EditCard;