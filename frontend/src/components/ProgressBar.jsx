import React from 'react';

export default function ProgressBar({ label, percentage = 0, color = "blue", showPercentage = true }) {
  const colorMap = {
    blue: "bg-blue-600",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    purple: "bg-purple-600",
    red: "bg-red-500"
  };

  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="space-y-1.5 w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
          <span>{label}</span>
          {showPercentage && <span>{clampedPercentage}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${colorMap[color] || 'bg-blue-600'}`} 
          style={{ width: `${clampedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
