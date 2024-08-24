import React from 'react';
import { useAuth } from "../context/AuthToken";
import { Link } from 'react-router-dom';
import { BsFillSuitHeartFill } from "react-icons/bs";

function Search() {
    const { search } = useAuth();

    return (
        // <div className="container mx-auto p-4">
        //     <h1 className="text-center text-xl md:text-2xl lg:text-3xl my-4">
        //         {!search?.result ? 'No results' : search.result.length < 1 ? 'No results' : `Found ${search.result.length} results`}
        //     </h1>
        //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        //         {search?.result.map((product) => (
        //             <Link key={product._id} to={`/product-detail/${product._id}`} className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
        //                 <img className="w-full object-contain h-48 sm:h-64 md:h-48 lg:h-64 bg-gray-200" src={`http://localhost:1000/image/${product.image}`} alt={product.name} />
        //                 <div className="px-4 py-2">
        //                     <div className="font-bold text-lg sm:text-xl md:text-lg lg:text-xl mb-2">{product.name}</div>
        //                 </div>
        //                 <div className="px-4 pt-2 pb-4">
        //                     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        //                         Price: ₹{product.price}
        //                     </span>
        //                 </div>
        //             </Link>
        //         ))}
        //     </div>
        // </div>
        <>
           <div className="container mx-auto p-4 mt-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
    <h1 className="text-center text-xl md:text-2xl lg:text-3xl my-4 text-gray-100 font-Roboto">
    {!search?.result ? 'No results' : search.result.length < 1 ? 'No results' : `Found ${search.result.length} results`}
    </h1>
    {search && search?.result.map((product) => (
      <Link
        key={product._id}
        to={`/product-detail/${product._id}`}
        className="max-w-sm rounded overflow-hidden backdrop-blur m-4 "
      >
        <div className="backdrop-blur">
          <div className="flex justify-center">
            <div className="flip-container">
              <div className="flipper">
                <div className="front text-center rounded-lg ">
                  <img
                    className="w-full h-64 object-cover"
                    src={`http://localhost:1000/image/${product.image}`}
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

export default Search;
