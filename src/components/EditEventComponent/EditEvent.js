import React, { useState } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import moment from 'moment-timezone';
import '../AddEventFormComponent/AddEventForm.css';

moment.tz.setDefault('Europe/Stockholm');
const EditEvent = ({ event, onClose, onEventUpdated }) => {
  const [title, setTitle] = useState(event.title);
  const [startDate, setStartDate] = useState(moment(event.start).format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState(moment(event.start).format("HH:mm"));
  const [endDate, setEndDate] = useState(moment(event.end).format("YYYY-MM-DD"));
  const [endTime, setEndTime] = useState(moment(event.end).format("HH:mm"));
  const [content, setContent] = useState(event.content || "");
  const [location, setLocation] = useState(event.location || "");
  const [attendeeName, setAttendeeName] = useState("");
  const [attendees, setAttendees] = useState(event.attendees || []);
  const [travelTime, setTravelTime] = useState(event.travelTime || "");
  const [isAllDay, setIsAllDay] = useState(event.isAllDay || false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = isAllDay 
      ? moment(startDate).startOf('day')
      : moment(`${startDate} ${startTime}`);
    const end = isAllDay 
      ? moment(endDate).endOf('day')
      : moment(`${endDate} ${endTime}`);

    if (end < start) {
      alert('End time must be after start time');
      return;
    }

    const updatedEvent = {
      ...event,
      title,
      content,
      location,
      attendees,
      travelTime,
      start: start.toDate(),
      end: end.toDate(),
      isAllDay
    };

    try {
      const firestoreEvent = {
        ...updatedEvent,
        start: Timestamp.fromDate(start.toDate()),
        end: Timestamp.fromDate(end.toDate()),
      };
      const eventRef = doc(db, 'events', event.id);
      await updateDoc(eventRef, firestoreEvent);
      onEventUpdated(updatedEvent);
      onClose();
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-event-form">

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="full-width"
      />

      <div className="all-day-checkbox">
        <label>
          <input
            type="checkbox"
            checked={isAllDay}
            onChange={(e) => {
              setIsAllDay(e.target.checked);
              if (e.target.checked) {
                setStartTime("00:00");
                setEndTime("23:59");
              }
            }}
          />
          All-Day Event
        </label>
      </div>

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
            disabled={isAllDay}
            required={!isAllDay}
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
            disabled={isAllDay}
            required={!isAllDay}
          />
        </div>
      </div>

      <textarea
        placeholder="Content (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="full-width"
      />

      <input
        type="text"
        placeholder="Location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="full-width"
      />

      <label>
        <strong>Attendees</strong>
      </label>

      {attendees.map((attendee, index) => (
        <div key={index} className="attendee-item">
          {"• " + attendee}
          <button
            type="button"
            className="remove-attendee-button"
            onClick={() => setAttendees(attendees.filter((_, i) => i !== index))}
          >
            ×
          </button>
        </div>
      ))}

      <div className="attendee-row">
        <input
          type="text"
          placeholder="Attendees (optional)"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
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
          +
        </button>
      </div>

      <input
        type="text"
        placeholder="Travel Time (optional)"
        value={travelTime}
        onChange={(e) => setTravelTime(e.target.value)}
        className="full-width"
      />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditEvent;