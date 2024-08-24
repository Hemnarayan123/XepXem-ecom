import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './components/context/AuthToken'
import Header from './components/Pages/Header'
import Footer from './components/Pages/Footer'
import { CartProvider } from './components/context/CartContext'
import { OrderProvider } from './components/context/OrderContext'


function App() {

  return (
<>
<Toaster />
<AuthProvider>
  <CartProvider>
  <OrderProvider>
<Header/>
<Outlet />
<Footer/>
</OrderProvider>
</CartProvider>
</AuthProvider>

</> 
  )
}

export default App
