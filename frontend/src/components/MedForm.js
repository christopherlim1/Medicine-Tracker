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

const getMedicine = (gID, setMedicineList) => {
  axios.get(`http://localhost:4000/v0/medicine/${gID}`)
    .then((response)=>{
      setMedicineList(response.data);
    })
    .catch(()=>{
      console.log('Cannot get medicine list');
    });
};

function MedForm() {
  const {customerIDS, activeCompS, openEditS, editMedIDS, medicineListS} = React.useContext(WorkspaceContext);
  const [customerID] = customerIDS;
  const [, setActiveComp] = activeCompS;
  const [openEdit, setOpenEdit] = openEditS;
  const [editMedID, setEditMedID] = editMedIDS;
  const [, setMedicineList] = medicineListS;

  const input = {};

  const valuetext = (value) => {
    return `${value}`;
  };

  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [freq, setFreq] = React.useState(0);
  const [dosage, setDosage] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(30);
  const [time, setTime] = React.useState("");

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

  const putMedicine = async (mID, inputs) => {
    setOpenEdit(false);
    console.log(inputs)
    console.log('input in put medicine')
    await axios
      .put(`http://localhost:4000/v0/medicine/update/${mID}`, inputs)
      .then((response)=>{
        console.log(response);
        getMedicine(customerID, setMedicineList);
      })
      .catch(()=>{
        console.log("Cannot Put medicine...\n");
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    input["name"] = name;
    input["description"] = desc;
    input["frequency"] = parseInt(freq);
    input["doses"] = parseInt(dosage);
    input["totalAmount"] = totalAmount;
    input["time"] = time;
    postMedicine(customerID);
    setActiveComp("Medications");
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    input["name"] = name;
    input["description"] = desc;
    input["frequency"] = parseInt(freq);
    input["doses"] = parseInt(dosage);
    input["totalAmount"] = totalAmount;
    input["time"] = time;
    setOpenEdit(false);
    console.log('input before put medicine')
    console.log(input)
    putMedicine(editMedID, input);
    setActiveComp("Medications");
    setEditMedID('');
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

  const [medToEdit, setMedicineToEdit] = React.useState({});

  const getSingleMedicine = (editMedID, setMedicineToEdit) => {
    axios.get(`http://localhost:4000/v0/medicine/single/${editMedID}`)
      .then((response)=>{
        setMedicineToEdit(response.data[0]);
      })
      .catch(()=>{
        console.log('Cannot get medicine list');
      });
  };

  React.useEffect(() => {
    getSingleMedicine(editMedID);
  }, [editMedID, setMedicineToEdit]);

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
            // noValidate  // Browers handles validation if this line is commented out.
            onSubmit={openEdit ? handleSubmitEdit : handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  name="name"
                  label={"Medicine Name"}
                  defaultValue={openEdit ? medToEdit['name'] : ""}
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
                  defaultValue={openEdit ? medToEdit['description'] : ""}
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
                  label={"Frequency"}
                  defaultValue={openEdit ? medToEdit['frequency'] : ""}
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
                  placeholder="How much do you take each time?"
                  name="dosage"
                  label= "Dosage"
                  defaultValue={openEdit ? medToEdit['doses'] : ""}
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
                  defaultValue={openEdit ? medToEdit['totalAmount'] : 0}
                  getAriaValueText={valuetext}
                  aria-labelledby="total-amount-slider"
                  step={1}
                  valueLabelDisplay="auto"
                  marks={marks}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setTime(e.target.value)}
                  defaultValue={openEdit ? medToEdit['time'] : null}
                  id="first-dose-datetime-local"
                  label="First Dose"
                  type="datetime-local"
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
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
