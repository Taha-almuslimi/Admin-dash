import React from 'react';

export default function Input({ className = '', error, ...props }) {
  return (
    <div className="w-full">
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 text-sm transition-colors ${
          error 
            ? 'border-brand-danger focus:ring-brand-danger bg-brand-danger/5' 
            : 'border-brand-border focus:ring-brand-primary bg-white focus:border-brand-primary'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-brand-danger mt-1 block font-bold">{error}</span>}
    </div>
  );
}
