import React, { useState, useEffect } from "react";
import "../../../../style/ProductPage/Filter/Filter.css";

const Filter = ({ category, onCategoryChange }) => {
  const [categories, setCategories] = useState([
    "Electronics",
    "Clothing",
    "Home",
    "Accessories",
    "Sports",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
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
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
