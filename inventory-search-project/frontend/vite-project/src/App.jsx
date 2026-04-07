import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Results from "./components/Results";

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delay);
  }, [query, category, minPrice, maxPrice, page]);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/search", {
        params: { q: query, category, minPrice, maxPrice, page, limit: 5 }
      });

      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Inventory Search
        </h2>

        <SearchBar query={query} setQuery={setQuery} />

        <Filters
          category={category}
          setCategory={setCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={fetchData}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
          >
            Search
          </button>

          <button
            onClick={resetFilters}
            className="flex-1 bg-gray-300 py-2 rounded-lg"
          >
            Clear
          </button>
        </div>

        {/* Loading + Error */}
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Results */}
        <Results results={results?.data || []} query={query} />

        {/* Pagination */}
        {results?.total > 5 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Prev
            </button>

            <span>Page {page}</span>

            <button
              disabled={page * 5 >= results.total}
              onClick={() => setPage(prev => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;