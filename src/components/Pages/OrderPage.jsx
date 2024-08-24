import React from 'react';
import { useOrder } from '../context/OrderContext';
import { useCart } from '../context/CartContext';

const OrderPage = () => {
  const { orders, placeOrder } = useOrder();
  const { cart } = useCart();

  const handlePlaceOrder = () => {
    placeOrder();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <button
        onClick={handlePlaceOrder}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mb-4"
      >
        Place Order
      </button>
      {orders && orders.map((order) => (
        <div key={order._id} className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Order ID: {order._id}</h2>
          <div className="mb-2">Status: {order.status}</div>
          <div className="mb-2">Total Amount: ₹{order.totalAmount}</div>
          <div className="mb-2">Items:</div>
          {order.items &&order.items.map((item) => (
            <div key={item.product._id} className="flex justify-between mb-2">
              <span>{item.product.name} (x{item.quantity})</span>
              <span>₹{item.product.price * item.quantity}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
