import React, { useEffect, useState } from "react";
import Filter from "../Component/Filter/Filter";
import ProductList from "../Component/ProductList/ProductList";
import Pagination from "../Component/Pagination/Pagination";

const Home = () => {
  const [products, setProducts] = useState([]); // Store all products
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(""); // "" for all categories
  const itemsPerPage = 12;

  const fetchProducts = async (page, size, category) => {
    try {
      setLoading(true);

      // Construct query parameters
      const params = new URLSearchParams({
        page: page - 1, // Backend uses 0-based index
        size: size,
      });

      if (category) {
        params.append("category", category);
      }

      const response = await fetch(`http://localhost:8080/api/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setProducts(result || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage, category); // Pass correct arguments
  }, [currentPage, category]); // Re-run when currentPage or category changes

  const handleCategoryChange = (value) => {
    setCategory(value); // Update category filter
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // Filter products based on selected category
  const filteredProducts = category
    ? products.filter((product) =>
        product.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  // Calculate dynamic pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      <h1>Products</h1>
      <Filter category={category} onCategoryChange={handleCategoryChange} />
      <ProductList products={paginatedProducts} />
      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Home;
