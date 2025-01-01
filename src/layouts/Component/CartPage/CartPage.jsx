import React from 'react';
import { useLocation } from 'react-router-dom';

const CartPage = () => {
  const { state } = useLocation();
  const cart = state?.cart || []; // Access the cart from the state

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #ddd' }}>
                <div>
                  <strong>{item.name}</strong>
                  <br />
                  <small>Price: ${item.price.toFixed(2)}</small>
                  <br />
                  <small>Quantity: {item.quantity}</small>
                </div>
              </li>
            ))}
          </ul>
          <h3 style={{ padding: '8px', textAlign: 'center' }}>
            Total: ${calculateTotalPrice().toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
