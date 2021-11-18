import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Box from "@mui/material/Box";
import axios from "axios";
import {EVENTS} from "../utilities/fetchEvents"

import { WorkspaceContext } from "../App.js";

function Calendar() {
  const { weekendsVisibleS, currentEventsS, customerIDS } =
    React.useContext(WorkspaceContext);
  const [weekendsVisible] = weekendsVisibleS;
  const [currentEvents] = currentEventsS;
  const [googleID] = customerIDS;

  const dummyEvents = [
    {
      title: "dummy1",
      start: new Date(),
      end: new Date(),
    },
    {
      // dummy event for 11/11/2021
      title: "dummy2",
      start: new Date(2021, 10, 11),
      end: new Date(2021, 10, 11),
    },
  ];

  /*
  What does NOT fix the issue with the events rendering:
  1. Calling getEvents in the calendar jsx component
  2. Using state to set the events
  3. Attempting to set the calendar in same manner as MedList.js
  4. Using useEffect to set the calendar events

  Dummy events array does render events when calendar is loaded.

  Possible fixes:
  1. https://fullcalendar.io/docs/events-functionality
  2. https://fullcalendar.io/docs/event-source-object
  3. https://fullcalendar.io/docs/events-json-feed
  4. https://fullcalendar.io/docs/events-array
  5. Implmenting a getEvents function in the backend.
  */

  let events = [];
  let meds = [];

  const getEvents = async (gID) => {
    const newEvents = [];
    await axios
      .get(`http://localhost:4000/v0/medicine/${gID}`)
      .then((response) => {
        meds = response.data;
        meds.forEach((med) => {
          med['events'].forEach((event) => {
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

  /*
  Removed. This creates duplicates.
  */
  React.useEffect(() => {
    console.log(events, "events: useEffect() in  Calendar.js");
    // const newEvents = getEvents(googleID);
    // setEvents(newEvents);
    console.log(EVENTS, "EVENTS: useEffect() in Calendar.js");
  }, [googleID]);


  // const handleEventClick = (clickInfo) => {
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove()
  //   }
  // }

  // const handleEvents = (events) => {
  //   this.setState({
  //     currentEvents: events
  //   })
  // }

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <Box
      className="Calendar"
      sx={{
        // Controls the look for the calendar
        width: "auto",
        height: "auto",
        position: "relative",
      }}
    >
      <FullCalendar
        sx={{
          bgcolor: "blue",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        // eventSources={
        //   // events: getEvents(googleID),
        //   color: 'yellow',   // an option!
        //   textColor: 'black' // an option!
        // }
        // initialEvents={EVENTS}
        // dateClick={handleDateClick}
        eventContent={renderEventContent}
      />
    </Box>
  );
}

export default Calendar;
