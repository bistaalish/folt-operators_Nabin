import React from "react";

const SearchONU = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  handleSearchONU,
  searchLoading,
}) => {
  return (
    <div className="flex gap-2 items-center mb-6 flex-wrap">
      <select
        className="p-2 rounded bg-[#222] border border-gray-700 focus:outline-none"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="SN">SN</option>
        <option value="Description">Description</option>
      </select>

      <input
        type="text"
        placeholder={`Search by ${searchType}`}
        className="p-2 rounded bg-[#222] border border-gray-700 focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        onClick={handleSearchONU}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        disabled={searchLoading}
      >
        {searchLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchONU;
