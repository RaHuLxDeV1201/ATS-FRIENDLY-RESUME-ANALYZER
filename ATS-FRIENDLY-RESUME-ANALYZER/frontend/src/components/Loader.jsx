import React from 'react';

export default function Loader({ message = "Processing...", size = "md" }) {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className={`${sizes[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}></div>
      {message && <p className="text-sm font-medium text-gray-600">{message}</p>}
    </div>
  );
}
