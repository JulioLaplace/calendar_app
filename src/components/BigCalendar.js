import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const events = [{
  start: moment("2024-09-16T10:00:00").toDate(),
  end: moment("2024-09-16T12:00:00").toDate(),
  title: "Ui Specification Meeting"
}]

function BigCalendar() {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["month", "week", "day"]}
    />
  );
}

export default BigCalendar;
