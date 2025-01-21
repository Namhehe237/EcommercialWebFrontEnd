
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/navBarNFooter/Navbar';
import Footer from './layouts/navBarNFooter/Footer';
import ProductListPage from './layouts/Component/ProductPage/ProductListPage';
import HomePage from './layouts/Component/HomePage/HomePage';
import CartPage from './layouts/Component/CartPage/CartPage';
import { CartProvider } from './context/CartContext';
import RegisterPage from './layouts/Component/RegisterPage/RegisterPage';
import LoginPage from './layouts/Component/LoginPage/LoginPage';



const App = () => {
  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/user/register" element={<RegisterPage />} />
            <Route path="/user/login" element={<LoginPage />} />
            {/* Add more routes here if needed */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};
export default App;