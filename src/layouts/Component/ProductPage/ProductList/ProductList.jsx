import React from "react";
import "../../../../../src/style/ProductPage/ProductList/ProductList.css"; // Import the CSS file

const ProductList = ({ products, onAddToCart, onProductClick }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id} // Use `product.id` as the unique key
            className="product-card"
            onClick={() => onProductClick(product.id)} // Navigate to product details on card click
          >
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the `onClick` event for the card
                onAddToCart(product); // Add product to the cart
              }}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p className="no-products">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
