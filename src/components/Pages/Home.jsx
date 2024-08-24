import React from "react";
import { useAuth } from "../context/AuthToken";
import { Link } from "react-router-dom";
import Slider from "./Slider";
import { BsFillSuitHeartFill } from "react-icons/bs";

function Home() {
  const { products } = useAuth();
  return (
    <>
      <Slider />
      <div className="container mx-auto p-4 mt-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
    {products && products.map((product) => (
      <Link
        key={product._id}
        to={`/product-detail/${product._id}`}
        className="max-w-sm rounded overflow-hidden backdrop-blur m-4"
      >
        <div className="backdrop-blur">
          <div className="flex justify-center">
            <div className="flip-container">
              <div className="flipper">
                <div className="front text-center rounded-lg ">
                  <img
                    className="w-full h-64 object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="flex justify-between">
                    <div className="py-2 ms-3">
                      <div className="text-lg sm:text-xs md:text-lg lg:text-lg mb-2 text-center font-Roboto truncate">
                        {product.name}
                      </div>
                    </div>
                    <div className="price-container py-2 ms-5">
                      <span className="price-slide inline-block rounded-full px-3 text-center text-sm sm:text-xs md:text-sm lg:text-sm font-semibold text-gray-200 font-Roboto">
                        Price: ₹{product.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="back backdrop-blur text-center rounded-lg place-content-center relative">
                  <Link to="/wishlist" className="absolute top-1 right-7 z-10">
                    <div className="hover:text-slate-400 place-content-start pt-4 ps-4 text-red-800 shadow-2xl">
                      <BsFillSuitHeartFill size={20} />
                    </div>
                  </Link>

                  <h5 className="text-white font-medium text-lg font-Roboto">
                    {product.name}
                  </h5>
                  <p className="text-white text-sm mt-2 overflow-hidden bg-transparent font-Roboto">
                    {product.description}
                  </p>

                  <button className="custom-btn btn-12 mt-5 font-Roboto">
                    <span>Click!</span>
                    <span>Read More</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>


    </>
  );
}

export default Home;
