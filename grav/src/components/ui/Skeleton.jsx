import React from 'react';

export default function Skeleton({ className = '', variant = 'rectangular' }) {
  const baseClass = 'animate-pulse bg-brand-border/40';
  
  const variants = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded',
  };

  return (
    <div className={`${baseClass} ${variants[variant] || variants.rectangular} ${className}`} />
  );
}
