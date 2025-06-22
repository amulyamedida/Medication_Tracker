import React, { useState, useEffect } from 'react';
import '../../styles/global.css';

const CaretakerDashboard = () => {
  const [medications, setMedications] = useState([]);
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('caretakerMeds')) || [];
    setMedications(stored);
  }, []);

  const handleAddMedication = () => {
    if (!medicationName || !dosage || !frequency) {
      alert('Please fill in all fields');
      return;
    }

    const newMed = { name: medicationName, dosage, frequency };
    const updated = [...medications, newMed];
    setMedications(updated);
    localStorage.setItem('caretakerMeds', JSON.stringify(updated));

    setMedicationName('');
    setDosage('');
    setFrequency('');
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', padding: '20px', gap: '40px' }}>
      <div style={{ flex: 1 }}>
        <h2>Caretaker Dashboard</h2>
        <div className="medication-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Medication Name"
            value={medicationName}
            onChange={(e) => setMedicationName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
          <button onClick={handleAddMedication}>Add Medication</button>
        </div>
      </div>

      
      <div style={{ flex: 2 }}>
        <div className="medication-list">
          <h3>Added Medications</h3>
          {medications.length === 0 ? (
            <p>No medications added yet.</p>
          ) : (
            <ul>
              {medications.map((med, idx) => (
                <li key={idx}>
                  <strong>{med.name}</strong> – {med.dosage} – {med.frequency}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaretakerDashboard;
