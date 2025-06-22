import React from "react";

const formatDate = (date) => {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const MedicationCalendar = ({ medications = [] }) => {
  const today = new Date();
  const yesterday = new Date(today);
  const tomorrow = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  const getMedsForDay = (dayLabel) => {
    // This is placeholder logic for demonstration.
    // You can update it to match date-specific meds.
    return medications.length > 0 ? medications : [];
  };

  return (
    <div className="calendar-container" style={{ marginTop: "2rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>Medication Calendar</h3>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* Yesterday */}
        <div
          style={{
            flex: "1",
            minWidth: "200px",
            background: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h4>Yesterday ({formatDate(yesterday)})</h4>
          <ul>
            {getMedsForDay("yesterday").map((med, index) => (
              <li key={index}>
                {med.name} – {med.dosage} – {med.frequency}
              </li>
            ))}
          </ul>
        </div>

        {/* Today */}
        <div
          style={{
            flex: "1",
            minWidth: "200px",
            background: "#e3f2fd",
            border: "1px solid #90caf9",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h4>Today ({formatDate(today)})</h4>
          <ul>
            {getMedsForDay("today").map((med, index) => (
              <li key={index}>
                {med.name} – {med.dosage} – {med.frequency}
              </li>
            ))}
          </ul>
        </div>

        {/* Tomorrow */}
        <div
          style={{
            flex: "1",
            minWidth: "200px",
            background: "#f1f8e9",
            border: "1px solid #aed581",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h4>Tomorrow ({formatDate(tomorrow)})</h4>
          <ul>
            {getMedsForDay("tomorrow").map((med, index) => (
              <li key={index}>
                {med.name} – {med.dosage} – {med.frequency}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedicationCalendar;
