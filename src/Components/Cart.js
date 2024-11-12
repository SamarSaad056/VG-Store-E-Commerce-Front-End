import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import searchIcon from "../search.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage on initial render
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    // Update localStorage whenever cartItems change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.videoGameInfoId !== itemId));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.videoGameVersions[0].price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const increaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item => 
      item.videoGameInfoId === itemId 
      ? { ...item, quantity: item.quantity + 1 } 
      : item
    ));
  };

  const decreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item => 
      item.videoGameInfoId === itemId && item.quantity > 1 
      ? { ...item, quantity: item.quantity - 1 } 
      : item
    ));
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="login-container">
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="NoproductsfoundCart">
            <div className="image-container">
              <img src={searchIcon} alt="No products found" />
            </div>
          </div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <div className="CartList" key={item.videoGameInfoId}>
                <div className="image-containerCart">
                  <img
                    src={item.gamePicturePath}
                    alt={item.gameName}
                    className="GameImage"
                  />
                </div>
                <h3 >{item.gameName}</h3>
                
               
                <h4 className="Price">Price : 
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.videoGameVersions[0].price)}
                  
                </h4> 
                
                <p className="Quantity">Quantity: {item.quantity}</p>
                  
                <button className="QuantityButton1" onClick={() => decreaseQuantity(item.videoGameInfoId)}>-</button>
                <button className="QuantityButton2" onClick={() => increaseQuantity(item.videoGameInfoId)}>+</button>
               
                
                <button className="RemoveButton"onClick={() => removeItem(item.videoGameInfoId)}>
                  Remove
                </button>
                
              </div>
            ))}
            
            <h3 className="TotailPrice">
              Total Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalPrice)}
              <button className="OrderButton">Order</button>
            </h3>
            
          </ul>
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
  
};

export default Cart;


