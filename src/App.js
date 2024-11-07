import React , { useState }from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import './App.css';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import Cart from './Components/Cart.js';
import LogInPage from './Pages/LogInPage';


function App() {
  const [cartItems, setCartItems] = useState([]);


  const [user, setUser] = useState(null); // State to manage user info

  const handleLogin = (userData) => {
    setUser(userData); 
    
};
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/Games" 
          element={<ProductPage cartItems={cartItems} setCartItems={setCartItems} />} 
        />
        <Route path="/GameDetail/:id" element={<ProductDetailPage />} />
        <Route path="/Cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/LogIn" element={<LogInPage onLogin={handleLogin}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
