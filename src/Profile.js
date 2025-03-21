import React, { useState, useEffect } from "react";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Profile.css"; // Import styles

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for user authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h2>Welcome, {user.displayName || "User"}!</h2>
          <p>Email: {user.email}</p>
          <Link to="/edit-profile" className="btn edit">Edit Profile</Link>
          <button onClick={handleLogout} className="btn logout">Logout</button>
        </>
      ) : (
        <p>Please <a href="/login">log in</a> to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
