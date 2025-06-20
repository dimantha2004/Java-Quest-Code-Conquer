import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Kingdoms from './pages/Kingdoms';
import KingdomDetail from './pages/KingdomDetail';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kingdoms" element={<Kingdoms />} />
          <Route path="kingdoms/:kingdomId" element={<KingdomDetail />} />
          <Route path="kingdoms/:kingdomId/lessons/:lessonId" element={<Lesson />} />
          <Route path="profile" element={<Profile />} />
          <Route path="achievements" element={<Achievements />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;