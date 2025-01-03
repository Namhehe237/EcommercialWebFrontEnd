import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../ProductPage/Filter/Filter";
import ProductList from "../ProductPage/ProductList/ProductList";
import Pagination from "../ProductPage/Pagination/Pagination";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]);
  const itemsPerPage = 12;

  const navigate = useNavigate();
  const location = useLocation();

  // Restore cart state if available from location
  useEffect(() => {
    if (location.state?.cart) {
      setCart(location.state.cart);
    }
  }, [location.state]);

  const fetchProducts = async (page, size, category) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page - 1,
        size: size,
      });
      if (category) {
        params.append("category", category);
      }
      const response = await fetch(`http://localhost:8080/api/products?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setProducts(result || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage, category);
  }, [currentPage, category]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        { ...product, quantity: 1 },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredProducts = category
    ? products.filter((product) =>
      product.category.toLowerCase() === category.toLowerCase()
    )
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Products</h1>
        <div
          style={{ position: "relative" }}
          onMouseEnter={(e) => (e.currentTarget.children[1].style.display = "block")}
          onMouseLeave={(e) => (e.currentTarget.children[1].style.display = "none")}
        >
          <div style={{ cursor: "pointer", padding: "10px", backgroundColor: "#007BFF", color: "#fff" }}>
            Cart ({cart.length})
          </div>
          {cart.length > 0 && (
            <div style={{
              display: "none",
              position: "absolute",
              top: "100%",
              right: 0,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 10,
              width: "300px"
            }}>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "Arial, sans-serif",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div style={{ flex: "1" }}>
                      <strong style={{ fontSize: "16px", color: "#333" }}>{item.name}</strong>
                      <br />
                      <span style={{ fontSize: "14px", color: "#555" }}>
                        (${item.price.toFixed(2)})
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#ff4d4f",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        -
                      </button>
                      <span
                        style={{
                          padding: "4px 12px",
                          fontSize: "14px",
                          color: "#333",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          backgroundColor: "#fff",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <h3
                style={{
                  marginTop: "16px",
                  fontSize: "18px",
                  color: "#333",
                  textAlign: "right",
                }}
              >
                Total: ${calculateTotalPrice().toFixed(2)}
              </h3>
              <button
                onClick={() => navigate("/cart", { state: { cart } })}
                style={{
                  display: "block",
                  marginTop: "16px",
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Checkout
              </button>

            </div>
          )}
        </div>
      </div>
      <Filter category={category} onCategoryChange={handleCategoryChange} />
      <ProductList products={paginatedProducts} onAddToCart={addToCart} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ProductListPage;
