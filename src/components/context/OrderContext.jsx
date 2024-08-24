import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/v1/order', {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post('http://localhost:1000/api/v1/order', {}, {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      setOrders([...orders, response.data.order]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
