import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Box from "@mui/material/Box";
import axios from "axios";

import { WorkspaceContext } from "../App.js";

function Calendar() {
  const {customerIDS} =
    React.useContext(WorkspaceContext);
  const [googleID] = customerIDS;

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
