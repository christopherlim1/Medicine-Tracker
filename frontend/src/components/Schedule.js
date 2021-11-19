import * as React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Calendar from './Calendar';
import DailyList from './DailyList';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from "axios";

import { WorkspaceContext } from "../App.js";

const getMedicine = (gID, handleDialogOpen) => {
  axios.get(`http://localhost:4000/v0/medicine/${gID}`)
    .then((response)=>{
    })
    .catch(()=>{
      handleDialogOpen();
      console.log('Cannot get medicine list');
    });
};

function Schedule() {
  const {customerIDS, activeCompS} = React.useContext(WorkspaceContext);
  const [googleID,] = customerIDS;
  const [dOpen, setDOpen] = React.useState(false);
  const [, setActiveComp] = activeCompS;

  const handleDialogOpen = () => {
    setDOpen(true);
  };

  React.useEffect(() => {
    getMedicine(googleID, handleDialogOpen);
  }, [googleID, handleDialogOpen]);

  const handleDClose = () => {
    setDOpen(false);
    setActiveComp('Add New');
  }

  const [viewtype, setviewtype] = React.useState('List');
  //width: '100vw', height: '100vh'
  return(
    <Box className='schedule'sx={{position: 'relative', top: '60px', width: '100vw'}}>
        <Stack spacing={0} direction="row" sx={{display: 'flex', justifyContent:'center',
        alignItems:'center',margin: 'auto', width: '70vw'}}>
            <Button onClick={() => {
            setviewtype('List');
            }}>List</Button>
            <Button onClick={() => {
            setviewtype('Calendar');
            }}>Calendar</Button>
        </Stack>
        <hr></hr>
      {viewtype === 'Calendar' ? (
      <Calendar/>
        ) : viewtype === 'List' ? (
          <DailyList/>
        ) : null}
      <Dialog open={dOpen}>
        <DialogTitle>New Customer?</DialogTitle>
        <Button onClick={handleDClose}>Add New Medication</Button>
      </Dialog>
    </Box>
  );
}

export default Schedule;