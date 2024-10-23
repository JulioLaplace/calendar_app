import React, { useState } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import  moment from 'moment-timezone';
import './EditEvent.css';

//set default timezone
const TIMEZONE = 'Europe/Stockholm'

const EditEvent = ({ event, onClose, onEventUpdated }) => {
  const [title, setTitle] = useState(event.title);
  const [content, setContent] = useState(event.content);
  const [location, setLocation] = useState(event.location);
  const [attendees, setAttendees] = useState(event.attendees ? event.attendees.join(', ') : '');
  const [travelTime, setTravelTime] = useState(event.travelTime);
  const [start, setStart] = useState(formatDateForInput(event.start));
  const [end, setEnd] = useState(formatDateForInput(event.end));

  function formatDateForInput(date) {
    if (date instanceof Date) {
      return moment(date).tz(TIMEZONE).format('YYYY-MM-DDTHH:mm');
    } else if (date instanceof Timestamp) {
      return moment(date.toDate()).tz(TIMEZONE).format('YYYY-MM-DDTHH:mm');
    } else if (typeof date === 'string') {
      return moment(date).tz(TIMEZONE).format('YYYY-MM-DDTHH:mm');
    }
    return '';
  }

  function parseInputDate(dateString) {
    return moment.tz(dateString,TIMEZONE).toDate();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = parseInputDate(start);
    const endDate = parseInputDate(end);

    if(endDate < startDate){
      alert('End time must be after start time');
      return;
    }
    
    const updatedEvent = {
      ...event,
      title: title || '',
      content: content || '',
      location: location || '',
      attendees: attendees ? attendees.split(',').map(attendee => attendee.trim()) : [],
      travelTime: travelTime ? Number(travelTime) : null,
      start: startDate,
      end: endDate,
    };

    try {
      //set up a new object for Firestore, including Timestamp 
      const firestoreEvent ={
        ...updatedEvent,
        start: Timestamp.fromDate(startDate),
        end: Timestamp.fromDate(endDate),
      }
      const eventRef = doc(db, 'events', event.id);
      await updateDoc(eventRef, firestoreEvent);
      onEventUpdated(updatedEvent);
      onClose();
    } catch (error){
      console.error("Error updating event: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-event-form">
      <h2>Edit Event</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Event Content"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="text"
        value={attendees}
        onChange={(e) => setAttendees(e.target.value)}
        placeholder="Attendees (comma-separated)"
      />
      <input
        type="number"
        value={travelTime}
        onChange={(e) => setTravelTime(e.target.value)}
        placeholder="Travel Time (minutes)"
      />
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      />
      <div className="button-group">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default EditEvent;