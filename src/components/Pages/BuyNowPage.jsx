import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthToken";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";

const BuyNowPage = () => {
  const location = useLocation();
  const { products, product, totalAmount } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const { addToCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  const { token } = useAuth();

  // State to manage quantities of each product
  const [quantities, setQuantities] = useState({});

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === "cod" && !address) {
      alert("Please enter your address for Cash on Delivery.");
      return;
    }

    if (product) {
      await addToCart(product._id, quantities[product._id] || 1); // Ensure product is in cart
    } else if (products) {
      for (let item of products) {
        await addToCart(item.product._id, quantities[item.product._id] || item.quantity); // Ensure product is in cart
      }
    }

    await placeOrder(); // Place the order
    navigate("/order-confirmation"); // Redirect to order confirmation page
  };

  // const handlePayment = async () => {
  //   try {
  //     const stripePromise = await loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY);
  //     const cartItems = products || [{ product, quantity: quantities[product._id] || 1 }];
  //     const response = await axios.post(
  //       "http://localhost:1000/api/v1/payment",
  //       { cartItems },
  //       { headers: { "auth-token": token } }
  //     );

  //     // Handle Stripe checkout
  //     if (response.data.url) {
  //       window.location.href = response.data.url;
  //     }
  //   } catch (error) {
  //     console.error("Payment error: ", error);
  //     alert("Payment failed, please try again.");
  //   }
  // };


  const handlePayment = async () => {
    if (paymentMethod === "cod") {
      // Show confirmation message for Cash on Delivery
      const confirmPayment = window.confirm("Your order is confirmed.");
      
      if (!confirmPayment) {
        return; // Exit if the user does not confirm
      }
    }
  
    try {
      const stripePromise = await loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const cartItems = products || [{ product, quantity: quantities[product._id] || 1 }];
      const response = await axios.post(
        "http://localhost:1000/api/v1/payment",
        { cartItems },
        { headers: { "auth-token": token } }
      );
  
      // Handle Stripe checkout if the payment method is online
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment error: ", error);
      alert("Payment failed, please try again.");
    }
  };
  


  const handleOrder = () => {
    if (paymentMethod === "cod") {
      alert("Your order is confirmed.");
    } else {
      alert("Please select Cash on Delivery to place the order.");
    }
  };


  const renderProductDetails = (item) => {
    const productId = item.product._id;
    const quantity = quantities[productId] || 1;

    // Function to handle increment
    const handleIncrement = () => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 1) + 1,
      }));
    };

    // Function to handle decrement
    const handleDecrement = () => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 1) > 1
          ? (prevQuantities[productId] || 1) - 1
          : 1,
      }));
    };
  
    return (
      <div
        key={item.product._id}
        className="mb-4 flex flex-col md:flex-row items-center"
      >
        <img
          className="w-[70px] h-[70px] md:w-[70px] md:h-[70px] object-cover bg-gray-200 mr-4 rounded-xl"
          src={item.product.image}
          alt={item.product.name}
        />
        <div>
          <div className="text-gray-300 font-Roboto text-lg md:text-2xl mb-2">
            {item.product.name}
          </div>
          <div className="text-gray-300 font-Roboto text-md md:text-base mb-4">
            Price: ₹{item.product.price * quantity}
          </div>
          {/* <div className="flex items-center mb-4">
            <button
              className="bg-gray-300 p-2 rounded-l-md"
              onClick={handleDecrement}
            >
              <LuMinus />
            </button>
            <div className="px-4 py-2">{quantity}</div>
            <button
              className="bg-gray-300 p-2 rounded-r-md"
              onClick={handleIncrement}
            >
              <GoPlus />
            </button>
          </div> */}
        </div>
      </div>
    );
  };

  const total = totalAmount || (product ? product.price : 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 bg-primbtnhover-0 font-Roboto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
        <h2 className="text-2xl mb-4 text-gray-100">Contact</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded-lg bg-blurr-0"
        />
        <h2 className="text-2xl mb-4 text-gray-100">Delivery</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded-lg bg-blurr-0"
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full mb-4 p-2 border rounded-lg bg-blurr-0"
        />
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 border rounded-lg bg-blurr-0"
          />
          <input
            type="text"
            placeholder="State"
            className="w-full p-2 border rounded-lg bg-blurr-0"
          />
          <input
            type="text"
            placeholder="PIN code"
            className="w-full p-2 border rounded-lg bg-blurr-0"
          />
        </div>
        <h2 className="text-2xl mb-4 text-gray-100 mt-10">Select Payment Method</h2>
        <div className="items-center mb-4 text-gray-100">
          <div className="bg-blurr-0 mt-2 p-1 rounded-lg ps-4">
            <input
              type="radio"
              name="payment"
              id="cod"
              onClick={() => handlePaymentChange("cod")}
              className={`md:w-auto bg-gray-200 px-4 py-2 rounded-lg mb-2 md:mb-0 ${
                paymentMethod === "cod" && "bg-gray-400"
              }`}
            />
            <label htmlFor="cod" className="mr-4 ms-2">
              Cash on Delivery
            </label>
          </div>
          <div className="bg-blurr-0 mt-2 p-1 rounded-lg ps-4">
            <input
              type="radio"
              name="payment"
              id="online"
              onClick={() => handlePaymentChange("online")}
              className={`md:w-auto bg-gray-200 px-4 py-2 rounded-lg mb-2 md:mb-0 ${
                paymentMethod === "online" && "bg-gray-400"
              }`}
            />
            <label htmlFor="online" className="ms-2">
              Online
            </label>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="w-full text-white p-2 rounded-lg bg-blurr-0 hover:bg-primbtnhover-0"
            onClick={handlePayment}
          >
            Pay Now
          </button>
          <button
            className="w-full text-white p-2 rounded-lg bg-primbtnhover-0 hover:bg-blurr-0"
            onClick={handleOrder}
          >
            Order Now
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-gray-100 rounded-lg overflow-hidden">
          <div className="p-4 md:p-6 lg:p-8 bg-blurr-0">
            {product
              ? renderProductDetails({ product, quantity: quantities[product._id] || 1 })
              :products && products.map((item) => renderProductDetails(item))}
          </div>
          <div className="p-2 md:p-2 lg:p-1 bg-blurr-0 mt-1">
            <div className="text-gray-300 text-lg md:text-xl">
              Total : ₹{total}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default BuyNowPage;
