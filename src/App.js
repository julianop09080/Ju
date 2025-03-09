import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./components/Homepage";
import PersonalityTest from './components/PersonalityTest';
import HobbyRecommendations from './components/HobbyRecommendations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/test" element={<PersonalityTest />} />
        <Route path="/hobby-recommendations" element={<HobbyRecommendations />} />
      </Routes>
    </Router>
  );
}

export default App;