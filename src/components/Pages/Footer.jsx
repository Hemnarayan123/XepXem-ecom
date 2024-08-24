import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import footerlogo from "../../assets/main-logo.png";
import { FaTwitter } from 'react-icons/fa'; // Updated import for Twitter ic


function Footer() {
  return (
    <footer className="backdrop-blur flex-none footer mt-8 font-Roboto h-auto bg-gray-800 p-4">
      <div className="container mx-auto text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
            <h4 className="text-xl font-bold mb-2">
              <img src={footerlogo} alt="" />
            </h4>
            <p className="text-sm">&copy; 2024 ShopLogo. All rights reserved.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
            <ul className="flex space-x-4 mb-2 sm:mb-0">
              <li>
                <Link to={'/privacy'} className="hover:text-gray-300 text-sm sm:text-base">Privacy Policy</Link>
              </li>
              <li>
                <Link to={'/term'} className="hover:text-gray-300 text-sm sm:text-base">Terms of Service</Link>
              </li>
              <li>
                <Link to={'/contact'} className="hover:text-gray-300 text-sm sm:text-base">Contact</Link>
              </li>
            </ul>
            <div className="flex space-x-4">
              <Link to={'/facebook'} className="text-xl hover:text-gray-300"><FaFacebook /></Link>
              <Link to={'/instagram'} className="text-xl hover:text-gray-300"><FaInstagram /></Link>
              <Link to={'/youtube'} className="text-xl hover:text-gray-300"><FaYoutube /></Link>
              <Link to={'/twitter'} className="text-xl hover:text-gray-300"><FaTwitter /></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h5 className="text-lg font-bold mb-2">Follow Us</h5>
          <ul className="flex space-x-4">
            <li>
              <Link to={'/facebook'} className="hover:text-gray-300 text-sm sm:text-base">Facebook</Link>
            </li>
            <li>
              <Link to={'/instagram'} className="hover:text-gray-300 text-sm sm:text-base">Instagram</Link>
            </li>
            <li>
              <Link to={'/youtube'} className="hover:text-gray-300 text-sm sm:text-base">YouTube</Link>
            </li>
            <li>
              <Link to={'/twitter'} className="hover:text-gray-300 text-sm sm:text-base">Twitter</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
