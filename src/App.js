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
import DashboardPage from './Pages/DashboardPage.js';
import Bot from "./Pages/Bot.js";
import RegisterPage from './Pages/RegisterPage.js';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null); // State to manage user info

  const handleLogin = (userData,role) => {
    setUser(userData); 
    setUserRole(role);
  

  };

  return (
<div>
  <Navbar userRole={userRole} />
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/Games" 
        element={<ProductPage cartItems={cartItems} setCartItems={setCartItems} />} 
      />
      <Route path="/GameDetail/:id" element={<ProductDetailPage />} />
      <Route path="/Cart" element={<Cart cartItems={cartItems} />} />
      <Route path="/LogIn" element={<LogInPage onLogin={handleLogin} />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/Dashboard" element={<DashboardPage />} />
    </Routes>
  </Router>
  <Bot />
  <Footer />
</div>
  );
}

export default App;
