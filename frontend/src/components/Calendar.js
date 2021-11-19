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

  // const handleEventClick = (clickInfo) => {

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
        eventSources={[
          {
            url: 'http://localhost:4000/v0/medicine/events/' + googleID + '/',
            color: 'yellow',   // an option!
            textColor: 'black', // an option!
          }
        ]}
        // dateClick={handleDateClick}
        eventContent={renderEventContent}
      />
    </Box>
  );
}

export default Calendar;
