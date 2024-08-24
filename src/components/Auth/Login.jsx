import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {summaryAPI} from "../../common/index.js";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthToken";

function Login() {
    const [showPassword,setShowPassword] = useState(false)
    const [data, setData] = useState({
      email: "",
      password: "",
    });
    const  {tokenGetLocalStorage}  = useAuth();
    const navigate = useNavigate();
  
  
  
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(summaryAPI.login.url,data,{
          headers: {
            "Content-Type": "application/json",
          },
        });
         console.log('response', response);
         if (response.status === 200 || response.status === 201) {
          toast.success("Sign In Success", {
            duration: 3000,
          });
          tokenGetLocalStorage(response.data.token, response.data.role);
          console.log("role", response.data.role);
    
          // Role based navigation
          if (response.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error", error);
        toast.error("Sign In Error", {
          duration: 3000,
        });
      }
    };
    return (
      <div className="flex items-center justify-center min-h-screen rgb(25, 22, 22) p-4 sm:p-6 lg:p-8 ">
      <div className="bg-gray-600 p-6 sm:p-8 lg:p-10 rounded shadow-md w-full max-w-md bg-primbtnhover-0">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">SignIn</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-100 mb-2 font-Roboto" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded bg-blurr-0 text-gray-300 font-Roboto"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-100 mb-2 font-Roboto" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded bg-blurr-0 text-gray-300 font-Roboto"
              value={data.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 pt-8 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span>{showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}</span>
            </div>
          </div>
          <Link to="/forget_password" className="text-gray-100  hover:underline font-Roboto">
                Forget Password
              </Link>
          <div className="flex items-center justify-center">
              <button
                type="submit"
                className="p-4 bg-gray-100 text-gray-100 font-Roboto bg-blurr-0 hover:bg-[#006eff8d]  font-bold py-2 rounded hover:bg-gray-300 transition duration-300"
              >
                SignIn
              </button>
            </div>
          <div className="mt-4">
            <p className="text-center text-gray-900 font-Roboto">
              Don't have an account?{" "}
              <Link to="/signup" className="text-gray-100  bg-blurr-0">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    );
  }

  export default Login;