import React, {useState, useEffect} from 'react';
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


/*const meds = [
{'name': 'Advil', 'Description': 'painkillers', 'Frequency': '1 day a week', 'doses': '2', 'totalAmount': '44'},
{'name': 'Tylenol', 'Description': 'painkillers', 'Frequency': '2 days a week', 'doses': '4', 'totalAmount': '42'},
{'name': 'Codine', 'Description': 'painkillers', 'Frequency': '5 day a week', 'doses': '5', 'totalAmount': '1'},
{'name': 'Nyquil', 'Description': 'Sleepymeds', 'Frequency': '6 nights a week', 'doses': '6', 'totalAmount': '12'},
{'name': 'DayQuil', 'Description': 'Not so sleepy meds', 'Frequency': 'once in morning, once at night', 'doses': '67', 'totalAmount': '434'},
];*/

let meds = [];
/*
const [open, setOpen] = React.useState(true);

const handleClick = () => {
  setOpen(!open);
};
*/
function MedDetails(medication) {
  const arr = [];
  const keys = Object.keys(medication);
  keys.shift();
  //console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    const jsx =
      <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={keys[i]} secondary={medication[keys[i]]} />
      </ListItemButton>
    arr.push(jsx);
  }
  return arr;
};


const getMedicine = (gID) => {
  axios.get(`http://localhost:4000/v0/medicine/${gID}`)
    .then((response)=>{
      meds = response.data;
      //console.log(meds);
      //console.log(meds.length);
    })
    .catch(()=>{
      console.log('Cannot get medicine list');
    });
}

getMedicine('12345');//change once google id can be transfered


// https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende
function MedList() {
  const arr = [];
  for (let i = 0; i < meds.length; i++) {
    const [open, setOpen] = React.useState(false); // Maybe set to false
    const name = meds[i]['name'];
    const jsx =
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => setOpen(!open) }>
        <ListItemIcon>
          <MedicationIcon/>
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {MedDetails(meds[i])}
        </List>
      </Collapse>
    </List>
    arr.push(jsx);
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
      {arr}
    </List>
  );
}

export default MedList;


// https://mui.com/components/lists/
/*
function MedDetails(index) {
  const arr = [];
  const keys = ['Dosage', 'Today'];
  for (let i = 0; i < keys.length; i++) {
    const name = meds[index][keys[i]];
    const jsx =
      <ListItemButton
        onClick={() => {
        }}
        key={name}
        button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>;
    arr.push(jsx);
  }
  return arr;
};

function MedList() {
  const arr = [];
    for (let i = 0; i < meds.length; i++) {
      const name = meds[i]['name'];
      const jsx =
        <ListItemButton
          onClick={() => {
          }}
          key={name}
          button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={meds[i]['name']} />
        </ListItemButton>;
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {MedDetails(i)}
          </List>
      </Collapse>
      arr.push(jsx);
    }
    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        {arr}
      </List>
    );
}*/