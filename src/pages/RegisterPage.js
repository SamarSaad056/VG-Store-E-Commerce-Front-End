
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Pname, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5125/api/v1/Customer",
        {
          personName:Pname ,
          personEmail: username, 
          personPassword: password, 
          personPhoneNumber: phone,
          age:age
        }
   
      );

      if (response.data) {
        
        console.log("Registered");

        navigate("/LogIn");
      }
    } catch (error) {
      if (error.response) {
        // Specific error handling for already registered users
        if (error.response.status === 500) {
          setError("This email or username is already registered.");
        } else {
          setError(error.response.data.message || "Registration failed");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              placeholder="Enter Your Name"
              type="text"
              id="Pname"
              value={Pname}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">User Email</label>
            <input
              placeholder="Enter Your Email"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Set a Password</label>
            <input
              placeholder="Enter Your Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">User Phone Number</label>
            <input
              placeholder="Enter Your Phone Number"
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">User Age</label>
            <input
              placeholder="Enter Your Age"
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="LogInButton" type="submit" disabled={loading}>
            {loading ? "Registering ..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};



export default RegisterPage;
