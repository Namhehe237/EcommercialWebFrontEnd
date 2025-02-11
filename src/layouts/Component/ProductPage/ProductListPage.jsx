import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../ProductPage/Filter/Filter";
import ProductList from "../ProductPage/ProductList/ProductList";
import Pagination from "../ProductPage/Pagination/Pagination";
import "../../../style/ProductPage/ProductListPage.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const itemsPerPage = 8; // Adjusted to display 8 products per page
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.cart) {
      setCart(location.state.cart);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ 
          page: currentPage - 1, 
          size: itemsPerPage 
        });
        
        if (category) params.append("category", category);
  
        const response = await fetch(`http://localhost:8080/api/products?${params.toString()}`);
        
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
        const result = await response.json();
        setProducts(result.content || []);
        setTotalPages(result.totalPages || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [currentPage, category]);
  

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      return existingProduct
        ? prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProductClick = (productId) => {
    navigate(`/products/details/${productId}`);
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Products</h1>
        <div
          className="cart"
          onMouseEnter={() => setIsCartVisible(true)}
          onMouseLeave={() => setIsCartVisible(false)}
        >
          Cart ({cart.length})
          {isCartVisible && cart.length > 0 && (
            <div className="cart-dropdown visible">
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <span>(${item.price.toFixed(2)})</span>
                    </div>
                    <div>
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
              <h3 className="cart-total">Total: ${calculateTotalPrice().toFixed(2)}</h3>
              <button
                className="cart-checkout"
                onClick={() => navigate("/cart", { state: { cart } })}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      <Filter category={category} onCategoryChange={handleCategoryChange} />
      <ProductList products={products} onAddToCart={addToCart} onProductClick={handleProductClick} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ProductListPage;
