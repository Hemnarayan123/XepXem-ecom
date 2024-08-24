import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom'
import SignOut from './components/Auth/SignOut.jsx';
import ForgetPassword from './components/Auth/ForgetPassword.jsx';
import ResetPassword from './components/Auth/ResetPassword.jsx';
import EmailConfirmation from './components/Pages/EmailConfirmation.jsx';
import Home from './components/Pages/Home.jsx';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Profile from './components/Pages/Profile.jsx';
// import AdminDashboard from './components/Pages/AdminDashboard.jsx';
// import ProtectedRoute from './components/Pages/ProtectedRoute.jsx';
import Contact from './components/Pages/Contact.jsx';
import Allusers from './components/Pages/Allusers.jsx';
import AllProduct from './components/Pages/AllProduct.jsx';
import ProductDetail from './components/Pages/ProductDetail.jsx';
import Cart from './components/Pages/Cart.jsx';
import OrderPage from './components/Pages/OrderPage.jsx';
// import OrderConfirmation from './components/Pages/OrderCon firmation.jsx';
import BuyNowPage from './components/Pages/BuyNowPage.jsx';
import Search from './components/Pages/Search.jsx';






const router = createBrowserRouter([
  {
      path : '/',
      element: <App/>,
      children: [
          { path: '', element : <Home/>},
          { path : '/signin', element: <Login/>},
          { path: '/signup', element: <Signup/> },
          { path: '/signout', element: <SignOut/> },
          { path: '/forget_password', element: <ForgetPassword/> },
          { path: '/reset_password/:id/:token', element: <ResetPassword/> },
          { path: '/email_confirmation', element: <EmailConfirmation/> },
          { path: '/profile', element: <Profile/> }, 
          { path: '/contact', element: <Contact/> }, 
          { path: '/product-detail/:id', element: <ProductDetail/> }, 
          { path: '/cart', element: <Cart/> }, 
          { path: '/orders', element: <OrderPage /> }, 
          // { path: '/order-confirmation', element: <OrderConfirmation /> },
          { path: '/buy-now', element: <BuyNowPage /> }, 
          { path: '/search', element: <Search /> }, 
          // { path: 'dashboard', element: 
          //   <ProtectedRoute roleRequired="admin">
          //     <AdminDashboard />
          //   </ProtectedRoute>
          // },
          { path: '/all-users', element: <Allusers/> }, 
          { path: '/all-products', element: <AllProduct/> }, 
          
      ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
