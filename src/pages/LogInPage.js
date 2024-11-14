import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";


const LogInPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5125/api/v1/person/signIn",
        {
          personEmail: username, 
          personPassword: password, 
        }
   
      );

      if (response.data) {
        
        const token = parseJwt(response.data);

        const userRole = token.role;

        onLogin(response.data, userRole); 
        console.log("LoggedIn");
        localStorage.setItem("Token",response.data);
        console.log("Stored Token:", localStorage.getItem("Token"));
        navigate("/");
      }
    } catch (error) {
      
      if (error.response) {
        
        setError(error.response.data.message || "Login failed");
      } else {
        
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
  };

  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64); 
    return JSON.parse(jsonPayload);
  }



  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              placeholder="Enter Your UserName"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Enter Your Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
           <p>Do not have an account? <Link to="/register">Register Now</Link></p>

          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="LogInButton" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

LogInPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LogInPage;

