import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../config/api";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          API_ENDPOINTS.profile,
          { withCredentials: true }
        );

        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          window.location.href = "/login";
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await axios.post(
      API_ENDPOINTS.logout,
      {},
      { withCredentials: true }
    );

    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-header">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2>{user?.name}</h2>
          <p className="role">{user?.role}</p>
        </div>

        <div className="profile-info">
          <div className="info-box">
            <span>Email</span>
            <p>{user?.email}</p>
          </div>

          <div className="info-box">
            <span>User ID</span>
            <p>{user?.id}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;