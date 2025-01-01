import React from "react";

const Filter = ({ category, onCategoryChange }) => (
  <div style={{ marginBottom: "16px" }}>
    <label htmlFor="category" style={{ marginRight: "8px" }}>
      Filter by Category:
    </label>
    <select
      id="category"
      value={category}
      onChange={(e) => onCategoryChange(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
      }}
    >
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Clothing">Clothing</option>
      <option value="Home">Home</option>
      <option value="Accessories">Accessories</option>
      <option value="Sports">Sports</option>
      {/* Add more categories as needed */}
    </select>
  </div>
);

export default Filter;
