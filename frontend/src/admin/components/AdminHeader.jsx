import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../config/api"; // use env-based backend URL

function AdminHeader() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout clicked"); // ✅ debug

    try {
      await axios.post(
        API_ENDPOINTS.logout,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Logout API error:", error);
    }

    // ✅ always run
    localStorage.removeItem("user");

    // navbar update
    window.dispatchEvent(new Event("storage"));

    // 🔥 redirect
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-header">

      <h2>Admin Dashboard</h2>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

export default AdminHeader;