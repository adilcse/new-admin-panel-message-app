import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import ActionDropdown from './ActionDropdown';
import 'tachyons';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 20,
  p: 4,
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
};

export default function ActionModal({open, data, handleClose, handleSendClicked}) {
  const [actionSelect, setActionSelect] = React.useState(1);
  const [to, setTo] = React.useState("");
  const [toError, setToError] = React.useState(false);

  const handleActionChange = (event) => {
    setActionSelect(event.target.value);
  };
  const handleSend = () => {
    if(to.length < 10) {
      setToError(true)
      alert("Plese enter valid number");
      return;
    }
    setToError(false)
   handleSendClicked({actionSelect, to})
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Message Action!
          </Typography>
         
          <ActionDropdown  className="mb5" from= {data.from} number={data.number} handleActionChange={handleActionChange} actionSelect={actionSelect}/>
          <TextField error={toError} type={'number'} value={to} sx={{'& input': {height:'50px'}}} onChange={event => setTo(event.target.value)} id="outlined-to" label="To" variant="outlined" size='medium' />
          <Stack  spacing={2} direction="row" className="justify-center mt3">
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="success" onClick={handleSend} style={{width: "50px"}}>Send</Button>
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="primary" onClick={handleClose} style={{width: "50px"}}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
