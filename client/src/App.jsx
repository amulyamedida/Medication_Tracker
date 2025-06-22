import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Medications from './pages/Medications/Medications';
import CaretakerDashboard from './pages/CaretakerDashboard/CaretakerDashboard';
import PatientDashboard from './pages/PatientMedications/PatientDashboard';

import './styles/global.css'; 
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/caretaker-dashboard" element={<CaretakerDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
