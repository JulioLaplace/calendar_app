import React from "react";
import moment from "moment";

function EventDetails({ event }) {
  if (!event) {
    return <div>No event selected. Click the calendar to add an event.</div>;
  }

  return (
    <div className="event-details">
      <h3>{event.title}</h3>
      <p>Start Time: {moment(event.start).format("YYYY-MM-DD HH:mm")}</p>
      <p>End Time: {moment(event.end).format("YYYY-MM-DD HH:mm")}</p>
      <p>Content: {event.content}</p>
    </div>
  );
}

export default EventDetails;