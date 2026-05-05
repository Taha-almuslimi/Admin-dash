import React from 'react';

export default function Label({ children, className = '', required = false, ...props }) {
  return (
    <label className={`block text-sm font-bold text-brand-text-primary mb-2 ${className}`} {...props}>
      {children}
      {required && <span className="text-brand-danger ml-1">*</span>}
    </label>
  );
}
