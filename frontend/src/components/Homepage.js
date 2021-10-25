import React from 'react';
import {createContext} from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import TopAppBar from './homepage/TopAppBar';
import SideNav from './homepage/SideNav';
import Box from '@mui/material/Box';
import MedList from './MedList';
import Calendar from './Calendar';
import Toolbar from '@mui/material/Toolbar';

// https://reactjs.org/docs/context.html#reactcreatecontext
export const HomeContext = createContext();

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: 'white',
//   },
// }));

/**
 * @return {object} JSX
 */
function Homepage() {
  // const [workspaceList, setWorkspaceList] = React.useState([]);
  // const [workspace, setWorkspace] = React.useState('');
  // const [messageDrawerOpen, setMessageDrawerOpen] = React.useState(false);
  // const [channelObj, setChannelObj] = React.useState({
  //   id: '',
  //   name: '',
  // });

  const [activeComp, setActiveComp] = React.useState('Schedule');


  return (
    <div>
      <HomeContext.Provider
        value={{value: [activeComp, setActiveComp]}}
      >
        <Box sx={{ display: 'flex' }}>
          <TopAppBar />
          <SideNav />
          {activeComp === 'Schedule' ? (
            <Calendar />
          ) : activeComp === 'Medications' ? (
            <MedList />
          ) : null}
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
        </Box>
      </HomeContext.Provider>
    </div>
  );
}

export default Homepage;
