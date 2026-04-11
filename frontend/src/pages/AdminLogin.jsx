import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminLogin.css";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save login state
    localStorage.setItem("adminAuth", "true");

    navigate("/admin/dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Admin Login
          </button>

        </form>

        <div className="switch-link">
          <p>
            Back to User Login? <Link to="/login">Login here</Link>
          </p>
        </div>

      </div>

    </div>
  );
}