import React from 'react';
import { Link } from 'react-router-dom';
/*import HomeIcon from '@mui/icons-material/Home';*/



const Navbar = () => {
    return (
        <header className="header">
        <div id="Logo">
          <h3>GHub Store</h3>
        </div>
    
        <nav>
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Games">Games</Link></li>
            <li><Link to ="/logIn">LogIn</Link></li>
            <li><Link to="/Cart">Cart</Link></li>
           
          </ul>
        </nav>
    
      </header>
    );
};

export default Navbar;


