import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/listings.css";

interface Listing {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  location: string;
  rating?: number;
  bedrooms?: number;
  bathrooms?: number;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "1",
      title: "Cozy Cabin in the Woods",
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/615f0e0c67cbd55a7753a1cd/534ae1b5-e83f-48f4-9858-94432d68b92f/IMG_2285.JPG",
      price: 120,
      description: "A quiet retreat with a wood-burning fireplace.",
      location: "Aspen, CO",
      rating: 4.8,
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: "2",
      title: "Modern Downtown Loft",
      imageUrl:
        "https://onekindesign.com/wp-content/uploads/2022/08/Industrial-Warehouse-Loft-Knock-Architecture-Design-30-1-Kindesign.jpg",
      price: 200,
      description: "2-bedroom loft in the heart of the city.",
      location: "New York, NY",
      rating: 4.9,
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      id: "3",
      title: "Beachfront Villa",
      imageUrl:
        "https://cdn.listingphotos.sierrastatic.com/pics2x/v1738173804/10/10_25489979_01.jpg",
      price: 350,
      description: "Luxury villa with private beach access.",
      location: "Miami, FL",
      rating: 4.7,
      bedrooms: 4,
      bathrooms: 3,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newListing, setNewListing] = useState<Omit<Listing, "id">>({
    title: "",
    imageUrl: "",
    price: 0,
    description: "",
    location: "",
    bedrooms: 1,
    bathrooms: 1,
  });

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Filter listings with all criteria
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      listing.description
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "" ||
      listing.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesPrice =
      listing.price >= priceRange[0] && listing.price <= priceRange[1];
    const matchesRating = listing.rating
      ? listing.rating >= ratingFilter
      : true;

    return matchesSearch && matchesLocation && matchesPrice && matchesRating;
  });

  const handleDelete = (id: string) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  const handleEdit = (listing: Listing) => {
    setEditingId(listing.id);
    setNewListing({
      title: listing.title,
      imageUrl: listing.imageUrl,
      price: listing.price,
      description: listing.description,
      location: listing.location,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
    });
  };

  const handleSave = () => {
    // Validate required fields
    if (
      !newListing.title ||
      !newListing.imageUrl ||
      !newListing.location ||
      newListing.price <= 0
    ) {
      alert(
        "Please fill in all required fields (Title, Image URL, Location, and Price)"
      );
      return;
    }

    if (editingId === "new") {
      // Add new listing
      const newId = generateUniqueId();
      const newListingWithId = {
        ...newListing,
        id: newId,
        rating: newListing.rating || 0, // Default rating if not provided
      };
      setListings([...listings, newListingWithId]);
    } else if (editingId) {
      // Edit existing listing
      setListings(
        listings.map((listing) =>
          listing.id === editingId ? { ...newListing, id: editingId } : listing
        )
      );
    }

    // Reset form
    setEditingId(null);
    setNewListing({
      title: "",
      imageUrl: "",
      price: 0,
      description: "",
      location: "",
      bedrooms: 1,
      bathrooms: 1,
    });
  };

  const generateUniqueId = () => {
    // Simple incrementing ID based on existing listings
    const maxId = Math.max(
      ...listings.map((listing) => parseInt(listing.id) || 0)
    );
    return (maxId + 1).toString();
  };

  return (
    <div className="listings-page">
      <div className="listings-controls">
        <h2>Manage Listings</h2>
        <div className="search-filters">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>

          <div className="filter-group">
            <input
              type="text"
              placeholder="Filter by location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>Price Range:</label>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
              />
              <span>
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
          </div>

          <div className="filter-group">
            <label>Minimum Rating:</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= ratingFilter ? "star filled" : "star"}
                  onClick={() => setRatingFilter(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button
            className="add-listing-btn"
            onClick={() => setEditingId("new")}
          >
            + Add New Listing
          </button>
        </div>
      </div>

      {editingId && (
        <div className="listing-form">
          <h3>{editingId === "new" ? "Add New" : "Edit"} Listing</h3>
          <input
            type="text"
            placeholder="Title"
            value={newListing.title}
            onChange={(e) =>
              setNewListing({ ...newListing, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newListing.imageUrl}
            onChange={(e) =>
              setNewListing({ ...newListing, imageUrl: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newListing.price}
            onChange={(e) =>
              setNewListing({ ...newListing, price: Number(e.target.value) })
            }
          />
          <input
            type="text"
            placeholder="Location"
            value={newListing.location}
            onChange={(e) =>
              setNewListing({ ...newListing, location: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={newListing.description}
            onChange={(e) =>
              setNewListing({ ...newListing, description: e.target.value })
            }
          />
          <div className="form-row">
            <div>
              <label>Bedrooms</label>
              <input
                type="number"
                min="1"
                value={newListing.bedrooms}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    bedrooms: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label>Bathrooms</label>
              <input
                type="number"
                min="1"
                step="0.5"
                value={newListing.bathrooms}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    bathrooms: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className="form-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="listings-grid">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <div className="listing-image-container">
                <img
                  src={listing.imageUrl || "/default-image.jpg"}
                  alt={listing.title}
                  className="listing-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/default-image.jpg";
                  }}
                />
                <div className="listing-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(listing)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(listing.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="listing-details">
                <h3>{listing.title}</h3>
                <p className="location">{listing.location}</p>
                <p className="price">
                  ${listing.price} <span>night</span>
                </p>
                <div className="listing-meta">
                  <span>{listing.bedrooms} beds</span>
                  <span>{listing.bathrooms} baths</span>
                </div>
                {listing.rating && (
                  <div className="rating">★ {listing.rating.toFixed(1)}</div>
                )}
              </div>
              <Link
                to={`/bookings/${listing.id}`}
                state={{ listing }} // This passes the entire listing object
                className="book-now-link"
              >
                Book Now
              </Link>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No listings found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("");
                setPriceRange([0, 1000]);
                setRatingFilter(0);
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
