import React from 'react';
import Avatar from '@mui/material/Avatar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function MedForm() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            medName: data.get('name'),
            medType: data.get('type'),
        });
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
                    <Avatar sx={{ m: 3, bgcolor: 'green' }}>
                        <LocalHospitalIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Medicine Form
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="medName"
                  label="Medecine Name"
                  autoFocus
                />
              </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="name"
                                    label="Medicine Name"
                                    id="name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="type"
                                    label="Medicine Type"
                                    id="tyle"
                                />
                            </Grid>
                        </Grid>
                        <DaysCheckboxes />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

function DaysCheckboxes() {
    const [state, setState] = React.useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = state;
    return (
        <Grid item xs={12}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Days</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={sunday} onChange={handleChange} name="sunday" />
                        }
                        label="Sunday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={monday} onChange={handleChange} name="monday" />
                        }
                        label="Monday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={tuesday} onChange={handleChange} name="tuesday" />
                        }
                        label="Tuesday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={wednesday} onChange={handleChange} name="wednesday" />
                        }
                        label="Wednesday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={thursday} onChange={handleChange} name="thursday" />
                        }
                        label="Thursday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={friday} onChange={handleChange} name="friday" />
                        }
                        label="Friday"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={saturday} onChange={handleChange} name="saturday" />
                        }
                        label="Saturday"
                    />
                </FormGroup>
                <FormHelperText>Must select at least one day</FormHelperText>
            </FormControl>
        </Grid>
    );
}
