import React, {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MedicationIcon from '@mui/icons-material/Medication';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import {HomeContext} from '../Homepage';

const drawerWidth = 240;

function SideNav() {

  const {value} = React.useContext(HomeContext);
  const [, setActiveComp] = value;

  const toggleActive = (compName) => {
    setActiveComp(compName);
  }

  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button
              onClick={() => {
                toggleActive('Schedule');
              }}>
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="Schedule" />
            </ListItem>
            <ListItem button
              onClick={() => {
                toggleActive('Medications');
              }}>
              <ListItemIcon>
                <MedicationIcon />
              </ListItemIcon>
              <ListItemText primary="Medications" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default SideNav;