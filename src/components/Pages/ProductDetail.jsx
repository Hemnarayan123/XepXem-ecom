import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthToken";
import { useCart } from "../context/CartContext";
import { FcLike } from "react-icons/fc";


const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const product = products.find((product) => product._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = async () => {
    addToCart(product._id, 1);
  };

  const handleBuyNow = () => {
    navigate("/buy-now", { state: { product } });
  };

  return (
    // <div className="container mx-auto font-Roboto p-4">
    //   <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg md:flex">
    //     <div className="md:w-1/2 p-4">
    //       <img
    //         className="w-full h-auto object-contain bg-gray-200"
    //         src={`http://localhost:1000/image/${product.image}`}
    //         alt={product.name}
    //       />
    //     </div>
    //     <div className="md:w-1/2 p-4">
    //       <div className="text-gray-200 font-bold text-3xl mb-2 ">
    //         {product.name}
    //       </div>
    //       <p className="text-gray-300 text-base mb-4 ">{product.description}</p>
    //       <div className="text-gray-300 text-xl mb-4 ">
    //         Price: ₹{product.price}
    //       </div>

    //       {/* s ize   */}
    //       <div className="size-options">
    //   <p><b>Size:</b></p>
    //   <ul className="flex gap-8 ">
    //     <li className="bg-primbtnhover-0 px-2 rounded-sm text-gray-300 hover:bg-blurr-0 cursor-pointer">
    //       <p for="size-xxs text-center">XXS</p>
    //     </li>
    //     <li className="bg-primbtnhover-0 px-2 rounded-sm text-gray-300 hover:bg-blurr-0 cursor-pointer">
    //       <p for="size-xs text-center">XS</p>
    //     </li>
    //     <li className="bg-primbtnhover-0 px-2 rounded-sm text-gray-300 hover:bg-blurr-0 cursor-pointer">
    //       <p for="size-s text-center">S</p>
    //     </li>
  
    //     <li className="bg-primbtnhover-0 px-2 rounded-sm text-gray-300 hover:bg-blurr-0 cursor-pointer">
    //       <p for="size-m text-center">M</p>
    //     </li>
    //     <li className="bg-primbtnhover-0 px-2 rounded-sm text-gray-300 hover:bg-blurr-0 cursor-pointer">
    //       <p for="size-l text-center">L</p>
    //     </li>
    //     <li className="bg-primbtnhover-0 px-2 rounded-sm text-gray-300 hover:bg-blurr-0 cursor-pointer">
    //       <p for="size-xl text-center">XL</p>
    //     </li>
    //     <li className="bg-primbtnhover-0 px-2 rounded-sm text-gray-300 hover:bg-blurr-0 cursor-pointer">
    //       <p for="size-xxl text-center">XXL</p>
    //     </li>
    //   </ul>
    //   <button id="size-guide-btn" popovertarget="size-guide">Size Guide</button>
    // </div>

    //       <div className="flex space-x-4 mb-4">
    //         <button
    //           onClick={handleAddToCart}
    //           className="bg-primbtncolor-0 hover:bg-blurr-0 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
    //         >
    //           Add to Cart
    //         </button>
    //         <button className="bg-primbtncolor-0 hover:bg-blurr-0 text-white px-6 py-2 rounded-lg hover:bg-yellow-700">
    //           Wishlist
    //         </button>
    //         <button
    //           className="bg-primbtncolor-0 hover:bg-blurr-0 text-white px-6 py-2 rounded-lg hover:bg-green-700"
    //           onClick={handleBuyNow}
    //         >
    //           Buy Now
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
 
    <>
  <div className="bg-gray-100 dark:bg-gray-800 py-8 bg-blurr-0  mx-auto  mt-7 container">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-fill rounded-xl"  src={product.image}
            alt={product.name}></img>
                </div>
               
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl text-gray-300 font-Roboto "> {product.name}</h2>
                <p className="font-Roboto text-gray-400  text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-Roboto text-gray-300">Price :</span>
                        <span className="text-gray-400 font-Roboto">  ₹{product.price}</span>
                    </div>
                
                </div>
        
                <div className="mb-4">
                    <span className="font-Roboto text-gray-300">Select Size:</span>
                    <div className="flex items-center mt-2">
                        <button className=" text-gray-100 bg-blurr-0 hover:bg-primbtncolor-0 py-2 px-4 rounded-full font-Roboto mr-2 ">S</button>
                        <button className=" text-gray-100 bg-blurr-0 hover:bg-primbtncolor-0 py-2 px-4 rounded-full font-Roboto mr-2 ">M</button>
                        <button className=" text-gray-100 bg-blurr-0 hover:bg-primbtncolor-0 py-2 px-4 rounded-full font-Roboto mr-2 ">L</button>
                        <button className=" text-gray-100 bg-blurr-0 hover:bg-primbtncolor-0 py-2 px-4 rounded-full font-Roboto mr-2 ">XL</button>
                        <button className=" text-gray-100 bg-blurr-0 hover:bg-primbtncolor-0 py-2 px-4 rounded-full font-Roboto mr-2 ">XXL</button>
                    </div>
                </div>
                <div>
                    <span className="font-Roboto text-gray-300">Product Description:</span>
                    <p className="text-gray-400 font-Roboto text-sm mt-2 ">
                     {product.description}
                    </p>
                </div>
                <div className="flex -mx-2 mb-4 mt-10 font-Roboto">
                    <div className="w-3/4 px-2">
                    <button className="w-full box__link button-animation text-center font-Roboto hover:font-bold"  onClick={handleAddToCart}>
                            <span></span>
                            Add to Cart
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div class="w-1/4 px-2">
                        <button class=" bg-[#3162f697] py-2 px-2 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                        <FcLike  size={40}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    </>
  );
};

export default ProductDetail;




