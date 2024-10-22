import React, { useState, useCallback, useEffect } from "react";
import BigCalendar from "./components/BigCalendarComponent/BigCalendar";
import AddEventForm from "./components/AddEventFormComponent/AddEventForm";
import EventDetails from "./components/EventDetailsComponent/EventDetails";
import EditEvent from "./components/EditEventComponent/EditEvent";
import { getAllEventsFromFirestore } from "./Services/eventService";
import "./components/EventDetailsComponent/EventDetails.css";
import moment from "moment";
import "./App.css";

const convert_events = (list_events) => {
  let list_events_calendar = [];
  for (let event of list_events) {
    let calendarEvent = {
      id: event.id,
      title: event.title,
      start: event.start.toDate(),
      end: event.end.toDate(),
      content: event.content,
      location: event.location,
      attendees: event.attendees,
      travelTime: event.travelTime,
    };
    list_events_calendar.push(calendarEvent);
  }
  return list_events_calendar;
};

function App() {
  useEffect(() => {
    window.onbeforeunload = function () {
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
  const [isEditEventFormOpen,setIsEditEventFormOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventStart, setNewEventStart] = useState("");
  const [newEventEnd, setNewEventEnd] = useState("");

  const toggleEventOverview = useCallback(() => {
    if(!isEventOverviewOpen){
      setIsAddEventFormOpen(false);
      setSelectedEvent(null);
      setNewEventStart("");
      setNewEventEnd("");
    }
    setIsEventOverviewOpen(!isEventOverviewOpen);
  }, [isEventOverviewOpen]);

  const handleAddEvent = useCallback((newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setIsAddEventFormOpen(false);
    setSelectedEvent(null);
  }, []);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setIsEventOverviewOpen(true);
    setIsAddEventFormOpen(false);
    setIsEditEventFormOpen(false);
    setNewEventStart("");
    setNewEventEnd("");
  }, []);

  const handleEventUpdate = useCallback((updatedEvent) => {
    const updatedCalendarEvent = {
      ...updatedEvent,
      start:updatedEvent.start instanceof Date ? updatedEvent.start : updatedEvent.start.toDate(),
      end: updatedEvent.end  instanceof Date ? updatedEvent.end : updatedEvent.end.toDate()
    };
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedCalendarEvent : event
      )
    );
    setSelectedEvent(updatedCalendarEvent);
    setIsEditEventFormOpen(false);
  }, []);

  const handleEditEvent = useCallback(() => {
    setIsEditEventFormOpen(true);
  },[]);

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

      <button
        onClick={toggleEventOverview}
        className={`toggle-overview-button ${
          isEventOverviewOpen ? "opened" : ""
        }`}
      ></button>

      <div
        className={`event-overview-box ${
          isEventOverviewOpen ? "open" : "closed"
        }`}
      >
        <div className="event-overview">
          <div className="event-overview-title">Event Details</div>
          {isAddEventFormOpen ? (
            <AddEventForm
              onAddEvent={handleAddEvent}
              onClose={handleCloseAddEventForm}
              initialStart={newEventStart}
              initialEnd={newEventEnd}
            />
          ) : isEditEventFormOpen ? (
            <EditEvent
              event={selectedEvent}
              onClose={()=> setIsEditEventFormOpen(false)}
              onEventUpdated={handleEventUpdate}
            />
          ) : (
            <EventDetails 
              event={selectedEvent} 
              onEdit={handleEditEvent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
