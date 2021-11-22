import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import MedicationIcon from '@mui/icons-material/Medication';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {WorkspaceContext} from '../App.js';
import MedForm from './MedForm.js';
// tre
function MedDetails(medication) {
  const arr = [];
  const keys = ['description', 'frequency', 'doses', 'totalAmount', 'time'];
  keys.shift();
  for (let i = 0; i < keys.length; i++) {
    const jsx =
      <ListItem key={i+2} sx={{ pl: 4 }}>
            <ListItemIcon key={i+3}>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={keys[i]} secondary={medication[keys[i]]} key={i+4} />
      </ListItem>
    arr.push(jsx);
  }
  return arr;
};

const getMedicine = (gID, setMedicineList) => {
  axios.get(`http://localhost:4000/v0/medicine/${gID}`)
    .then((response)=>{
      setMedicineList(response.data);
    })
    .catch(()=>{
      console.log('Cannot get medicine list');
    });
};

const deleteMedicine = (mID) => {
  axios.delete(`http://localhost:4000/v0/medicine/delete/${mID}`)
    .then((response)=>{
      console.log(response);
    })
    .catch(()=>{
      console.log("Cannot Delete medicine...\n");
    });
}

// https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende
function MedList() {
  const {customerIDS, medicineListS} = React.useContext(WorkspaceContext);
  const [googleID,] = customerIDS;
  const [medicineList, setMedicineList] = medicineListS;

  React.useEffect(() => {
    getMedicine(googleID, setMedicineList);
  }, [googleID, setMedicineList]);

  const MedicineElems = () => {
    const arr = [];
    const meds = medicineList;
    const {openEditS} = React.useContext(WorkspaceContext);
    const [openEdit, setOpenEdit] = openEditS;
    for (let i = 0; i < meds.length; i++) {
      const [open, setOpen] = React.useState(false); // Maybe set to false
      const [opendelete, setOpendelete] = React.useState(false);
      const handleOpen = () => {
        setOpen(!open);
      };
      const handleDelete = () => {
        let medID = meds[i]['_id'];
        deleteMedicine(medID);
        //need to refresh the page to see it deleted
        console.log('deleted')
        setOpendelete(false);
      };
      const handleCancel = () => {
        setOpendelete(false);
      };
      const handleCancelEdit = () => {
        setOpenEdit(false);
      }
      const name = meds[i]['name'];
      const details = MedDetails(meds[i]);
      const jsx =
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        key={i}
      >
        <ListItem key={i+5}>
          <ListItemIcon>
            <MedicationIcon/>
          </ListItemIcon>
          <ListItemText primary={name} />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton aria-label="delete" onClick={() => setOpendelete(true)}>
              <DeleteIcon />
            </IconButton>
            <IconButton color="primary" aria-label="edit" onClick={() => setOpenEdit(true)}>
              <EditIcon/>
            </IconButton>
            <IconButton color="primary" onClick={handleOpen}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Stack>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List key={i+1} component="div" disablePadding>
            {details}
          </List>
        </Collapse>
        <Dialog
        open={opendelete}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete {name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting {name} will not only remove it from the list here, 
              but also premanently delete it from our database. You cannot
              undo it
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>  
          <Button onClick={handleDelete} autoFocus>
              Delete
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog
        open={openEdit}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       >
         <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>  
          </DialogActions>
         <MedForm/>
       </Dialog>

      </List>
      arr.push(jsx);
    }
    return arr;
  }

  return (
    <List
      sx={{ width: '100%', maxLength: 360, maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <MedicineElems/>
    </List>
  );
}

export default MedList;
