import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BigCalendar.css";
import Toolbar from "../ToolbarComponent/Toolbar"; // import toolbar component  

const localizer = momentLocalizer(moment);

moment.updateLocale('en', {
    week: {
        dow: 1, // 1 stands for Monday
    },
});

function BigCalendar({ events, onSelectEvent, onSelectSlot }) {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["month", "week", "day"]}
      onSelectEvent={onSelectEvent}
      selectable={true}
      onSelectSlot={onSelectSlot}
      components={{
        toolbar: Toolbar // 
      }}
    />
  );
}

export default BigCalendar;
