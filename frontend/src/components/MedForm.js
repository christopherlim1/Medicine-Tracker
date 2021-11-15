/*
// date-fns
npm install @date-io/date-fns
*/
import React from "react";
// import MaterialDateTimePicker from './MaterialDateTimePicker';
// import DateAdapter from '@mui/lab/AdapterDateFns';
import Avatar from "@mui/material/Avatar";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { WorkspaceContext } from "../App.js";

const theme = createTheme();

const input = {
  name: "",
  description: "",
  frequency: 0,
  doses: 0,
  totalAmount: 0,
};

const PostMedicine = (gID) => {
  axios
    .post(`http://localhost:4000/v0/medicine/${gID}`, input)
    .then((response) => {
      console.log(response);
    })
    .catch(() => {
      console.log("Cannot Post medicine...\n");
    });
};

export default function MedForm() {
  const {customerIDS} = React.useContext(WorkspaceContext);
  const [customerID,] = customerIDS;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    input["name"] = data.get("name");
    input["description"] = data.get("description");
    input["frequency"] = data.get("frequency");
    input["dosage"] = data.get("dosage");
    input["totalAmount"] = data.get("slider");
    PostMedicine(customerID);
  };

  const DosageInput = () => {
    const [dosage, setDosage] = React.useState(0);

    const handleDosageChange = (event) => {
      setDosage(event.target.value);
    };

    return (
      <TextField
        required
        multiline
        fullWidth
        placeholder="Doses per day"
        name="dosage"
        label="Dosage"
        id="dosage"
        variant="outlined"
        onChange={handleDosageChange}
        value={dosage}
        rows={1}
      />
    );
  };

  const QuantitySlider = () => {
    const marks = [
      {
        value: 0,
        label: "0",
      },
      {
        value: 30,
        label: "30",
      },
      {
        value: 60,
        label: "60",
      },
      {
        value: 100,
        label: "100",
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
          name="slider"
          defaultValue={30}
          getAriaValueText={valuetext}
          aria-labelledby="total-amount-slider"
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </div>
    );
  };

  const TimeOfDayInput = () => {
    const date = new Date();
    const [medTime, setMedTime] = React.useState();

    const handleMedTime = (event) => {
      setMedTime(event.target.value);
    };

    return (
      <TextField
        id="first-dose-datetime-local"
        label="First Dose"
        type="datetime-local"
        value={medTime}
        onChange={handleMedTime}
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: "green" }}>
            <LocalHospitalIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Medicine Form
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
                  multiline
                  fullWidth
                  placeholder="Description of medication"
                  name="description"
                  label="Medicine Description"
                  id="description"
                  variant="outlined"
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  fullWidth
                  placeholder="How frequent do you want to take the medicine?"
                  name="frequency"
                  label="Frequency"
                  id="frequency"
                  variant="outlined"
                  rows={1}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Save Medicine
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
