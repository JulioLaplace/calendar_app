import React, {useCallback} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BigCalendar.css";
import Toolbar from "../ToolbarComponent/Toolbar";
import {editEventInFirestore} from "../../Services/eventService";

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);

moment.updateLocale('en', {
    week: {
        dow: 1, // 1 stands for Monday
    },
});

function BigCalendar({ events, onSelectEvent, onSelectSlot }) {

  const onChangeEvent = useCallback(async (start, end, event_selected) => {
      console.log(event_selected.id);
      for (let event of events) {
          if (event.id === event_selected.id) {
              event.start = start;
              event.end = end;
              console.log(event)
              await editEventInFirestore(event)
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
      onEventDrop={({start, end, event}) => {onChangeEvent(start, end, event)}}
      onEventResize={({start, end, event}) => {onChangeEvent(start, end, event)}}
    />
  );
}

export default BigCalendar;
