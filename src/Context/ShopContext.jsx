import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

//(1) create context here
const ShopContextCreated = createContext(null);

const ShopContext = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart()); // useState
  // console.log('CartItemData:', cartItems);

  const addToCart = (itemId) => {
    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1, // Ensures first-time addition starts from 1
    }));
    // console.log("cartItems =", cartItems); // check
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: prevCart[itemId] - 1,
    }));
  };

  // Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Total Cart Items
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  //(2) contextValue Send
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems
  };

  return (
    <ShopContextCreated.Provider value={contextValue}>
      {props.children}
    </ShopContextCreated.Provider>
  );
};

export default ShopContext;
export { ShopContextCreated };
