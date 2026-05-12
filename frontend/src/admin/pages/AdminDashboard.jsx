import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import "../styles/admin.css";

function AdminDashboard() {

  const [totalImages, setTotalImages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // ✅ Users Count
      const usersRes = await axios.get(
        API_ENDPOINTS.usersCount,
        { withCredentials: true }
      );

      setTotalUsers(usersRes?.data?.totalUsers || 0);

      // ✅ Images Count (NEW)
      const imagesRes = await axios.get(
        API_ENDPOINTS.galleryCount
      );

      setTotalImages(imagesRes?.data?.totalImages || 0);

      setLoading(false);

    } catch (error) {
      console.log("Dashboard Error:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">

        <AdminHeader />

        <h2 className="page-title">Dashboard Overview</h2>

        {loading ? (
          <h3 style={{ textAlign: "center" }}>Loading...</h3>
        ) : (
          <div className="dashboard-grid">

            <div className="dashboard-card">
              <h3>Total Users</h3>
              <p>{totalUsers}</p>
            </div>

            <div className="dashboard-card">
              <h3>Total Images</h3>
              <p>{totalImages}</p>
            </div>

            <div className="dashboard-card">
              <h3>Gallery Items</h3>
              <p>{totalImages}</p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;