import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PaymentPage from "./paymentPage";
import "../styles/bookings.css";

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  location: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
}

const BookingPage: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [showPayment, setShowPayment] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Get listing data from navigation state
  const listing = location.state?.listing as Listing;

  // Calculate total price when dates change
  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const days = Math.ceil(
        (new Date(bookingData.checkOut).getTime() -
          new Date(bookingData.checkIn).getTime()) /
          (1000 * 3600 * 24)
      );
      setTotalPrice(days * listing.price);
    }
  }, [bookingData.checkIn, bookingData.checkOut, listing.price]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: name === "guests" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    setShowPayment(true);
  };

  if (!listing) {
    return (
      <div className="booking-page">
        <h2>Listing not found</h2>
        <button onClick={() => navigate("/ShowListings")}>
          Back to Listings
        </button>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {showPayment ? (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <button
              className="close-payment"
              onClick={() => setShowPayment(false)}
            >
              ×
            </button>
            <PaymentPage
              totalAmount={totalPrice}
              onSuccess={() =>
                navigate("/bookings/confirmation", {
                  state: { listing, bookingData, totalPrice },
                })
              }
            />
          </div>
        </div>
      ) : (
        <div className="booking-container">
          <div className="booking-header">
            <h2>Book {listing.title}</h2>
            <p>{listing.location}</p>
            {/* Add this paragraph for the description */}
            <p className="listing-description">{listing.description}</p>
          </div>
          <div className="booking-details">
            <img src={listing.imageUrl} alt={listing.title} />
            <div className="price-info">
              <p>
                ${listing.price} <span>per night</span>
              </p>
              {listing.bedrooms && <p>{listing.bedrooms} bedrooms</p>}
              {listing.bathrooms && <p>{listing.bathrooms} bathrooms</p>}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                name="checkIn"
                value={bookingData.checkIn}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                value={bookingData.checkOut}
                onChange={handleInputChange}
                min={
                  bookingData.checkIn || new Date().toISOString().split("T")[0]
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                name="guests"
                min="1"
                max="10"
                value={bookingData.guests}
                onChange={handleInputChange}
                required
              />
            </div>

            {totalPrice > 0 && (
              <div className="price-summary">
                <h3>Price Summary</h3>
                <p>
                  ${listing.price} x{" "}
                  {Math.ceil(
                    (new Date(bookingData.checkOut).getTime() -
                      new Date(bookingData.checkIn).getTime()) /
                      (1000 * 3600 * 24)
                  )}{" "}
                  nights
                </p>
                <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>
              </div>
            )}

            <button type="submit" className="book-now-btn">
              Continue to Payment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
