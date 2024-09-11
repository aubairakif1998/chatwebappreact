// src/routes.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import ChannelSelector from './components/ChannelSelector';
import { isAuthenticated } from './auth';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login"  element={isAuthenticated() ? <Navigate to="/channels" /> : <Login/>}/>
      <Route
        path="/channels"
        element={isAuthenticated() ? <ChannelSelector /> : <Navigate to="/login" />}
      />
      <Route
        path="/chat/:channelId"
        element={isAuthenticated() ? <Chat /> : <Navigate to="/login" />}
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default AppRoutes;
