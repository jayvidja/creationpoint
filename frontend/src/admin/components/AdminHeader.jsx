import { useNavigate } from "react-router-dom";
import axios from "axios"; // 🔥 IMPORTANT (missing था)

function AdminHeader() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout clicked"); // ✅ debug

    try {
      await axios.post(
        "http://localhost:3000/api/users/logout",
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