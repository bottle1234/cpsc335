import React, { useState, useEffect } from "react";
import "../styles/listings.css";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  rating?: number;
  reviews?: number;
}

const ListingsPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/listings/");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading listings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="listings-grid">
      {listings.map((listing) => (
        <div key={listing.id} className="listing-card">
          <img
            src={listing.image || "/default-image.jpg"}
            alt={listing.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-image.jpg";
            }}
          />
          <div className="listing-details">
            <h3>{listing.title}</h3>
            <p>${listing.price} night</p>
            <div className="rating">
              <span>★ {listing.rating || 5}</span>
              <span>({listing.reviews || 0})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingsPage;
