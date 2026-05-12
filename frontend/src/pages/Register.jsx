import "../auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../config/api";

export default function Register({ onRegisterSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, confirm } = formData;

    // ✅ validation
    if (!name || !email || !password || !confirm) {
      alert("All fields are required");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        API_ENDPOINTS.register,
        { name, email, password }
      );

      alert("Registered Successfully ✅");

      // optional callback
      if (onRegisterSuccess) {
        onRegisterSuccess(res.data);
      }

      // ✅ auto redirect to login
      navigate("/login");

    } catch (err) {
      console.log("REGISTER ERROR:", err);

      alert(
        err.response?.data?.message || "Registration failed ❌"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-logo">
          <span>CREATION</span> POINT
        </div>

        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          <div className="auth-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="auth-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="auth-group">
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={formData.confirm}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>

        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}