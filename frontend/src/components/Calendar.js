import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Box from '@mui/material/Box';
import axios from "axios";

import {WorkspaceContext} from '../App.js';

function Calendar() {

  const {weekendsVisibleS, currentEventsS, customerIDS} = React.useContext(WorkspaceContext);
  const [weekendsVisible,] = weekendsVisibleS;
  const [currentEvents,] = currentEventsS;
  const [googleID,] = customerIDS;

  const getUserEvents = (gID) => {
    axios.get(`http://localhost:4000/v0/medicine/${gID}`)
    .then((response)=>{
      meds = response.data;
      if(meds) {
        meds.forEach((med) => {
          events.concat(med.events);
        })
        console.log(events);
      }
    })
    .catch(()=>{
      console.log('Cannot get medicine list');
    });
  };

  const [events, setEvents] = React.useState(getUserEvents(googleID));


  // const [channelObj, setChannelObj] = React.useState({
  //   id: '',
  //   name: '',
  //   events: [],
  // });
  // const [channelFeed, setChannelFeed] = React.useState([]);
  // const [dmDrawerOpen, setdmDrawerOpen] = React.useState(false);
  // const [dmObj, setDmObj] = React.useState({
  //   id: '',
  //   name: '',
  //   events: [],
  // });
  // const [dmFeed, setDmFeed] = React.useState([]);

  // const handleDateClick = (selectInfo) => {
  // let title = prompt('Please enter a new title for your event')
  // let calendarApi = selectInfo.view.calendar

  // calendarApi.unselect() // clear date selection

  // if (title) {
  //   calendarApi.addEvent({
  //     id: createEventId(),
  //     title,
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //     allDay: selectInfo.allDay
  //   })
  // }
  // }

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

  // const renderEventContent = (eventInfo) => {
  // return (
  //   <>
  //     <b>{eventInfo.timeText}</b>
  //     <i>{eventInfo.event.title}</i>
  //   </>
  // )
  // }

  return (
    <Box className='Calendar' sx={{ // Controls the look for the calendar
      width: 'auto',
      height: 'auto',
      position: 'relative',
      }}>
      <FullCalendar
        sx={{
          bgcolor: 'blue',
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
      // dateClick={handleDateClick}
      // eventContent={renderEventContent}
      />
    </Box>
  )
}

export default Calendar;
