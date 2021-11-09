/*
// date-fns
npm install @date-io/date-fns
*/
import React from 'react';
// import MaterialDateTimePicker from './MaterialDateTimePicker';
// import DateAdapter from '@mui/lab/AdapterDateFns';
import Avatar from '@mui/material/Avatar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="type"
                                    label="Medicine Type"
                                    id="tyle"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    multiline
                                    fullWidth
                                    placeholder="Description of medication"
                                    name="description"
                                    label="Medecine Description"
                                    id="description"
                                    variant="outlined"
                                    rows={2}
                                    rowsMax={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DosageInput />
                            </Grid>
                            <Grid item xs={12}>
                                <QuantitySlider />
                            </Grid>
                            <Grid item xs={12}>
                                <TimeOfDayInput />
                            </Grid>
                        </Grid>
                        {/* <DaysCheckboxes /> */}
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


function DosageInput() {
    const [measurement, setMeasurement] = React.useState();
    const [dosage, setDosage] = React.useState();

    const handleMeasurementChange = (event) => {
        setMeasurement(event.target.value);
    };

    const handleDosageChange = (event) => {
        setDosageMeasurement(event.target.value);
    };

    return (
        <div>
            <TextField
                required
                id="dosage"
                label="Dosage"
                value={dosage}
                sx={{ m: 1, width: '25ch' }}
                varient="outlined"
                onChange={handleDosageChange}
            />
            <FormControl sx={{ m: 1, minWidth: 140 }}>
                <InputLabel id="measurement-label">Measurement</InputLabel>
                <Select
                    required
                    labelId="measurement-label"
                    id="measurement-label"
                    value={measurement}
                    label="Measurement"
                    onChange={handleMeasurementChange}
                >
                    <MenuItem value="mg">
                        <em>mg</em>
                    </MenuItem>
                    <MenuItem value={"mL"}>mL</MenuItem>
                    <MenuItem value={"tablet"}>tablet</MenuItem>
                    <MenuItem value={"pill(s)"}>pill(s)</MenuItem>
                    <MenuItem value={"mg/mL"}>mg/mL</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

function TimeOfDayInput() {
    const date = new Date();
    const [value, setValue] = React.useState();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            id="first-dose-datetime-local"
            label="First Dose"
            type="datetime-local"
            defaultValue="2021-11-10T10:30"
            value={value}
            sx={{ width: 250 }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );

    // return (
    //     <FormControl component="fieldset">
    //         <FormLabel component="legend">Gender</FormLabel>
    //         <RadioGroup
    //             aria-label="time-of-day"
    //             name="controlled-radio-buttons-group"
    //             value={value}
    //             onChange={handleChange}
    //         >
    //             <FormControlLabel value="morning" control={<Radio />} label="Morning" />
    //             <FormControlLabel value="afternoon" control={<Radio />} label="Afternoon" />
    //             <FormControlLabel value="afternoon" control={<Radio />} label="Night" />
    //         </RadioGroup>
    //     </FormControl>
    // );
}

function FrequencyInput() {

}


function QuantitySlider() {

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 30,
            label: '30',
        },
        {
            value: 60,
            label: '60',
        },
        {
            value: 100,
            label: '100',
        },
    ];

    const valuetext = (value) => {
        return `${value}`;
    };

    return (
        <div>
            <Typography id="total-amount-slider" gutterBottom>
                Total Amount
            </Typography>
            <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="total-amount-slider"
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </div>
    );
};

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
