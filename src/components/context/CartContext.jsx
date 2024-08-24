import React,{ createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthToken';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useAuth();
  
  const [cart, setCart] = useState(null);

  const fetchCart = async() => {
    try {
      const response = await axios.get('http://localhost:1000/api/v1/cart', {
        headers: { 'auth-token': token }
      });
      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post('http://localhost:1000/api/v1/cart', {
        productId,
        quantity,
      }, {
        headers: { 'auth-token': token }
      });
      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    console.log(`Updating product ${productId} to quantity ${quantity}`);
    try {
      const response = await axios.put('http://localhost:1000/api/v1/cart', {
        productId,
        quantity,
      }, {
        headers: { 'auth-token': token }
      });

         // Update cart state without fetching from server again
      const updatedCart = { ...cart };
      const itemIndex = updatedCart.items.findIndex(item => item.product._id === productId);
      if (itemIndex > -1) {
        updatedCart.items[itemIndex].quantity = quantity;
      }
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete('http://localhost:1000/api/v1/cart', {
        headers: { 'auth-token': token },
        data: { productId },
      });
      
      // Update cart state without fetching from server again
      const updatedCart = { ...cart };
      updatedCart.items = updatedCart.items.filter(item => item.product._id !== productId);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
