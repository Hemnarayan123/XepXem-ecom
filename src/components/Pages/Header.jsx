import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthToken";
import axios from "axios";
import mainlogo from "../../assets/main-logo.png";
import { MdAccountCircle } from "react-icons/md";
const Header = () => {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignIn, SignoutUser, role, search, setSearch } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [admiandropdown, setaddmaindrop] = useState(false);
  const [mobileProfileDropdownOpen, setMobileProfileDropdownOpen] =
    useState(false);

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
    setDropdownOpen((prevState) => !prevState);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v1/search/${search}`
      );
      setSearch({ ...search, result: response.data });
      navigate(`/search`);
    } catch (error) {
      console.log(error);
    }
  };

  const admiantoggleDropdown = () => {
    setaddmaindrop(!admiandropdown);
  };

  const toggleMobileProfileDropdown = () => {
    setMobileProfileDropdownOpen(!mobileProfileDropdownOpen);
  };

  const handleDropdownClick = () => {
    setAccountDropdownOpen(false);
    setDropdownOpen(false);
    setaddmaindrop(false);
    setMobileProfileDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur flex-none navbar">
      <div className="mx-auto flex justify-between items-center p-3 md:p-1">
        {/* Logo */}
        <div className="text-white font-Lora text-2xl md:ms-14 sm:ms-1">
          <Link to="/">
            <img src={mainlogo} className="w-auto h-[50px] my-2" alt="Main Logo" />
          </Link>
        </div>

        {/* Mobile Menu Button */}

        <div className="md:hidden items-center space-x-3 ">
          <div className="search-box flex items-center mobile-search">
            <form name="search" onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                className="search-input sm:w-[100px] "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder=" "
              />
              <button type="submit" className="search-icon ">
                <CiSearch className="font-semibold" />
              </button>
              </form>
              </div>
              </div>

        <div className="md:hidden flex items-center">
          <button className="text-white" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <RxCross2 size={30} /> : <RiMenu3Line size={30} />}
          </button>
        </div>

     

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-5 p-1">
          <li className="px-1 rounded-2xl ">
            <Link
              to="/"
              className="font-Roboto font-medium tracking-normal text-ld text-[#ffff]"
            >
              Home
            </Link>
          </li>
          {/* <li className="px-1 rounded-2xl ">
            <Link
              to="/shop"
              className="font-Roboto font-medium tracking-normal text-ld text-[#ffff]"
            >
              Shop
            </Link>
          </li> */}
          <li className="px-1 rounded-2xl ">
            <Link
              to="/contact"
              className="font-Roboto font-medium tracking-normal text-ld text-[#ffff]"
            >
              Contact
            </Link>
          </li>
          {role === "admin" && (
            <li className="relative px-1 rounded-2xl ">
              <button
                onClick={admiantoggleDropdown}
                className="font-Roboto font-medium tracking-normal text-ld text-[#ffff] flex items-center"
              >
                <i className="fas fa-user-shield mr-2"></i>
                Admin Dashboard
                {admiandropdown ? (
                  <RxCross2 className="ml-2" />
                ) : (
                  <IoIosArrowDown className="ml-2" />
                )}
              </button>
              {admiandropdown && (
                <ul className="absolute right-0 mt-[1.7rem] w-48 backdrop-blur navbar rounded shadow-lg py-2 z-10">
                  <li>
                    <Link
                      to={"/all-users"}
                      className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-semibold font-Roboto"
                      onClick={handleDropdownClick}
                    >
                      All Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/all-products"
                      className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-semibold font-Roboto"
                      onClick={handleDropdownClick}
                    >
                      All Products
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-3 me-7">
          <div className="search-box">
            <form
              name="search"
              onSubmit={handleSearch}
              className="flex items-center"
            >
              <input
                type="text"
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder=""
              />
              <button type="submit" className="search-icon text-red-500">
                <CiSearch className="font-semibold" />
              </button>
            </form>
          </div>

          {isSignIn ? (
            <div className="relative flex items-center">
              <button
                onClick={toggleAccountDropdown}
                className="text-white flex items-center hover:text-gray-300 mx-[5px]"
              >
                <FaUser className="ms-1" />
                {dropdownOpen ? <RxCross2 /> : <IoIosArrowDown />}
              </button>
              <Link
                to="/cart"
                className="text-white flex items-center hover:text-gray-300 mx-[5px]"
              >
                <FaShoppingCart className="m-1" />
              </Link>
              <Link
                to="/wishlist"
                className="text-white flex items-center hover:text-gray-300 mx-[5px]"
              >
                <IoIosHeartEmpty className="ms-1" size={21} />
              </Link>
              {accountDropdownOpen && (
                <div className="absolute right-0  w-48 backdrop-blur bg-[#00000060] rounded shadow-lg z-10 mt-[320px]">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-Roboto"
                    onClick={handleDropdownClick}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/order"
                    className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-Roboto"
                    onClick={handleDropdownClick}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-Roboto"
                    onClick={handleDropdownClick}
                  >
                    Settings
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-Roboto"
                    onClick={handleDropdownClick}
                  >
                    Cart
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-Roboto"
                    onClick={handleDropdownClick}
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/signout"
                    onClick={() => {
                      SignoutUser();
                      handleDropdownClick();
                    }}
                    className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-Roboto"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="text-white hover:scale-90 duration-150 font-Roboto"
            >
              <button className="w-[70px] h-[35px] rounded-md ms-5 backdrop-blur border-2 border-slate-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
  className={`md:hidden ${
    mobileMenuOpen ? "block" : "hidden"
  } backdrop-blur bg-[#000000e3] h-screen w-full`}
>
  <ul className="space-y-3 py-10 text-[17px]">
    <li>
      <Link
        to="/"
        className="font-Roboto font-medium tracking-normal text-ld text-[#ffff] ms-5"
        onClick={toggleMobileMenu}
      >
        Home
      </Link>
    </li>
    {/* <li>
      <Link
        to="/shop"
        className="font-Roboto font-medium tracking-normal text-ld text-[#ffff] ms-5"
        onClick={toggleMobileMenu}
      >
        Shop
      </Link>
    </li> */}
    <li>
      <Link
        to="/contact"
        className="font-Roboto font-medium tracking-normal text-ld text-[#ffff] ms-5"
        onClick={toggleMobileMenu}
      >
        Contact
      </Link>
    </li>
    {role === "admin" && (
      <li className="relative px-1 rounded-2xl">
        <button
          onClick={admiantoggleDropdown}
          className="font-Roboto font-medium tracking-normal text-ld text-[#ffff] flex ms-4"
        >
          <i className="fas fa-user-shield"></i>
          Admin Dashboard
          {admiandropdown ? (
            <RxCross2 className="ml-2" />
          ) : (
            <IoIosArrowDown className="ml-2" />
          )}
        </button>
        {admiandropdown && (
          <ul className="absolute right-0 mt-[1.2rem] w-48 backdrop-blur rounded shadow-lg py-2 z-10">
            <li>
              <Link
                to={"/all-users"}
                className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-semibold font-Roboto"
                onClick={() => {
                  toggleMobileMenu();
                  handleDropdownClick();
                }}
              >
                All Users
              </Link>
            </li>
            <li>
              <Link
                to="/all-products"
                className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-semibold font-Roboto"
                onClick={() => {
                  toggleMobileMenu();
                  handleDropdownClick();
                }}
              >
                All Products
              </Link>
            </li>
          </ul>
        )}
      </li>
    )}
    {isSignIn ? (
      <>
        <li className="px-1 rounded-2xl">
          <button
            onClick={toggleMobileProfileDropdown}
            className="font-Roboto font-medium tracking-normal ms-4 text-ld text-[#ffff] flex items-center"
          >
            <MdAccountCircle /> Account
            {mobileProfileDropdownOpen ? (
              <RxCross2 className="ml-2" />
            ) : (
              <IoIosArrowDown />
            )}
          </button>
          {mobileProfileDropdownOpen && (
            <ul className="absolute right-0 mt-[1.2rem] w-48 backdrop-blur rounded shadow-lg py-2 z-10">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-semibold font-Roboto"
                  onClick={() => {
                    toggleMobileMenu();
                    handleDropdownClick();
                  }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-semibold font-Roboto"
                  onClick={() => {
                    toggleMobileMenu();
                    handleDropdownClick();
                  }}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-semibold font-Roboto"
                  onClick={() => {
                    toggleMobileMenu();
                    handleDropdownClick();
                  }}
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-semibold font-Roboto"
                  onClick={() => {
                    toggleMobileMenu();
                    handleDropdownClick();
                  }}
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-semibold font-Roboto"
                  onClick={() => {
                    toggleMobileMenu();
                    handleDropdownClick();
                  }}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/signout"
                  onClick={() => {
                    SignoutUser();
                    toggleMobileMenu();
                    handleDropdownClick();
                  }}
                  className="block px-4 py-2 text-white hover:bg-[#ffffff72] hover:text-black font-Roboto"
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </li>
      </>
    ) : (
      <li>
        <Link
          to="/signin"
          className="text-white hover:scale-90 duration-150 font-Roboto"
          onClick={toggleMobileMenu}
        >
          <button className="w-[70px] h-[35px] rounded-md ms-5 backdrop-blur border-2 border-slate-600">
            Login
          </button>
        </Link>
      </li>
    )}
  </ul>
</div>

    </nav>
  );
};

export default Header;
