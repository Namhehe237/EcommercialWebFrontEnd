import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Failed to load data. Check console for details.</p>;
  }

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      <h1>Products</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Ensure it wraps if the row is too long
          gap: "16px", // Space between cards
        }}
      >
        {data._embedded.products.map((product, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 calc(25% - 16px)", // Adjust the width (e.g., 25% for 4 items per row)
              maxWidth: "calc(25% - 16px)", // Prevents items from growing too large
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
        ))}
      </div>
    </div>
  );
};

export default App;
