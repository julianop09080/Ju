import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PersonalityTest from './components/PersonalityTest';
import HobbyRecommendations from './components/HobbyRecommendations';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personality-test" element={<PersonalityTest />} />
        <Route path="/hobby-recommendations" element={<HobbyRecommendations />} />
    </Routes>
  );
}

export default App;