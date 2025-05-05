import { Routes, Route, Link } from "react-router-dom";
import Contact from "./pages/Contact.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import "./styles/App.css";
import Navbar from "./pages/Navbar.js";
import PaymentPage from "./pages/paymentPage";
import Signup from "./pages/Signup.js";
import Footer from "./pages/footer.js";
import Listings from "./pages/Listings.js";
import BookingsPage from "./pages/BookingsPage.js";
import ConfirmationPage from "./pages/ConfirmationPage.js";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AuthRoute from "./pages/Authroute.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKNTVSW3HcPp-7_gs9aCtRO20I_IIvXtM",
  authDomain: "staybnb-82c17.firebaseapp.com",
  projectId: "staybnb-82c17",
  storageBucket: "staybnb-82c17.firebasestorage.app",
  messagingSenderId: "381870801317",
  appId: "1:381870801317:web:64bc12d27b2656b064284c",
  measurementId: "G-MY4XZEXY11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/" element={<Home />}>
          {" "}
        </Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/paymentPage" element={<PaymentPage />}></Route>
        <Route path="/ShowListings" element={<Listings />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/bookings/:listingId" element={<BookingsPage />} />
        <Route path="/bookings/confirmation" element={<ConfirmationPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
