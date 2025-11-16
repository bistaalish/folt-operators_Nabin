import React from "react";

const ConfirmModal = ({ message, onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded shadow-md max-w-sm text-white">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
            disabled={loading}
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600"
            disabled={loading}
          >
            {loading ? "Processing..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
