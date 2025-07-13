const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="my-6 flex gap-2 max-w-2xl mx-auto">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        onClick={() => onChange(value)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
