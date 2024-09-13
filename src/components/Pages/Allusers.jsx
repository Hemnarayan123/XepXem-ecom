
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthToken";
import axios from "axios";
import { summaryAPI } from "../../common";
import { MdEmail, MdPerson } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";

const Allusers = () => {
  const { token, role } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === "admin") {
      setLoading(true);
      axios
        .get(summaryAPI.Allusers.url, { headers: { "auth-token": token } })
        .then((response) => {
          setUsers(response.data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoading(false); 
        });
    }
  }, [token, role]);

  if (role !== "admin") {
    return <div className="text-center text-xl text-red-600">Access denied</div>;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
        <div className="text-center text-xl text-blue-400 mb-4">Loading users...</div>
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 mt-10 mx-auto rounded-lg p-4 sm:p-6 max-w-full sm:max-w-4xl shadow-lg  shadow-gray-200">
    <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold font-Roboto mb-4 sm:mb-6 text-white">
     All Users
    </h1>
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left text-white">
        <thead>
          <tr className="bg-gray-700 text-sm sm:text-base">
            <th className="px-2 sm:px-4 py-2">Sr.</th>
            <th className="px-2 sm:px-4 py-2">Email</th>
            <th className="px-2 sm:px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t border-gray-700 hover:bg-gray-600 text-sm sm:text-base"
              >
                <td className="px-2 sm:px-4 py-2">{index + 1}</td>
                <td className="px-2 sm:px-4 py-2">
                  <span className="inline-flex items-center">
                    <MdEmail className="mr-2 text-lg" />
                    {user.email || "No Email"}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 capitalize">
                  <span className="inline-flex items-center">
                    <FaUserShield className="mr-2 text-lg" />
                    {user.role || "No Role"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}
export default Allusers;
