import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import "../styles/signup.css";

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUpWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
        setError(error.message);
      });
  };

  const signUpWithEmail = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setAuthing(true);
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  return (
    <div className="signup-container">
      {/* Left side - Branding/Info */}
      <div className="signup-left">
        <h2>Join Our Community</h2>
        <p>
          Discover amazing properties and create your perfect travel
          experiences. Sign up to get started!
        </p>
      </div>

      {/* Right side - Signup Form */}
      <div className="signup-right">
        <div className="signup-form-container">
          <div className="signup-header">
            <h3>Create Account</h3>
            <p>Welcome! Please enter your information below to begin.</p>
          </div>

          {/* Error Message */}
          {error && <div className="signup-error">{error}</div>}

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Email Signup Button */}
          <button
            onClick={signUpWithEmail}
            disabled={authing}
            className="hero-button"
          >
            {authing ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="divider">
            <span className="divider-text">OR</span>
          </div>

          {/* Google Signup Button */}
          <button
            onClick={signUpWithGoogle}
            disabled={authing}
            className="google-signup-btn"
          >
            <FaGoogle /> Sign Up with Google
          </button>

          {/* Login Redirect */}
          <div className="login-redirect">
            Already have an account? <a href="/login">Log In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
