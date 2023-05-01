import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 20,
  p: 4,
};

export default function DeleteModal({open,handleClose, handleDeleteConfirm}) {

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
            Are you sure?
          </Typography>
          <Typography sx={{ mt: 2 }}>
           Once Deleted can not be recovered
          </Typography>
          <Stack  spacing={2} direction="row" className="justify-center mt3">
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="error" onClick={handleDeleteConfirm} style={{width: "50px"}}>Delete</Button>
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="primary" onClick={handleClose} style={{width: "50px"}}>Cancel</Button>
          </Stack>
        
        </Box>
      </Modal>
    </div>
  );
}
