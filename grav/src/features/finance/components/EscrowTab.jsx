import React from 'react';
import { PauseCircle } from 'lucide-react';

export default function EscrowTab() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="p-6 border-b border-brand-border bg-brand-content/30 flex justify-between items-center">
        <div>
          <p className="text-brand-text-muted text-sm mb-1">إجمالي المحتجز</p>
          <p className="text-2xl font-bold text-brand-warning">2,450,000 ر.ي</p>
        </div>
        <div className="text-left">
          <p className="text-brand-text-muted text-sm mb-1">عدد العمليات المفتوحة</p>
          <p className="text-2xl font-bold text-brand-text-primary">34</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
            <tr>
              <th className="px-6 py-4">عملية</th>
              <th className="px-6 py-4">مبلغ محتجز</th>
              <th className="px-6 py-4">منذ</th>
              <th className="px-6 py-4 text-center">الحالة</th>
              <th className="px-6 py-4 text-center">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {[1, 2, 3].map(i => (
              <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold" dir="ltr">OP-2024-08{i}</td>
                <td className="px-6 py-4 font-bold text-brand-warning">150,000 ر.ي</td>
                <td className="px-6 py-4 text-brand-text-muted">12 مايو 2024</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-brand-warning/10 text-brand-warning rounded-md text-xs font-bold">In Use</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-brand-danger border border-brand-danger hover:bg-brand-danger/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center">
                    <PauseCircle size={14} className="ml-1" /> تعليق الأموال
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
