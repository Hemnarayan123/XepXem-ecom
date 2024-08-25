import React, { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import {toast } from "react-hot-toast";
import axios from "axios";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  //........................................................................
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const tokenGetLocalStorage = (serverToken, serverRole) => {
    localStorage.setItem("token", serverToken);
    localStorage.setItem("role", serverRole);
    setToken(serverToken);
    setRole(role);
  };
//...........................................................
  const isSignIn = !!token;
//...........................................................
  const SignoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    toast.error("You have been logged out",{
        duration: 3000,
      });
  };
//...........................................................

const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get('https://xepxem-ecom-backend.vercel.app/api/v1/getProd')
      .then(res => {
        setProducts(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    fetchProducts();
  },[])

  // ........................................................
  const [search, setSearch] = useState();

  return (
    <AuthContext.Provider value={{token, tokenGetLocalStorage, isSignIn, SignoutUser, role, products, fetchProducts, search, setSearch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
