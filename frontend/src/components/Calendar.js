import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Box from "@mui/material/Box";
import axios from "axios";

import { WorkspaceContext } from "../App.js";

function Calendar() {
  const { weekendsVisibleS, currentEventsS, customerIDS } =
    React.useContext(WorkspaceContext);
  const [weekendsVisible] = weekendsVisibleS;
  const [currentEvents] = currentEventsS;
  const [googleID] = customerIDS;

  const events = [];
  let meds = [];

  const getEvents = async (gID) => {
    await axios
      .get(`http://localhost:4000/v0/medicine/${gID}`)
      .then((response) => {
        meds = response.data;
        // console.log(meds);
        meds.forEach((med) => {
          med['events'].forEach((event) => {
            events.push(event);
          });
        });
        // console.log(med);
      })
      .catch(() => {
        console.log("Cannot get medicine list for calendar");
      });
    console.log(events, "Calendar events");
  };

  /*

  */
  // React.useEffect(() => {
  //   console.log("useEffect getUserEvents");
  //   getEvents(googleID);
  // }, [googleID]);


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
        events={getEvents(googleID)}
        // initialEvents={events}
        // dateClick={handleDateClick}
        eventContent={renderEventContent}
      />
    </Box>
  );
}

export default Calendar;
