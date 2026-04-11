import { NavLink } from "react-router-dom";
import "../styles/admin.css";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">

      <h2 className="admin-logo"><span>CREATION</span> POINT</h2>

      <ul className="admin-menu">

        <li>
          <NavLink to="/admin/dashboard">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/upload">
            Upload Tiles
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/gallery">
            Gallery Manager
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/users">
            Users
          </NavLink>
        </li>


      </ul>

    </div>
  );
}

export default AdminSidebar;