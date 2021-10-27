import React, {useState, useEffect} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const meds = [
{'name': 'Advil', 'Dosage': 'Dosage: 3 days a week', 'Today': 'Need to take today at 2pm'},
{'name': 'Tylenol', 'Dosage': 'Dosage: 1 day a week', 'Today': 'Need to take mondays at 1am'},
{'name': 'Codine', 'Dosage': 'Dosage: 1 day a week', 'Today': 'Need to take saturday at 2pm'},
{'name': 'Nyquil', 'Dosage': 'Dosage: 1 day a week', 'Today': 'Need to take saturday at 2pm'},
{'name': 'Dayquil', 'Dosage': 'Dosage: 1 day a week', 'Today': 'Need to take saturday at 2pm'},
];
/*
const [open, setOpen] = React.useState(true);

const handleClick = () => {
  setOpen(!open);
};
*/
function MedDetails(index) {
  const arr = [];
  const keys = ['Dosage', 'Today'];
  for (let i = 0; i < keys.length; i++) {
    const name = meds[index][keys[i]];
    const jsx =
      <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={name} />
      </ListItemButton>
    arr.push(jsx);
  }
  return arr;
};



// https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende
function MedList() {
  //const meds = ["Advil", "Tylenol", "Codine", "Nyquil", "DayQuil"];
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
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {MedDetails(i)}
        </List>
      </Collapse>
    </List>
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