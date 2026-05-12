import "../auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../config/api";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        API_ENDPOINTS.login,
        { email, password },
        { withCredentials: true }
      );

      const user = res.data.user;

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 IMPORTANT: trigger navbar update
      window.dispatchEvent(new Event("storage"));

      setMessage(res.data.message);
      alert(res.data.message);

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }

      // ✅ Redirect to HOME (as per your requirement)
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      const msg = error.response?.data?.message || "Invalid login ❌";
      setMessage(msg);
      console.log(error);
      alert(msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-logo">
          <span>CREATION</span> POINT
        </div>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

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

          <button type="submit" className="auth-btn">
            Login
          </button>

        </form>

        <p>{message}</p>

        <div className="auth-switch">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;