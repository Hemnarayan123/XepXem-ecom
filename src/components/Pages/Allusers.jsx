import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthToken";
import axios from "axios";
import { summaryAPI } from "../../common";

const Allusers = () => {
  const { token, role } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (role === 'admin') {
      axios.get(summaryAPI.Allusers.url, { headers: { 'auth-token': token } })
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error("Error fetching users:", error);
        });
    }
  }, [token, role]);

  if (role !== 'admin') {
    return <div className="text-center text-xl">Access denied</div>;
  }

  return (
    <div className="bg-blurr-0 mt-10 mx-auto rounded-lg p-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold font-Roboto mb-4 border-b-2 p-2 border-b-slate-700 text-[#ffffffdf]">
        All Users
      </h1>
      <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-[#ffffffc1]">
        {users && users.map(user => (
          <li key={user._id} className="mb-2 p-2 rounded font-Roboto capitalize">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allusers;
