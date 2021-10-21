import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import healthSlug from './healthSlug.png';

// import {WorkspaceContext} from '../Homepage';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 50,
    width: 50,
  },
}));

function TopAppBar() {
  // NEED TO THINK ABOUT
  // - Logout
  // - anchor
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/');
    setUser(null);
  };

  const classes = useStyles();

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
          <img
            src={healthSlug}
            alt="Health Slug!"
            className={classes.logo} />
          <Typography align="center" variant="h4" sx={{ flexGrow: 1 }}>
            Medicine Tracker
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AccountBoxIcon/>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <SettingsIcon/>
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText
                  primary="Log Out"
                  onClick={logout}
                />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopAppBar;