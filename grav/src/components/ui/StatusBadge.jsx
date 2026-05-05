import React from 'react';
import Badge from './Badge';
import { badgeClass, badgeSolidClass } from '../../utils/statusClasses';

export default function StatusBadge({ status, color, solid = false, className = '' }) {
  if (!status) return null;
  
  const baseClass = solid ? badgeSolidClass(color) : badgeClass(color);
  
  return (
    <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold ${baseClass} ${className}`}>
      {status}
    </Badge>
  );
}
