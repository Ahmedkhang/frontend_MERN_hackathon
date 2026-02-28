"use client";

import React from "react";
import { useToast } from "./ToastContext";

export const ToastDemo: React.FC = () => {
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Toast Notifications Demo
      </h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => showSuccess("Login successful!")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Success Toast
        </button>
        <button
          onClick={() => showError("Failed to upload file")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Error Toast
        </button>
        <button
          onClick={() => showInfo("New update available")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Info Toast
        </button>
        <button
          onClick={() => showWarning("Session expiring soon")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Warning Toast
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">
        Use Cases
      </h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => showSuccess("File uploaded successfully!")}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Upload Success
        </button>
        <button
          onClick={() => showSuccess("Item deleted successfully!")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Delete Success
        </button>
        <button
          onClick={() => showSuccess("Changes saved successfully!")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Save Success
        </button>
        <button
          onClick={() => showError("Invalid credentials")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Login Error
        </button>
      </div>
    </div>
  );
};
