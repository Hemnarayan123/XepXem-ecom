import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthToken";
import { useCart } from "../context/CartContext";
import { FcLike } from "react-icons/fc";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Ensure products is defined before using it
  const product = products?.find((product) => product._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      toast.success("Product added to cart successfully", {
        duration: 2000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart");
    }
  };

  const handleBuyNow = () => {
    navigate("/buy-now", { state: { product } });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 bg-blurr-0 mx-auto mt-7 container">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={product.image}
                alt={product.name}
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl text-gray-300 font-Roboto">{product.name}</h2>
            <p className="font-Roboto text-gray-400 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt.
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-Roboto text-gray-300">Price:</span>
                <span className="text-gray-400 font-Roboto"> ₹{product.price}</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-Roboto text-gray-300">Select Size:</span>
              <div className="flex items-center mt-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="text-gray-100 bg-blurr-0 hover:bg-primbtncolor-0 py-2 px-4 rounded-full font-Roboto mr-2"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="font-Roboto text-gray-300">Product Description:</span>
              <p className="text-gray-400 font-Roboto text-sm mt-2">
                {product.description}
              </p>
            </div>
            <div className="flex -mx-2 mb-4 mt-10 font-Roboto">
              <div className="w-3/4 px-2">
                <button
                  className="w-full box__link button-animation text-center font-Roboto hover:font-bold"
                  onClick={handleAddToCart}
                >
                  <span></span>
                  Add to Cart
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
              <div className="w-1/4 px-2">
                <button className="bg-[#3162f697] py-2 px-2 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  <FcLike size={40} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
