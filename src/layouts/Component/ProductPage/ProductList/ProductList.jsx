import React from "react";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Responsive grid with min-width for items
        gap: "16px",
        padding: "16px",
      }}
    >
      {products.length > 0 ? (
        products.map((product, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s, box-shadow 0.2s",
              height: "auto", // Allow cards to grow based on content
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"} // Hover effect
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            <h2 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>{product.name}</h2>
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
            {/* Add "Add to Cart" button below the category */}
            <button
              onClick={() => onAddToCart(product)}
              style={{
                marginTop: "auto", // Push the button to the bottom
                padding: "8px 16px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "center",
                width: "100%", // Make the button full width
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"} // Button hover effect
              onMouseLeave={(e) => e.target.style.backgroundColor = "#007BFF"}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
