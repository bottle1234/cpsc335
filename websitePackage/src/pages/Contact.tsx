// src/pages/Contact.tsx
import React from "react";
//import "./Contact.css";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-info">
        <h2>Get in Touch</h2>

        <div className="contact-method">
          <i className="fas fa-envelope"></i>
          <div>
            <h3>Email</h3>
            <p>Support@staybnb.com</p>
          </div>
        </div>

        <div className="contact-method">
          <i className="fas fa-phone"></i>
          <div>
            <h3>Phone</h3>
            <p>(123) 456-7890</p>
          </div>
        </div>

        <div className="contact-method">
          <i className="fas fa-map-marker-alt"></i>
          <div>
            <h3>Address</h3>
            <p>123 Main Street</p>
            <p>San Francisco, CA 12345</p>
            <p>Country</p>
          </div>
        </div>

        <div className="business-hours">
          <h3>Business Hours</h3>
          <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
          <p>Saturday: 10:00 AM - 2:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
