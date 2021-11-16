import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function TopAppBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/');
    setUser(null);
  };

  return (
    <div>
      <AppBar
        style={{ background: '#2E3B55' }}
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar classes={{maxHeight: 70}}>
          <Typography align="left" variant="h5">
            Pill Slugs
          </Typography>
          <Typography align="center" variant="h4" sx={{ flexGrow: 1 }}>
            Medicine Tracker
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={logout}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopAppBar;