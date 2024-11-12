import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";



const Navbar = ( {userRole} ) => {
    return (
        <header className="header">
        <div id="Logo">
          <h3>VG Store</h3>
        </div>
    
        <nav>
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Games">Games</Link></li>
            <li><Link to ="/logIn">LogIn</Link></li>
            <li><Link to="/Cart">Cart</Link></li>
            { userRole==="SystemAdmin" &&(
              <li><Link to="/dashboard">Dashboard</Link></li>
            )
            }
          

           
          </ul>
        </nav>
    
      </header>
    );
};
Navbar.propTypes = {
  userRole: PropTypes.string, // userRole can be "admin", "employee", etc.
};

export default Navbar;


