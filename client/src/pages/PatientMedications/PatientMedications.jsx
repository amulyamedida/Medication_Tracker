import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import '../../styles/global.css';

function PatientMedications() {
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchMeds() {
      try {
        const res = await axios.get(`/medications/${user.id}`);
        setMeds(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMeds();
  }, [user.id]);

  const markAsTaken = async (id) => {
    try {
      await axios.post('/medications/mark-taken', { userId: user.id, medicationId: id });
      const res = await axios.get(`/medications/${user.id}`);
      setMeds(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const adherence = meds.length
    ? `${Math.round((meds.filter(m => m.taken).length / meds.length) * 100)}%`
    : '0%';

  if (loading) return <p>Loading medications...</p>;

  return (
    <div className="medication-container">
      <h2>Your Medications</h2>
      <p>Adherence: {adherence}</p>
      {meds.length === 0 ? (
        <p>No medications assigned.</p>
      ) : (
        <ul>
          {meds.map(m => (
            <li key={m.id} className="med-item">
              <span><strong>{m.name}</strong> - {m.dosage} - {m.frequency}</span>
              {m.taken ? (
                <span>✅ Taken</span>
              ) : (
                <button onClick={() => markAsTaken(m.id)} className="button-small">
                  Mark as Taken
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientMedications;
