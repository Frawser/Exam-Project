import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import LoggWorkout from './pages/LoggWorkout';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import MyProfile from './pages/MyProfile';
import LogoutButton from './components/common/LogoutButton';

import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/loggworkout" element={<LoggWorkout/>} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/logout" element={<LogoutButton />} />
      </Routes>
    </Router>
  );
}

export default App;
