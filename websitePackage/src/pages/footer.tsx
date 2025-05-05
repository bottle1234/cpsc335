import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/App.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <NavLink to="/" className="footer-logo">
            StayBnb
          </NavLink>
          <p className="footer-tagline">
            Find your perfect stay, anywhere in the world.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3 className="footer-heading">Navigation</h3>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/ShowListings">Listings</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Legal</h3>
            <ul>
              <li>
                <NavLink to="/">Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to="/">Terms of Service</NavLink>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Connect</h3>
            <ul>
              <li>
                <a href="https://facebook.com">Facebook</a>
              </li>
              <li>
                <a href="https://instagram.com">Instagram</a>
              </li>
              <li>
                <a href="https://twitter.com">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StayBnb. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
