import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Check login status (REAL-TIME)
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    checkLogin(); // first load

    // 🔥 important: listen changes
    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // ✅ Click handler
  const handleUserClick = () => {
    if (localStorage.getItem("user")) {
      navigate("/profile"); // already login
    } else {
      navigate("/login"); // not login
    }
  };

  return (
    <header className={`navbar ${scroll ? "scroll-bg" : ""}`}>

      <div className="logo">
        <span className="orange">CREATION </span>
        <span>POINT</span>
      </div>

      <nav className={`nav-links ${open ? "active" : ""}`}>

        <NavLink to="/" end className={({ isActive }) => (isActive ? "active-link" : "")}>
          Home
        </NavLink>

        <NavLink to="/collection" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Collection
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>
          About
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active-link" : "")}>
          Contact
        </NavLink>

      </nav>

      <div className="nav-icons">

        {/* ✅ Dynamic User Icon */}
        <i
          className={`fa-regular fa-user ${isLoggedIn ? "logged-in" : ""}`}
          onClick={handleUserClick}
          style={{ cursor: "pointer" }}
          title={isLoggedIn ? "Profile" : "Login"}
        ></i>

        <i
          className="fa-solid fa-bars menu-btn"
          onClick={() => setOpen(!open)}
        ></i>

      </div>

    </header>
  );
}