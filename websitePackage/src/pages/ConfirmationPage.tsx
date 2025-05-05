import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/confirmation.css";

const ConfirmationPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/ShowListings");
    return null;
  }

  const { listing, bookingData, totalPrice } = state;

  return (
    <div className="confirmation-page">
      <h2>Booking Confirmed!</h2>
      <div className="confirmation-details">
        <h3>{listing.title}</h3>
        <p>{listing.location}</p>
        <img src={listing.imageUrl} alt={listing.title} />

        <div className="booking-dates">
          <p>Check-in: {new Date(bookingData.checkIn).toLocaleDateString()}</p>
          <p>
            Check-out: {new Date(bookingData.checkOut).toLocaleDateString()}
          </p>
          <p>Guests: {bookingData.guests}</p>
        </div>

        <div className="price-summary">
          <p>Total Paid: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <button onClick={() => navigate("/ShowListings")}>
        Back to Listings
      </button>
    </div>
  );
};

export default ConfirmationPage;
