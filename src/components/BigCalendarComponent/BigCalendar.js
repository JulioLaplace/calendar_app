import React, {useCallback} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BigCalendar.css";
import Toolbar from "../ToolbarComponent/Toolbar";

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);

moment.updateLocale('en', {
    week: {
        dow: 1, // 1 stands for Monday
    },
});

function BigCalendar({ events, onSelectEvent, onSelectSlot }) {

  const onChangeEvent = useCallback((start, end, event_title) => {
      for (let event of events){
          if (event.title === event_title){
              event.start = start;
              event.end = end;
              break
          }
      }
  })

  return (
    <DnDCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["month", "week", "day"]}
      onSelectEvent={onSelectEvent}
      selectable={true}
      onSelectSlot={onSelectSlot}
      components={{
        toolbar: Toolbar
      }}
      dragabbleAccessor={"isDraggable"}
      onEventDrop={({start, end, event}) => {onChangeEvent(start, end, event.title)}}
      onEventResize={({start, end, event}) => {onChangeEvent(start, end, event.title)}}
    />
  );
}

export default BigCalendar;
