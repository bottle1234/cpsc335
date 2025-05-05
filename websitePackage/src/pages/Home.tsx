import React from "react";
import "../styles/Home.css";
import banner from "../assets/banner.jpg";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <img src={banner} alt="Company Banner" className="hero-image" />
        <div className="hero-content">
          <h1 className="hero-title">More Than a Stay – An Experience</h1>
          <NavLink to="/ShowListings" className="hero-button">
            View Listings
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
