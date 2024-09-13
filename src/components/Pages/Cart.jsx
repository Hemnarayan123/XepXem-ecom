import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthToken";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!cart || !cart.items.length) {
    return (
      <div className="text-center text-gray-200 text-lg font-semibold py-4">
        Your cart is empty
      </div>
    );
  }

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    console.log(`Changing quantity for product ${productId} to ${quantity}`); // Debug log
    updateCartItem(productId, quantity);
  };

  const handleRemoveItem = (productId) => {
    console.log(`Removing product ${productId} from cart`); // Debug log
    removeFromCart(productId);
    toast.success("Product remove successfully", {
      duration: 3000,
    })
  };

  const totalAmount = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleBuyNow = () => {
    navigate("/buy-now", { state: { products: cart.items, totalAmount } });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 font-Roboto ">
      <h1 className="text-2xl font-Roboto mb-4 text-center md:text-left text-gray-100">
        Your Cart
      </h1>
      <div className="bg-blurr-0 rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
        {cart.items && cart.items.map((item) => (
          <div
            key={item.product._id}
            className="flex flex-col md:flex-row items-center justify-between mb-4 border-b border-gray-200 pb-4"
          >
            <img
              className="w-24 h-24 object-contain md:w-16 md:h-16"
              src={item.product.image}
              alt={item.product.name}
            />
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-Roboto mb-2 text-gray-100">
                {item.product.name}
              </h2>
              <div className="flex items-center mb-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className=" font-Roboto  text-center  hover:bg-primbtnhover-0  text-sm md:text-base text-white bg-[#bcbbbbb9] rounded-full"
                >
                <LuMinus />
                </button>
                <span className="mx-2 text-sm md:text-base text-gray-100">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity + 1)
                  }
                  className=" font-Roboto  text-center  hover:bg-primbtnhover-0  text-sm md:text-base text-white bg-[#bcbbbbb9] rounded-full"
                >
                  <GoPlus />
                </button>
              </div>
            </div>
            <span className="text-lg font-Roboto text-gray-100 md:text-xl">
              ₹{item.product.price * item.quantity}
            </span>
            <button
              onClick={() => handleRemoveItem(item.product._id)}
              className="text-red-500 hover:text-red-700 ml-4 text-xl "
            >
              &times;
            </button>
          </div>
        ))}
        <div className="text-right text-lg  md:text-xl font-Roboto text-gray-100">
          Total: ₹{totalAmount}
        </div>
        <button
          onClick={handleBuyNow}
          className="bg-primbtncolor-0 hover:bg-primbtnhover-0  text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4 text-sm md:text-base lg:text-lg"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;














