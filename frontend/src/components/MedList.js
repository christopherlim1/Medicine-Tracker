import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import MedicationIcon from "@mui/icons-material/Medication";
import axios from "axios";
import { getMedicine } from "../utilities/getMedicine";

import { WorkspaceContext } from "../App.js";

function MedDetails(medication) {
  const arr = [];
  const keys = ["description", "frequency", "doses", "totalAmount", "time"];
  keys.shift();
  for (let i = 0; i < keys.length; i++) {
    const jsx = (
      <ListItemButton key={i + 2} sx={{ pl: 4 }}>
        <ListItemIcon key={i + 3}>
          <StarBorder />
        </ListItemIcon>
        <ListItemText
          primary={keys[i]}
          secondary={medication[keys[i]]}
          key={i + 4}
        />
      </ListItemButton>
    );
    arr.push(jsx);
  }
  return arr;
}

// https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende
function MedList() {
  const { customerIDS } = React.useContext(WorkspaceContext);

  const [googleID] = customerIDS;

  const [meds, setMeds] = React.useState([]);
  const [arr, setArr] = React.useState([]);

  React.useEffect(() => {
    setMeds(getMedicine(googleID));
    setArr(generateList());
    console.log(meds, "meds: useEffect() in MedList.js");
  }, [googleID]);

  const generateList = () => {
    const arr = [];
    for (let i = 0; i < meds.length; i++) {
      const [open, setOpen] = React.useState(false); // Maybe set to false
      const name = meds[i]["name"];
      const jsx = (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          key={i}
        >
          <ListItemButton key={i + 5} onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <MedicationIcon />
            </ListItemIcon>
            <ListItemText primary={name} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List key={i + 1} component="div" disablePadding>
              {MedDetails(meds[i])}
            </List>
          </Collapse>
        </List>
      );
      arr.push(jsx);
    }
    return arr;
  };

  return (
    <List
      sx={{
        width: "100%",
        maxLength: 360,
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      {arr} {/* {generateList()} */}
    </List>
  );
}

export default MedList;
