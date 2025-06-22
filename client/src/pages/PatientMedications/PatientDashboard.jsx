import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/global.css";

const PatientDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState({});

  const handleStatusChange = (value) => {
    setStatus((prev) => ({ ...prev, [date.toDateString()]: value }));
  };

  const tileContent = ({ date }) => {
    const key = date.toDateString();
    if (status[key] === "taken") {
      return <div className="dot green" />;
    } else if (status[key] === "not-taken") {
      return <div className="dot red" />;
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <div className="status-box">
        <h2>Today Status</h2>
        <p><strong>Date:</strong> {date.toDateString()}</p>
        <p><strong>Medication:</strong> Dolo 650mg</p>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="taken"
              checked={status[date.toDateString()] === "taken"}
              onChange={() => handleStatusChange("taken")}
            />
            Taken
          </label>
          <label>
            <input
              type="radio"
              value="not-taken"
              checked={status[date.toDateString()] === "not-taken"}
              onChange={() => handleStatusChange("not-taken")}
            />
            Not Taken
          </label>
        </div>
      </div>

      <div className="calendar-wrapper">
        <Calendar onChange={setDate} value={date} tileContent={tileContent} />
      </div>
    </div>
  );
};

export default PatientDashboard;
