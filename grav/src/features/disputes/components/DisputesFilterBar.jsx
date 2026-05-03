import React from 'react';

export default function DisputesFilterBar() {
  return (
    <div className="flex space-x-2 space-x-reverse">
      <select className="border border-brand-border bg-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-brand-primary">
        <option value="">الحالة: الكل</option>
        <option value="open">مفتوحة</option>
        <option value="review">قيد المراجعة</option>
      </select>
    </div>
  );
}
