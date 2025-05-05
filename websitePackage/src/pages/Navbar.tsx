import { NavLink } from "react-router-dom";
import logo from "../assets/StaybnbWide.png";
import "../styles/navbar.css";

export default function Navbar() {
  // Example: Replace with your actual auth state
  const isLoggedIn = false; // Change this based on your auth logic
  const username = "JohnDoe"; // Fetch from your auth context

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/">
            <img src={logo} alt="Company Logo" className="navbar-logo" />
          </NavLink>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item-login">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "login-button active" : "login-button"
              }
            >
              {isLoggedIn ? username : "Login"}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
