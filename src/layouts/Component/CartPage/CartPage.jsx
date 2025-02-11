import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import "../../../style/CartPage/CartPage.css";

const CartPage = () => {
  const { state } = useLocation();
  const cart = state?.cart || [];
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      setOpenDialog(true); // Open the dialog if not logged in
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/products/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });

      if (response.ok) {
        const responseData = await response.text();
        console.log("Response from backend:", responseData);
        navigate("/products/success", { state: { responseData } });
      } else {
        console.error("Failed to process checkout:", response.statusText);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="cart-header">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map((item) => (
              <li className="cart-item" key={item.id}>
                <div>
                  <strong className="cart-item-name">{item.name}</strong>
                  <span className="cart-item-price">(${item.price.toFixed(2)})</span>
                </div>
                <div className="cart-item-quantity">Quantity: {item.quantity}</div>
              </li>
            ))}
          </ul>
          <h3 className="total-price">
            Total: ${calculateTotalPrice().toFixed(2)}
          </h3>
          <div className="button-group">
            <button
              onClick={() => navigate("/products", { state: { cart } })}
              className="button return"
            >
              Return to Products
            </button>
            <button onClick={handleCheckout} className="button checkout">
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Dialog for login warning */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <p>You need to log in to proceed to checkout.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/user/login")} color="primary">
            Log In
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CartPage;
