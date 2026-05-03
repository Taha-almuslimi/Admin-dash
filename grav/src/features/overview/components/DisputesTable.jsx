import React from 'react';
import { Eye } from 'lucide-react';

export default function DisputesTable() {
  return (
    <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-brand-text-primary">آخر النزاعات</h3>
        <button className="text-brand-info text-sm font-medium hover:underline">عرض الكل</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium">
            <tr>
              <th className="py-3 px-4 rounded-r-lg">#</th>
              <th className="py-3 px-4">المستأجر</th>
              <th className="py-3 px-4">المؤجر</th>
              <th className="py-3 px-4">المعدة</th>
              <th className="py-3 px-4">المبلغ</th>
              <th className="py-3 px-4 rounded-l-lg text-center">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {[1, 2, 3].map(i => (
              <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="py-3 px-4 text-brand-text-muted">#D-10{i}</td>
                <td className="py-3 px-4 font-medium">أحمد محمد</td>
                <td className="py-3 px-4 font-medium">شركة البناء</td>
                <td className="py-3 px-4">حفار بوكلين</td>
                <td className="py-3 px-4 font-bold text-brand-danger">45,000 ر.ي</td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-brand-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-primary/90 transition-colors inline-flex items-center">
                    <Eye size={14} className="ml-1"/> مراجعة
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
