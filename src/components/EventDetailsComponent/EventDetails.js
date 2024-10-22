import React from "react";
import moment from "moment";
import "./EventDetails.css";

function EventDetails({ event, onDelete }) {
  if (!event) {
    return (
      <div className="no-event">
        No event selected. Click the calendar to add an event.
      </div>
    );
  }

  return (
    <div className="event-details">
      <h3 className="event-title">{event.title}</h3>

      <div className="event-info">
        <p>
          <strong>Start Time:</strong>{" "}
          {moment(event.start).format("YYYY-MM-DD HH:mm")}
        </p>
        <p>
          <strong>End Time:</strong>{" "}
          {moment(event.end).format("YYYY-MM-DD HH:mm")}
        </p>
        {event.content && (
          <p>
            <strong>Content:</strong> {event.content}
          </p>
        )}
        {event.location && (
          <p>
            <strong>Location:</strong> {event.location}
          </p>
        )}
        {event.attendees && event.attendees.length > 0 && (
          <p>
            <strong>Attendees:</strong>{" "}
            {event.attendees.map((attendee) => attendee).join(", ")}
          </p>
        )}
        {event.travelTime && (
          <p>
            <strong>Travel Time:</strong> {event.travelTime}
          </p>
        )}
        <button className="delete-event-button" onClick={onDelete}>
                Delete Event
              </button>
      </div>
    </div>
  );
}

export default EventDetails;
