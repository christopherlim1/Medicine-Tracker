import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {GoogleLogin} from 'react-google-login';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GoogleIcon from '@mui/icons-material/Google';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

const theme = createTheme();

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({type: 'AUTH', data: {result, token} });
      history.push('/home');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('Google Sign In Failure. Try again');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" variant="h3">
            Medicine Tracker
          </Typography>
          <Avatar sx={{ m: 3, bgcolor: 'green' }}>
            <LocalHospitalIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Google Sign In
          </Typography>
          <Avatar sx={{ m: 3, bgcolor: 'black' }}>
            <GoogleIcon />
          </Avatar>
          <GoogleLogin
            clientId="549599152851-v5c03ndj9k128cvngjtbqddgds1gkuqq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
              sx={{ m: 3, bgcolor: 'darkblue' }}
              color="primary"
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<AccountCircle/>}
              variant="contained"
              >
                Sign In
              </Button>  
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Login;