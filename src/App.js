import React, {useState, useCallback, useEffect} from "react";
import BigCalendar from "./components/BigCalendarComponent/BigCalendar";
import AddEventForm from "./components/AddEventFormComponent/AddEventForm";
import EventDetails from "./components/EventDetailsComponent/EventDetails";
import {getAllEventsFromFirestore} from "./Services/eventService";
import './components/EventDetailsComponent/EventDetails.css';
import moment from "moment";
import "./App.css";

const convert_events = (list_events) =>{
  let list_events_calendar = [];
  for (let event of list_events){
    let calendarEvent= {
      title: event.title,
      start: event.start.toDate(),
      end: event.end.toDate(),
      content: event.content,
    };
    list_events_calendar.push(calendarEvent);
  }
  return list_events_calendar;
}

function App() {
  useEffect(() => {
    window.onbeforeunload = function() {
      return true;
    };

    return async () => {
      const events_db = await getAllEventsFromFirestore();
      console.log(events_db);
      console.log(convert_events(events_db));
      setEvents(convert_events(events_db));
      window.onbeforeunload = null;
    };
  }, []);
  const [isEventOverviewOpen, setIsEventOverviewOpen] = useState(false);
  const [isAddEventFormOpen, setIsAddEventFormOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventStart, setNewEventStart] = useState("");
  const [newEventEnd, setNewEventEnd] = useState("");

  const toggleEventOverview = useCallback(() => {
    setIsEventOverviewOpen((prev) => !prev);
    setIsAddEventFormOpen(false);
    setSelectedEvent(null);
    setNewEventStart("");
    setNewEventEnd("");
  }, []);

  const handleAddEvent = useCallback((newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setIsAddEventFormOpen(false);
    setSelectedEvent(null);
  }, []);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setIsEventOverviewOpen(true);
    setIsAddEventFormOpen(false);
    setNewEventStart("");
    setNewEventEnd("");
  }, []);

  const handleSelectSlot = useCallback(({ start, end }) => {
    setNewEventStart(moment(start).format("YYYY-MM-DDTHH:mm"));
    setNewEventEnd(moment(end).format("YYYY-MM-DDTHH:mm"));
    setIsAddEventFormOpen(true);
    setIsEventOverviewOpen(true);
    setSelectedEvent(null);
  }, []);

  const handleCloseAddEventForm = useCallback(() => {
    setIsAddEventFormOpen(false);
    setNewEventStart("");
    setNewEventEnd("");
    setSelectedEvent(null);
  }, []);

  const handleDeleteEvent = useCallback(() => {
    if (selectedEvent) {
      setIsDeleting(true);

      setTimeout(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((Event) => Event !== selectedEvent)
        );
        setSelectedEvent(null);
        setIsEventOverviewOpen(false);
        setIsDeleting(false);
      }, 1000);
    }
  }, [selectedEvent]);

  return (
    <div className="all-the-view-box">
      <div className="calendar-box">
        <BigCalendar
          events={events}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />
      </div>

      <button
          onClick={toggleEventOverview} className={`toggle-overview-button ${isEventOverviewOpen ? 'opened' : ''}`} >
      </button>

      <div className={`event-overview-box ${isEventOverviewOpen ? 'open' : 'closed'}`}>
        <div className="event-overview">
          <div className="event-overview-title">Event Details</div>
          {isAddEventFormOpen ? (
              <AddEventForm
                  onAddEvent={handleAddEvent}
                  onClose={handleCloseAddEventForm}
                  initialStart={newEventStart}
                  initialEnd={newEventEnd}
              />
          ) : (
              <EventDetails event={selectedEvent} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
