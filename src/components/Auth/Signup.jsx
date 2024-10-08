import React from "react";
import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { summaryAPI } from "../../common/index.js";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required", {
        duration: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(summaryAPI.register.url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success("Sign Up Success", {
          duration: 3000,
        });
        navigate("/signin");
      } else {
        toast.error("Sign Up Error", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen rgb(25, 22, 22) p-4 sm:p-6 lg:p-8 font-Roboto">
      <div className="bg-gray-600 p-6 sm:p-8 lg:p-10 rounded shadow-lg shadow-gray-400/50 w-[500px] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
          Sign-Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-100 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Your Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-[#efeded] text-gray-800 shadow-[0px_4px_15px_rgba(255,255,255,0.2)] transform transition-transform duration-200 ease-in-out hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-100 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-[#efeded] text-gray-800 shadow-[0px_4px_15px_rgba(255,255,255,0.2)] transform transition-transform duration-200 ease-in-out hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-100 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-[#efeded] text-gray-800 shadow-[0px_4px_15px_rgba(255,255,255,0.2)] transform transition-transform duration-200 ease-in-out hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 pt-8 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span>{showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}</span>
            </div>
            <style jsx>{`
              input[type="password"]::-ms-reveal,
              input[type="password"]::-ms-clear {
                display: none;
              }
            `}</style>
          </div>

          <div className="bg-gray-800 flex py-4 text-center rounded-lg shadow-lg ">
            <p className="mb-2 text-white text-md font-semibold ">
              Already Sign Up?
            </p>
            <Link
              to={"/signin"}
              className="text-blue-400 hover:text-blue-300 font-bold underline mx-3"
            >
              Login Now
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className=" text-center  px-8 bg-blurr-0 hover:bg-[#006eff8d] border border-gray-100 text-gray-200 font-bold py-2 rounded transition duration-300 mt-3"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
