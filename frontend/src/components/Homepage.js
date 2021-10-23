import React from 'react';
import {createContext} from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import TopAppBar from './homepage/TopAppBar';
import SideNav from './homepage/SideNav';
import Box from '@mui/material/Box';
import MedList from './MedList';
import Toolbar from '@mui/material/Toolbar';

// https://reactjs.org/docs/context.html#reactcreatecontext
export const WorkspaceContext = createContext();

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: 'white',
//   },
// }));

/**
 * @return {object} JSX
 */
function Homepage() {
  // const classes = useStyles();
  // const [workspaceList, setWorkspaceList] = React.useState([]);
  // const [workspace, setWorkspace] = React.useState('');
  // const [messageDrawerOpen, setMessageDrawerOpen] = React.useState(false);
  // const [channelObj, setChannelObj] = React.useState({
  //   id: '',
  //   name: '',
  // });
  // const [channelFeed, setChannelFeed] = React.useState([]);
  // const [dmDrawerOpen, setdmDrawerOpen] = React.useState(false);
  // const [dmObj, setDmObj] = React.useState({
  //   id: '',
  //   name: '',
  // });
  // const [dmFeed, setDmFeed] = React.useState([]);


  return (
    <div>
      <WorkspaceContext.Provider
        // value={{value: [workspaceList, setWorkspaceList]}}
      >
        <Box sx={{ display: 'flex' }}>
          <TopAppBar />
          <SideNav />
          <MedList />
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
        </Box>
      </WorkspaceContext.Provider>
    </div>
  );
}

export default Homepage;
