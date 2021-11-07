import React, {useState} from 'react';
import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';

import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

// import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MedicationIcon from '@mui/icons-material/Medication';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import SettingsIcon from '@mui/icons-material/Settings';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MedList from './MedList';

const drawerWidth = 240;

function Home() {

  return (
    <Box sx={{ display: 'flex', position: 'relative'}}>
    <CssBaseline />
    <MedList/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
    </Box>
  </Box>
  );
}

export default Home;

