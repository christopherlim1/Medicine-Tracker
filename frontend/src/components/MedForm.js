import React from "react";
import Avatar from "@mui/material/Avatar";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
  time: "",
};

const postMedicine = async (gID) => {
  await axios
    .post(`http://localhost:4000/v0/medicine/${gID}`, input)
    .then((response) => {
      console.log(response);
    })
    .catch(() => {
      console.log("Cannot Post medicine...\n");
    });
};

function MedForm() {
  const {customerIDS} = React.useContext(WorkspaceContext);
  const [customerID,] = customerIDS;

  const valuetext = (value) => {
    return `${value}`;
  };

  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [freq, setFreq] = React.useState(0);
  const [dosage, setDosage] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [time, setTime] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    input["name"] = name;
    input["description"] = desc;
    input["frequency"] = parseInt(freq);
    input["doses"] = parseInt(dosage);
    input["totalAmount"] = totalAmount;
    input["time"] = time;
    postMedicine(customerID);
  };

  
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
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setDesc(e.target.value)}
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
                  onChange={(e) => setFreq(e.target.value)}
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
                <TextField
                  onChange={(e) => setDosage(e.target.value)}
                  required
                  multiline
                  fullWidth
                  placeholder="Doses per day"
                  name="dosage"
                  label="Dosage"
                  id="dosage"
                  variant="outlined"
                  rows={1}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography id="total-amount-slider" gutterBottom>
                  Total Amount
                </Typography>
                <Slider
                  onChange={(e) => setTotalAmount(e.target.value)}
                  name="slider"
                  defaultValue={30}
                  getAriaValueText={valuetext}
                  aria-labelledby="total-amount-slider"
                  step={1}
                  valueLabelDisplay="auto"
                  marks={marks}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setTime(e.target.value)}
                  id="first-dose-datetime-local"
                  label="First Dose"
                  type="datetime-local"
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
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

export default MedForm;
