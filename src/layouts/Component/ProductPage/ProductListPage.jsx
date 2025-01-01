import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const styles = {
    cartContainer: {
      position: "relative",
    },
    cartButton: {
      cursor: "pointer",
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "#fff",
      borderRadius: "4px",
    },
    cartMenu: {
      display: "none",
      position: "absolute",
      top: "100%",
      right: 0,
      width: "300px",
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
    },
    cartMenuVisible: {
      display: "block",
    },
    cartItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px",
      borderBottom: "1px solid #ddd",
    },
    removeButton: {
      padding: "4px 8px",
      backgroundColor: "#FF4D4F",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "4px",
    },
    addButton: {
      padding: "4px 8px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    checkoutButton: {
      marginTop: "10px",
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100%",
    },
  };

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Products</h1>
        <div
          style={styles.cartContainer}
          className="cart-container"
          onMouseEnter={(e) =>
            (e.currentTarget.children[1].style.display = "block")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.children[1].style.display = "none")
          }
        >
          <div style={styles.cartButton}>Cart ({cart.length})</div>
          {cart.length > 0 && (
            <div style={{ ...styles.cartMenu }}>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {cart.map((item) => (
                  <li key={item.id} style={styles.cartItem}>
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small>Price: ${item.price.toFixed(2)}</small>
                      <br />
                      <small>Quantity: {item.quantity}</small>
                    </div>
                    <div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={styles.removeButton}
                      >
                        -
                      </button>
                      <button
                        onClick={() => addToCart(item)}
                        style={styles.addButton}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <h3 style={{ padding: "8px", textAlign: "center" }}>
                Total: ${calculateTotalPrice().toFixed(2)}
              </h3>
              <button
                style={styles.checkoutButton}
                onClick={() => navigate("/cart", { state: { cart } })}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      <Filter category={category} onCategoryChange={handleCategoryChange} />
      <ProductList products={paginatedProducts} onAddToCart={addToCart} />
      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ProductListPage;
