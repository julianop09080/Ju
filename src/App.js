import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from "./components/Homepage";
import DonationPage from "./DonationPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import PersonalityTest from './components/PersonalityTest';
import HobbyRecommendations from './components/HobbyRecommendations';

function App() {
  return (
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/test" element={<PersonalityTest />} />
        <Route path="/hobby-recommendations" element={<HobbyRecommendations />} />
      </Routes>
  );
}

export default App;
