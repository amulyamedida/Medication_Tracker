import React from "react";

const MedicationTimeline = ({ meds, setMeds }) => {
  const toggleTaken = (index) => {
    const updated = [...meds];
    updated[index].taken = !updated[index].taken;
    setMeds(updated);
  };

  return (
    <div className="medication-timeline">
      <h3>Today's Medication</h3>
      {meds.map((med, index) => (
        <div key={index} className="med-item">
          <span>{med.time}</span>
          <button onClick={() => toggleTaken(index)}>
            {med.taken ? "✅ Taken" : "❌ Not Taken"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MedicationTimeline;
