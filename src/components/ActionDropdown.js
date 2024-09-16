import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Dropdown from './Dropdown';

export default function ActionDropdown(props) {

  return (
      <Dropdown
      actionSelect={props.actionSelect}
      handleActionChange={props.handleActionChange}
      items={[
          {value: 1, message: 'Forward this message'},
          {value: 2, message: `Always forward for Id: ${props.number}`},
          {value: 3, message: `Always forward from number: ${props.from}`},
        ]}
      />
  );
}
