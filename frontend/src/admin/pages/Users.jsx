import { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import "../styles/admin.css";

function Users() {
  const [users, setUsers] = useState([]);

  // 🔥 FETCH USERS FROM BACKEND
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.users);
      setUsers(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ❌ DELETE USER (Backend से भी delete करना चाहिए)
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.users}/${id}`);
      fetchUsers(); // refresh list
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">

        <AdminHeader />

        <h2 className="page-title">Users</h2>

        <table className="users-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user, index) => (
              <tr key={user._id}>

                <td data-label="ID">{index + 1}</td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">{user.role}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Users;