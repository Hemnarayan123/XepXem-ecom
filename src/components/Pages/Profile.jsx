import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthToken";
import axios from "axios";
import { summaryAPI } from "../../common";
import { FcBusinessman } from "react-icons/fc";


const Profile = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
        console.log("Fetching profile with token:", token);
        try {
          const response = await axios.get(summaryAPI.profile.url, {
            headers: {
              'auth-token': token
            }
          });
          console.log("Profile fetched successfully:", response.data);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!user) return <div>Loading...</div>;

  return (
    // <div>
    //   <h1>-----------------Profile----------------</h1>
    //   <p>Name: {user.username}</p>
    //   <p>Email: {user.email}</p>
    //   {/* Aur bhi user details yahaan display kar sakte hain */}
    // </div>


    <>
   <div className="bg-gray-100 flex flex-col items-center p-4 max-w-md mx-auto my-16">
  <div className="bg-white shadow-md rounded-lg p-4 w-full bg-[#f3f0f04a]">
    <div className="flex flex-col sm:flex-row items-center">
    <FcBusinessman size={100} className="bg-blurr-0 rounded-full p-1" />
      <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
        <h2 className="text-2xl font-semibold">{user.username}</h2>
        <p className="text-[#ffffffc5] font-Roboto">{user.email}</p>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-xl text-[#fffbfbe2] font-Roboto">Account Details</h3>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[#fffbfbe2] font-Roboto">Username :</span>
          <span className="font-medium text-[#fffcfc]">{user.username}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#fffbfbe2] font-Roboto">Phone :</span>
          <span className="font-medium text-[#ffffffc5]">123-456-7890</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#fffbfbe2] font-Roboto">Address :</span>
          <span className="font-medium text-[#ffffffc5]">123 Main St, City, Country</span>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Profile;
