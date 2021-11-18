import React from "react";
import axios from "axios";
// import { WorkspaceContext } from "../App"

// const {customerIDS} = React.useContext(WorkspaceContext);

let events = [];
let meds = [];

// const [googleID] = customerIDS;

const getGoogleId = async () => {
  await axios
    .get("/api/googleId")
    .then((response) => {
      googleId = response.data;
    })
    .catch(() => {
      console.log("Cannot get medicine list for calendar");
    });
};

export const getEvents = async (googleId) => {
  await axios
    .get(`http://localhost:4000/v0/medicine/${googleId}`)
    .then((response) => {
      meds = response.data;
      meds.forEach((med) => {
        med["events"].forEach((event) => {
          events.push(event);
        });
      });
      console.log("end of addint events");
    })
    .catch(() => {
      console.log("Cannot get medicine list for calendar");
    });
  console.log(events, "events: getEvents() in Calendar.js");
  return events;
};

export const EVENTS = getEvents(getGoogleId);
