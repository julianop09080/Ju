import React, { useState, useEffect } from "react";
import { auth, db, storage } from "./firebase-config";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setAvatarURL(data.avatar || "");
        }
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) return;

    let imageURL = avatarURL;
    if (avatar) {
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, avatar);
      imageURL = await getDownloadURL(storageRef);
    }

    await updateProfile(user, { displayName: name, photoURL: imageURL });
    await setDoc(doc(db, "users", user.uid), { name, avatar: imageURL }, { merge: true });

    setLoading(false);
    navigate("/Profile"); // Redirect back to profile page
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {avatarURL && <img src={avatarURL} alt="Profile Preview" className="profile-img" />}
      <button onClick={handleSave} className="btn save" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfile;
