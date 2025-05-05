import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiPlus, FiMinus } from "react-icons/fi";
import "../styles/AddListing.css";

const AddListing: React.FC = () => {
  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: 0,
    type: "Apartment",
    beds: 1,
    baths: 1,
    amenities: [] as string[],
    location: {
      address: "",
      city: "",
      country: "",
    },
    images: [] as File[],
  });

  const [currentAmenity, setCurrentAmenity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const propertyTypes = [
    "Apartment",
    "House",
    "Villa",
    "Cabin",
    "Studio",
    "Loft",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const locationField = name.split(".")[1];
      setListing((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else {
      setListing((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "beds" || name === "baths"
            ? parseFloat(value) || 0
            : value,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setListing((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const handleAddAmenity = () => {
    if (currentAmenity.trim() && !listing.amenities.includes(currentAmenity)) {
      setListing((prev) => ({
        ...prev,
        amenities: [...prev.amenities, currentAmenity],
      }));
      setCurrentAmenity("");
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setListing((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Submitting listing:", listing);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/host/listings");
    } catch (error) {
      console.error("Error submitting listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-listing-container">
      <div className="add-listing-card">
        <h2 className="add-listing-title">Create a New Listing</h2>

        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            <div className="form-group">
              <label htmlFor="title">Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={listing.title}
                onChange={handleInputChange}
                required
                placeholder="Beautiful apartment in downtown"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={listing.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Describe your property in detail..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Property Type*</label>
                <select
                  id="type"
                  name="type"
                  value={listing.type}
                  onChange={handleInputChange}
                  required
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Price per night ($)*</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={listing.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="1"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="beds">Bedrooms*</label>
                <input
                  type="number"
                  id="beds"
                  name="beds"
                  value={listing.beds}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="baths">Bathrooms*</label>
                <input
                  type="number"
                  id="baths"
                  name="baths"
                  value={listing.baths}
                  onChange={handleInputChange}
                  required
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="form-section">
            <h3 className="section-title">Location</h3>
            <div className="form-group">
              <label htmlFor="address">Street Address*</label>
              <input
                type="text"
                id="address"
                name="location.address"
                value={listing.location.address}
                onChange={handleInputChange}
                required
                placeholder="123 Main St"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City*</label>
                <input
                  type="text"
                  id="city"
                  name="location.city"
                  value={listing.location.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country*</label>
                <input
                  type="text"
                  id="country"
                  name="location.country"
                  value={listing.location.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="form-section">
            <h3 className="section-title">Amenities</h3>
            <div className="amenities-input">
              <input
                type="text"
                value={currentAmenity}
                onChange={(e) => setCurrentAmenity(e.target.value)}
                placeholder="Add amenities (WiFi, Kitchen, etc.)"
                onKeyPress={(e) => e.key === "Enter" && handleAddAmenity()}
              />
              <button
                type="button"
                className="add-amenity-btn"
                onClick={handleAddAmenity}
              >
                <FiPlus />
              </button>
            </div>

            <div className="amenities-list">
              {listing.amenities.map((amenity) => (
                <span key={amenity} className="amenity-tag">
                  {amenity}
                  <button
                    type="button"
                    className="remove-amenity"
                    onClick={() => handleRemoveAmenity(amenity)}
                  >
                    <FiMinus size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images Section */}
          <div className="form-section">
            <h3 className="section-title">Images</h3>
            <div className="image-upload-container">
              <label htmlFor="images" className="image-upload-label">
                <FiUpload size={24} />
                <span>Upload Images (Minimum 5)</span>
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>

              <div className="image-preview-grid">
                {listing.images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() =>
                        setListing((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index),
                        }))
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="submit-listing-btn"
            disabled={isSubmitting || listing.images.length < 5}
          >
            {isSubmitting ? "Publishing..." : "Publish Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
