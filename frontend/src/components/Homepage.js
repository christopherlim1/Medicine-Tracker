import React from 'react';
import {createContext} from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import TopAppBar from './homepage/TopAppBar';
import SideNav from './homepage/SideNav';
import Box from '@mui/material/Box';
import MedList from './MedList';
import Toolbar from '@mui/material/Toolbar';
import Schedule from './Schedule';
import {WorkspaceContext} from '../App';
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

  const {activeCompS} = React.useContext(WorkspaceContext);
  const [activeComp, setActiveComp] = activeCompS;


  return (
    <div>
      <HomeContext.Provider
        value={{value: [activeComp, setActiveComp]}}
      >
        <Box sx={{ display: 'flex', position: 'relative'}}>
          <TopAppBar />
          <SideNav />
          {activeComp === 'Schedule' ? (
            <Schedule/>
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
