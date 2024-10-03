import React, { useState, useCallback } from "react";
import BigCalendar from "./components/BigCalendarComponent/BigCalendar";
import AddEventForm from "./components/AddEventFormComponent/AddEventForm";
import EventDetails from "./components/EventDetailsComponent/EventDetails";
import './components/EventDetailsComponent/EventDetails.css';
import moment from "moment";
import "./App.css";

function App() {
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

  return (
    <div className="all-the-view-box">
      <div className="calendar-box">
        <BigCalendar
          events={events}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />
      </div>

      <button onClick={toggleEventOverview} className="toggle-overview-button">
        {isEventOverviewOpen ? "x" : "+"}
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
