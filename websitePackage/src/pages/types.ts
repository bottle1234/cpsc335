export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  type: string;
  beds: number;
  baths: number;
  amenities: string[];
  location: {
    city: string;
    country: string;
  };
  host: string;
  superhost: boolean;
  dates: string;
}
