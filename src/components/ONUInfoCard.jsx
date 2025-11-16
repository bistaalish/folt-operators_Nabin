import React from "react";

const ONUInfoCard = ({
  searchResult,
  actionLoading,
  handleRebootClick,
  handleDeleteClick,
}) => {
  return (
    <div className="bg-[#1b1b1b] p-6 rounded shadow-md border border-gray-700 max-w-md">
      <h3 className="text-xl font-bold mb-3">ONU Info</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(searchResult).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>

      <div className="flex gap-3 mt-4 flex-wrap">
        <button
          onClick={handleRebootClick}
          className={`px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 ${
            actionLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={actionLoading}
        >
          {actionLoading ? "Processing..." : "Reboot"}
        </button>

        <button
          onClick={handleDeleteClick}
          className={`px-4 py-2 rounded bg-red-500 hover:bg-red-600 ${
            actionLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={actionLoading}
        >
          {actionLoading ? "Processing..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ONUInfoCard;
