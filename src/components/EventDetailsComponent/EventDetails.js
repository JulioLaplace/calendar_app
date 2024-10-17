import React from "react";
import moment from "moment";
import './EventDetails.css';

function EventDetails({ event }) {
  if (!event) {
    return <div className="no-event">
        No event selected. Click the calendar to add an event.
    </div>;
  }

  return (
      <div className="event-details">
          <h3 className="event-title">{event.title}</h3>

          <div className="event-info">
              <p><strong>Start Time:</strong> {moment(event.start).format("YYYY-MM-DD HH:mm")}</p>
              <p><strong>End Time:</strong> {moment(event.end).format("YYYY-MM-DD HH:mm")}</p>
              <p><strong>Content:</strong> {event.content}</p>

              {/*Delete button */}
              <button className="delete-event-button" onClick={onDelete}>
                Delete Event
              </button>
          </div>
      </div>
  );
}

export default EventDetails;