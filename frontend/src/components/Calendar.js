import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Box from "@mui/material/Box";
import { WorkspaceContext } from "../App.js";
import "./Calendar.css";

function Calendar() {
  const { customerIDS } = React.useContext(WorkspaceContext);
  const [googleID] = customerIDS;

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo, "event clicked");
  };

  const renderEventContent = (eventInfo) => {
    const event = (
      <span>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </span>
    );

    return <>{event}</>;
  };

  return (
    <div className="calendar-app">
      <div
        className="calendar-app-main"
        // sx={{
        //   // Controls the look for the calendar
        //   width: "auto",
        //   height: "auto",
        //   position: "relative",
        // }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          eventSources={[
            {
              url: "http://localhost:4000/v0/medicine/events/" + googleID + "/",
            },
          ]}
          // dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
}

export default Calendar;
