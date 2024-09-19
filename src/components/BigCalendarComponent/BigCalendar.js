import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

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
    />
  );
}

export default BigCalendar;
