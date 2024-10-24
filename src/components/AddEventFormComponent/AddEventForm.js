import React, { useState, useCallback, useEffect } from "react";
import { addNewEventToFirestore } from "../../Services/eventService";
import moment from "moment";
import "./AddEventForm.css";

function AddEventForm({ onAddEvent, onClose, initialStart, initialEnd }) {
  // Title of the event
  const [title, setTitle] = useState("");
  // Start and end date and time of the event
  const [startDate, setStartDate] = useState(
    initialStart ? moment(initialStart).format("YYYY-MM-DD") : ""
  );
  const [startTime, setStartTime] = useState(
    initialStart ? moment(initialStart).format("HH:mm") : ""
  );
  const [endDate, setEndDate] = useState(
    initialEnd ? moment(initialEnd).format("YYYY-MM-DD") : ""
  );
  const [endTime, setEndTime] = useState(
    initialEnd ? moment(initialEnd).format("HH:mm") : ""
  );
  // Content of the event
  const [content, setContent] = useState("");
  // Location of the event (optional)
  const [location, setLocation] = useState("");
  // Attendees of the event (optional)
  const [attendeeName, setAttendeeName] = useState("");
  const [attendees, setAttendees] = useState([]);
  // Travel time to the event (optional)
  const [travelTime, setTravelTime] = useState("");
  // Error message
  const [error, setError] = useState("");
  // Id of the event
  const [id, setId] = useState("");

  useEffect(() => {
    setStartDate(initialStart ? moment(initialStart).format("YYYY-MM-DD") : "");
    setStartTime(initialStart ? moment(initialStart).format("HH:mm") : "");
    setEndDate(initialEnd ? moment(initialEnd).format("YYYY-MM-DD") : "");
    setEndTime(initialEnd ? moment(initialEnd).format("HH:mm") : "");
  }, [initialStart, initialEnd]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const start = moment(`${startDate} ${startTime}`);
      const end = moment(`${endDate} ${endTime}`);

      if (end.isBefore(start)) {
        setError("End time cannot be earlier than start time");
        return;
      }

      onAddEvent({
        title,
        start: start.toDate(),
        end: end.toDate(),
        content,
        id,
        location,
        attendees,
        travelTime,
      });
      onClose();
    },
    [
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      content,
      location,
      attendees,
      travelTime,
      onAddEvent,
      onClose,
    ]
  );

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setLocation("");
    setAttendees([]);
    setAttendeeName("");
    setTravelTime("");
    setError("");
    onClose();
  };

  const handleAddEvent = async () => {
    const start = moment(`${startDate} ${startTime}`);
    const end = moment(`${endDate} ${endTime}`);

    const event = {
      title,
      start: moment(start).toDate(),
      end: moment(end).toDate(),
      content,
      isDraggable: true,
      location,
      attendees,
      travelTime,
    };
    const event_id = await addNewEventToFirestore(event);
    if (event_id != null){
        console.log("Event id added", event_id)
        setId(event_id);
        console.log(event.id)
      }
  };

  return (
    <form onSubmit={handleSubmit} className="add-event-form">
      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="full-width" // Added class for full-width styling
      />

      {/* Separate Date and Time Pickers */}
      <div className="datetime-inputs">
        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="datetime-inputs">
        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Content */}
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="full-width" // Added class for full-width styling
      />
      {error && <p className="error-message">{error}</p>}

      {/* Location */}
      <input
        type="text"
        placeholder="Location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        defaultValue={""}
        className="full-width"
      />

      {/* Attendees */}
      <label>
        <strong>Attendees</strong>
      </label>

      {attendees.length > 0 &&
        attendees.map((attendee, index) => (
          <div key={index || ""} className="attendee-item">
            {"• " + attendee}
            <button
              className="remove-attendee-button"
              type="button"
              onClick={() =>
                setAttendees(attendees.filter((_, i) => i !== index))
              }
            >
              ✖
            </button>
          </div>
        ))}

      <input
        type="text"
        placeholder="Attendees (optional)"
        value={attendeeName}
        onChange={(e) => setAttendeeName(e.target.value)}
        defaultValue={""}
        className="full-width"
      />

      <button
        type="button"
        onClick={() => {
          if (attendeeName) {
            setAttendees([...attendees, attendeeName]);
            setAttendeeName("");
          }
        }}
      >
        Add Attendee
      </button>

      {/* Travel Time */}
      <input
        type="text"
        placeholder="Travel Time (optional)"
        value={travelTime}
        onChange={(e) => setTravelTime(e.target.value)}
        defaultValue={""}
        className="full-width"
      />

      {/* Add event button */}
      <button type="submit" onClick={handleAddEvent}>
        Add Event
      </button>
      {/* Cancel button */}
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default AddEventForm;
