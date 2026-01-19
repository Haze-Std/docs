export default SearchBar = ({ placeholder }) => {
  return (
    <div className="relative max-w-xl mx-auto mb-20">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-5 py-3 pl-11 text-[15px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
          ⌘K
        </div>
      </div>
    </div>
  );
};
