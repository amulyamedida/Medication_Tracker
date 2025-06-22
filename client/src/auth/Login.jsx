import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('user'));
    if (saved?.email === loginData.email && saved?.password === loginData.password) {
      navigate('/medications');
    } else {
      alert('Invalid login');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
        <input type="password" placeholder="Password" required onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
