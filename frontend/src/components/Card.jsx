import React from 'react';

export default function Card({ title, subtitle, badge, children, className = "", headerAction }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 ${className}`}>
      {(title || subtitle || badge || headerAction) && (
        <div className="flex items-start justify-between border-b border-gray-50 pb-4">
          <div>
            {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {badge && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {badge}
              </span>
            )}
            {headerAction}
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
