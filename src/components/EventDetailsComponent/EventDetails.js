import React from "react";
import moment from "moment-timezone";
import "./EventDetails.css";

moment.tz.setDefault('Europe/Stockholm');

function EventDetails({ event, onEdit, onDelete }) {
  if (!event) {
    return (
      <div className="no-event">
        No event selected. Click the calendar to add an event.
      </div>
    );
  }

  const formatDateTime = (date) => {
    return moment(date).tz('Europe/Stockholm').format('YYYY-MM-DD HH:mm');
  };

  return (
    <div className="event-details">
      <button onClick={onEdit} className="edit-button">
        Edit
      </button>
      <h3 className="event-title">{event.title}</h3>

      <div className="event-info">
        <p>
          <strong>Start Time:</strong>{" "}
          {formatDateTime(event.start)}
        </p>
        <p>
          <strong>End Time:</strong>{" "}
          {formatDateTime(event.end)}
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
        {event.travelTime  && event.travelTime !== "" && (
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
