import React from "react";

const ProductList = ({ products }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {products.length > 0 ? (
        products.map((product, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 calc(25% - 16px)",
              maxWidth: "calc(25% - 16px)",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ fontSize: "1.2rem" }}>{product.name}</h2>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
                marginBottom: "12px",
              }}
            />
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
