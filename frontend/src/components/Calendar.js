import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function Calendar() {

  const weekendsVisible = React.useState({weekendsVisible: true });
  const currentEvents = React.useState({ currentEvents: [] });

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

  const handleDateClick = (selectInfo) => {
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
  }

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  const renderEventContent = (eventInfo) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
  }

  return (
    <div className='Calendar'>
        <FullCalendar
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
          // dateClick={handleDateClick}
          // eventContent={renderEventContent}
        />
    </div>
  )
}

export default Calendar;


/*
 

         events: [
            {
              id: 'a',
              groupId: ,
              title: 'my event',
              start: '2018-09-01',
              end: '2018-09-01',
              allDay: false,
              editable: true,
              display: 'auto'
              daysOfWeek: []
              startTime:
              endTime:
              startRecur:
              endRecur:

            }
          ]



  events: [
    {
      groupId: 'blueEvents', // recurrent events in this group move together
      daysOfWeek: [ '4' ],
      startTime: '10:45:00',
      endTime: '12:45:00'
    },
    {
      daysOfWeek: [ '3' ], // these recurrent events move separately
      startTime: '11:00:00',
      endTime: '11:30:00',
      color: 'red'
    }
  ],
  editable: true
});
*/