import React from "react";
import "../../../../../src/style/ProductPage/ProductList/ProductList.css"; // Import the CSS file

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className="product-card">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Price:</strong> {product.price}$
            </p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <p className="no-products">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
