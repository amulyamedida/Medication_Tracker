import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PatientDashboard from '../PatientMedications/PatientDashboard';
import CaretakerDashboard from '../CaretakerDashboard/CaretakerDashboard';
import '../../styles/global.css';

const Medications = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const role = query.get('role');

  const goPatient = () => {
    if (!user || !user.email) return alert('⚠️ Please signup or login first!');
    navigate('/patient');
  };

  const goCaretaker = () => {
    if (!user || !user.email) return alert('⚠️ Please signup or login first!');
    navigate('/caretaker-dashboard');
  };

  if (role === 'patient') return <PatientDashboard />;
  if (role === 'caretaker') return <CaretakerDashboard />;

  return (
    <div className="medications-container">
      <h2>Welcome{user && user.name ? `, ${user.name}` : ''}</h2>
      <div className="card-wrapper">
        <div className="role-card shadow">
          <h3>I'm a Patient</h3>
          <ul>
            <li>Track your medication schedule and maintain your health records</li>
            <li>Mark medications as taken</li>
            <li>Upload proof photos (optional)</li>
            <li>View your medication calendar</li>
            <li>Large, easy-to-use interface</li>
          </ul>
          <button onClick={goPatient} className="role-button">Continue as Patient</button>
        </div>

        <div className="role-card shadow">
          <h3>I'm a Caretaker</h3>
          <ul>
            <li>Monitor and support your loved one's medication adherence</li>
            <li>Monitor medication compliance</li>
            <li>Set up notification preferences</li>
            <li>View detailed reports</li>
            <li>Receive email alerts</li>
          </ul>
          <button onClick={goCaretaker} className="role-button">Continue as Caretaker</button>
        </div>
      </div>
    </div>
  );
};

export default Medications;
