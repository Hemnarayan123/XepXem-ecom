import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RiRadioButtonLine, RiRadioButtonFill } from 'react-icons/ri';
import React, { useState, useEffect } from "react";
import image1 from '../../assets/banner/img1.webp'
import image2 from '../../assets/banner/img2_mobile.webp'
import image3 from '../../assets/banner/img4_mobile.jpg'
import image4 from '../../assets/banner/img5.webp'




function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
      { url: image1 },
      { url: image4 },
      { url: image3 },
      { url: image2 },
      
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
        <div className="w-full h-80vh m-auto relative group">
            <img
                src={slides[currentIndex].url}
                alt={`Slide ${currentIndex}`}
                className="w-full max-h-96 object-fill rounded-2xl duration-200"
            />
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
    );
}

export default Slider;
