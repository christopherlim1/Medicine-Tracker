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

const fetchCustomerID = (setCustomerID, gID) => {
  console.log('on top (fetchCustomerID)');
  console.log('gID:', gID);
  if (gID === '') {
    return;
  }
  console.log('after return (fetchCustomerID)');
  fetch(`/customer/${gID}`, {
    method: 'get',
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((gID) => {
      setCustomerID(gID);
      console.log('USER EXISTs');
    })
    .catch((error) => {
      console.log('USER DOES NOT EXIST');
      // postNewCustomer(gID);
    });
}

// function postNewCustomer = (gID) => {
//   fetch(`/customer/${gID}`, {
//     method: 'post',
//   })
//     .then
// }

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [customerID, setCustomerID] = React.useState('');
  const handleCustomerID = (gID) => {
    setCustomerID(gID);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(result);
    try {
      dispatch({type: 'AUTH', data: {result, token} });
      const gID = result.googleId;
      // grabbing google ID from result is working
      // console.log('googleId: ', gID);
      handleCustomerID(gID);

      history.push('/home');
    } catch (error) {
      console.log(error);
    }
  };

  // check if customer exists
  React.useEffect(() => {
    console.log('INSIDE useEffect');
    console.log('customerID:', customerID);
    fetchCustomerID(setCustomerID, customerID);
  }, [customerID, setCustomerID]);

  // console.log(result);

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