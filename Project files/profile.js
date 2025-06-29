import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userId, setUserId] = useState("");

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: token,
        },
      });

      setUserId(res.data.userId);
    } catch (err) {
      console.error("Unauthorized or error:", err);
      setUserId("Unauthorized or error fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      <p><strong>User ID:</strong> {userId}</p>
    </div>
  );
};

export default Profile;
