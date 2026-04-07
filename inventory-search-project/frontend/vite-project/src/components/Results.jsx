function highlightText(text, query) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-yellow-200">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function Results({ results, query }) {
  if (results.length === 0) {
    return (
      <div className="text-center mt-6 text-gray-500">
        🔍 No items found. Try different filters.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {results.map(item => (
        <div key={item.id} className="border p-4 rounded-lg shadow">
          <h4 className="text-blue-600 font-semibold">
            {highlightText(item.productName, query)}
          </h4>
          <p>{item.category} • ${item.price}</p>
          <p className="text-sm text-gray-500">{item.supplier}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;