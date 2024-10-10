import React, { useState, useCallback, useEffect } from "react";
import { addNewEventToFirestore } from "../../Services/eventService";
import moment from "moment";
import './AddEventForm.css';

function AddEventForm({ onAddEvent, onClose, initialStart, initialEnd }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(initialStart ? moment(initialStart).format("YYYY-MM-DD") : "");
  const [startTime, setStartTime] = useState(initialStart ? moment(initialStart).format("HH:mm") : "");
  const [endDate, setEndDate] = useState(initialEnd ? moment(initialEnd).format("YYYY-MM-DD") : "");
  const [endTime, setEndTime] = useState(initialEnd ? moment(initialEnd).format("HH:mm") : "");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

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
      });
      onClose();
    },
    [title, startDate, startTime, endDate, endTime, content, onAddEvent, onClose]
  );

  const handleCancel = () => {
    setTitle("");
    setContent("");
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

            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="full-width" // Added class for full-width styling
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
