import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function ViewModal({open, data, handleClose, handleOpen}) {

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
            Name: {data.name}
          </Typography>
          <Typography  sx={{ mt: 2 }}>
           Date:{data.date}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            To:{data.id}
          </Typography>
          <Typography sx={{ mt: 2 }}>
          From:{data.address}
          </Typography>
          <Typography sx={{ mt: 2, overflow: 'auto' }}>
             Message:<br></br>{data.body}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
