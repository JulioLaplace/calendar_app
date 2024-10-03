import React, { useState, useCallback, useEffect } from "react";
import { addNewEventToFirestore } from "../../Services/eventService";
import moment from "moment";

function AddEventForm({ onAddEvent, onClose, initialStart, initialEnd }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(initialStart || "");
  const [end, setEnd] = useState(initialEnd || "");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setStart(initialStart || "");
    setEnd(initialEnd || "");
  }, [initialStart, initialEnd]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (moment(end).isBefore(moment(start))) {
        setError("End time cannot be earlier than start time");
        return;
      }
      onAddEvent({
        title,
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        content,
      });
      onClose();
    },
    [title, start, end, content, onAddEvent, onClose]
  );

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setError("");
    onClose();
  };

  const handleAddEvent = async () => {
    const event = {
      title,
      start: moment(start).toDate(),
      end: moment(end).toDate(),
      content,
    };
    await addNewEventToFirestore(event);
  };

  return (
    <form onSubmit={handleSubmit} className="add-event-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
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
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit" onClick={handleAddEvent}>
        Add Event
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default AddEventForm;
