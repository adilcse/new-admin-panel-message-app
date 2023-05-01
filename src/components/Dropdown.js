import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';

export default function Dropdown(props) {
  const {actionSelect, handleActionChange, items} = props;
  return (
    <Box sx={{m: 2, minWidth: 40}}>
        <InputLabel id="demo-simple-select-autowidth-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          value={actionSelect}
          onChange={handleActionChange}
          autoWidth
          label="Select"
        >
          {items.map(item=> {
            return ( <MenuItem key={item.value} value={item.value}>{item.message}</MenuItem>)
          })}
        </Select>
   </Box>
  );
}
