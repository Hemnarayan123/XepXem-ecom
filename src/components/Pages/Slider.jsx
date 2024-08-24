import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RiRadioButtonLine, RiRadioButtonFill } from 'react-icons/ri';
import React, { useState, useEffect } from "react";

function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        { url: 'https://www.shutterstock.com/image-vector/ecommerce-website-banner-template-presents-260nw-2252124451.jpg' },
        { url: 'https://www.shutterstock.com/image-vector/paper-art-shopping-online-on-260nw-2074005938.jpg' },
        { url: 'https://www.shutterstock.com/image-vector/online-shopping-on-phone-buy-260nw-2078330851.jpg' },
        { url: 'https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg' },
      ];

      const prevSlide = () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(newIndex);
      };
    
      const nextSlide = () => {
        const newIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(newIndex);
      };
    
      useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
    
        return () => {
          clearInterval(interval);
        };
      }, [currentIndex]);
    
      return (
        <div className="max-w-[1400px] h-[500px] w-full m-auto py-16 px-4 relative group">
        <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-64 sm:h-80 md:h-96  bg-center bg-cover rounded-2xl duration-200 "
      ></div>

          {/* Left Arrow */}
          <div
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            onClick={prevSlide}
          >
            <BsChevronCompactLeft size={30} />
          </div>
    
          {/* Right Arrow */}
          <div
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            onClick={nextSlide}
          >
            <BsChevronCompactRight size={30} />
          </div>
    
          {/* Pagination Dots */}
          <div className="flex absolute bottom-4 left-1/2 transform -translate-x-1/2 justify-center space-x-2">
            {slides && slides.map((slide, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="cursor-pointer"
              >
                {index === currentIndex ? (
                  <RiRadioButtonFill size={12} className="text-blue-500" />
                ) : (
                  <RiRadioButtonLine size={12} className="text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
  )
}

export default Slider