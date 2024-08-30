import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { summaryAPI } from "../../common";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(summaryAPI.forget.url, { email })

      .then((res) => {
        console.log("Response:", res);

        if (res.data && res.data.Status === "Success") {
          toast.success("Email send for Reset Password Successfully", {
            duration: 3000,
          });
          navigate(`/email_confirmation`);
        } else {
          console.log("Error: Response status is not success");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen rgb(25, 22, 22) p-4 sm:p-6 lg:p-8 font-Roboto">
      <div className="bg-gray-600 p-6 sm:p-8 lg:p-10 rounded shadow-lg shadow-gray-400/50 w-[500px] max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-100">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-200 pb-3"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-[#efeded] text-gray-800 shadow-[0px_4px_15px_rgba(255,255,255,0.2)] transform transition-transform duration-200 ease-in-out hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
          <button
            type="submit"
            className=" text-center  px-8 bg-blurr-0 hover:bg-[#006eff8d] border border-gray-100 text-gray-800 font-bold py-2 rounded transition duration-300 mt-3">

            Send Reset Link
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
