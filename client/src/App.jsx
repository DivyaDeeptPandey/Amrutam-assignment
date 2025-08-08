import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepage/Homepage';
import ProductListing from './pages/ProductListing/ProductListing';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import Login from './pages/Login/Login.';
import Signup from './pages/Signup/Signup';
import Checkout from './pages/Checkout/Checkout';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';

function App() {

  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />

        {/* other routes */}
      </Routes>


  )
}

export default App
