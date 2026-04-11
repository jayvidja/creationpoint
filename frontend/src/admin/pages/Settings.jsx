// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminSidebar from "../components/AdminSidebar";
// import AdminHeader from "../components/AdminHeader";
// import "../styles/admin.css";

// function Settings() {
//     const navigate = useNavigate();

// useEffect(() => {

// const isAdmin = localStorage.getItem("adminAuth");

// if (!isAdmin) {
// navigate("/admin-login");
// }

// }, []);

//   return (

    
//     <div className="admin-layout">

//       <AdminSidebar />

//       <div className="admin-main">

//         <AdminHeader />

//         <h2 className="page-title">Settings</h2>

//         <div className="admin-card">

//           <div className="form-group">
//             <label>Website Name</label>
//             <input type="text" placeholder="Enter website name" />
//           </div>

//           <div className="form-group">
//             <label>Admin Email</label>
//             <input type="email" placeholder="Enter admin email" />
//           </div>

//           <div className="form-group">
//             <label>Change Password</label>
//             <input type="password" placeholder="New password" />
//           </div>

//           <button className="upload-btn">
//             Save Settings
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Settings;