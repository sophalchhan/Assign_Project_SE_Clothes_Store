import { useState, useEffect } from "react";

const Login = ({ switchToRegister }) => {
  // State for login form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State for storing logged-in user's name
  const [userName, setUserName] = useState("");

  // Handle input changes in the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update specific field based on input name
    });
  };

  // Handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Mock user data - in real app, this would come from API response
    const userData = {
      token: "user-token", // Mock authentication token
      email: formData.email,
      name: formData.email.split("@")[0], // Generate username from email (part before @)
    };

    // Store user data in localStorage for persistence
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userName", userData.name);

    // Update state to reflect logged-in status
    setIsLoggedIn(true);
    setUserName(userData.name);

    alert("Login successful!");
  };

  // Handle user logout
  const handleLogout = () => {
    // Clear all stored user data
    localStorage.clear();
    // Reset authentication state
    setIsLoggedIn(false);
    setUserName("");
    alert("Logged out successfully!");
  };

  // Check for existing login session on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedName = localStorage.getItem("userName");

    // If token and username exist in localStorage, user is already logged in
    if (token && savedName) {
      setIsLoggedIn(true);
      setUserName(savedName);
    }
  }, []); // Empty dependency array means this runs only once when component mounts

  return (
    <div className="container mt-4">
      {/* Conditional rendering based on login status */}
      {!isLoggedIn ? (
        /* ---------------- LOGIN FORM ---------------- */
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <h3 className="text-center mb-3">Login</h3>

          {/* Email input field */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password input field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <button className="btn btn-primary w-100">LOGIN</button>
          
          {/* Note: The switchToRegister prop is defined but not used in the JSX */}
          {/* Consider adding a "Don't have an account? Register" link here */}
        </form>
      ) : (
        /* ---------------- PROFILE PANEL (shown when logged in) ---------------- */
        <div className="card p-4 shadow-sm">
          {/* User profile information */}
          <h4 className="fw-bold">{userName}</h4>
          <p className="text-muted">{localStorage.getItem("userEmail")}</p>

          <hr />

          {/* Language Preference Section */}
          <h5 className="fw-bold mt-3">ភាសា / Languages</h5>

          {/* English language option */}
          <div className="form-check mt-2">
            <input className="form-check-input" type="radio" name="lang" defaultChecked />
            <label className="form-check-label">English</label>
          </div>

          {/* Khmer language option */}
          <div className="form-check">
            <input className="form-check-input" type="radio" name="lang" />
            <label className="form-check-label">ខ្មែរ</label>
          </div>

          <hr />

          {/* Shop Preference Section */}
          <h5 className="fw-bold">Shop Preference</h5>

          {/* Map through shop categories to create radio buttons */}
          {["WOMEN", "MEN", "Boys", "Girls"].map((item, index) => (
            <div className="form-check" key={index}>
              <input className="form-check-input" type="radio" name="shop" />
              <label className="form-check-label">{item}</label>
            </div>
          ))}

          <hr />

          {/* Logout Button */}
          <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;