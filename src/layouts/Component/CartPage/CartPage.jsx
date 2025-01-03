import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { state } = useLocation();
  const cart = state?.cart || [];
  const navigate = useNavigate();

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
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
                  <span style={{ fontSize: "14px", color: "#555", marginLeft: "8px" }}>
                    (${item.price.toFixed(2)})
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#333",
                    backgroundColor: "#f0f0f0",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                >
                  Quantity: {item.quantity}
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
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <button
              onClick={() => navigate("/products", { state: { cart } })}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Return to Products
            </button>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                textAlign: "center",
                marginLeft: "8px",
              }}
            >
              Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;
