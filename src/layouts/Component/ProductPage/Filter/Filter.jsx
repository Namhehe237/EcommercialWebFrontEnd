import React from "react";
import "../../../../style/ProductPage/Filter/Filter.css"; // Import the CSS file

const Filter = ({ category, onCategoryChange }) => (
  <div className="filter-container">
    <label htmlFor="category" className="filter-label">
      Filter by Category:
    </label>
    <select
      id="category"
      value={category}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="filter-select"
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
