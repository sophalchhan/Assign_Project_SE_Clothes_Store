// pages/SearchResults.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Your existing product card component

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search");

    if (query) {
      performSearch(query);
    }
  }, [location]);

  const performSearch = async (query) => {
    setLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search Results</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <p>Found {searchResults.length} results</p>
          <div className="row">
            {searchResults.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;