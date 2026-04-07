function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search product..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}

export default SearchBar;