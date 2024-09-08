import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

function BigCalendar() {
  return (
    <Calendar
      localizer={localizer}
      // events={props.events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
}

export default BigCalendar;
