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
import ProductReviewPage from './layouts/Component/ProductReviewPage/ProductReviewPage';
import CheckoutSuccessPage from './layouts/Component/CheckOutSuccessPage/CheckOutSuccessPage';
import ForgetPasswordPage from './layouts/Component/ForgetPasswordPage/ForgetPasswordPage';
import ChangePasswordPage from './layouts/Component/ChangePasswordPage/ChangePasswordPage';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="main-content"> {/* Wrap content with main-content class */}
          <Navbar />
          <div className="content">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/user/register" element={<RegisterPage />} />
              <Route path="/user/login" element={<LoginPage />} />
              <Route path="/user/change-password" element={<ChangePasswordPage />} />
              <Route path="/user/forgot-password" element={<ForgetPasswordPage />} />
              <Route path="/products/details/:productId" element={<ProductReviewPage />} />
              <Route path="/products/success" element={<CheckoutSuccessPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
