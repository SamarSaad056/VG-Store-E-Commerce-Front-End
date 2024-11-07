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
                {item.gameName}
                &nbsp;&nbsp;
                <h4>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.videoGameVersions[0].price)}
                  &nbsp;&nbsp;
                </h4> 
                
                <h4>Quantity: {item.quantity}</h4>

                <button onClick={() => removeItem(item.videoGameInfoId)}>
                  Remove
                </button>
                
              </div>
            ))}
            
            <h3>
            
              Total Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalPrice)}
            </h3>
          </ul>
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
  // If using PropTypes for initial items, you can define them here
};

export default Cart;


