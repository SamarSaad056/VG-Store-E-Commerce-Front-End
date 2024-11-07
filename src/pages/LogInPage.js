
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; 

const LogInPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setLoading(true); 
        setError(''); 

        try {
            // Send POST request to the sign-in API
            const response = await axios.post('http://localhost:5125/api/v1/person/signIn', {
                personEmail: username, // Use email as username
                personPassword: password // Use password
            });

            
            if (response.data) {
                onLogin(response.data); 
                console.log('LogedIn')
            }
        } catch (error) {
            // Handle error response
            if (error.response) {
                // Server responded with a status other than 200 range
                setError(error.response.data.message || 'Login failed');
            } else {
                // Some error occurred in setting up the request
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                        placeholder='Enter Your UserName'
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
                        placeholder='Enter Your Password'
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>} 
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

LogInPage.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LogInPage
