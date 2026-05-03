import React from 'react';

export default function ComplaintsTable() {
  return (
    <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-brand-text-primary">آخر البلاغات</h3>
        <button className="text-brand-info text-sm font-medium hover:underline">عرض الكل</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium">
            <tr>
              <th className="py-3 px-4 rounded-r-lg">#</th>
              <th className="py-3 px-4">المُبلِّغ</th>
              <th className="py-3 px-4">نوع البلاغ</th>
              <th className="py-3 px-4">التاريخ</th>
              <th className="py-3 px-4 rounded-l-lg text-center">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {[1, 2, 3].map(i => (
              <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="py-3 px-4 text-brand-text-muted">#R-80{i}</td>
                <td className="py-3 px-4 font-medium">ياسر علي</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-brand-warning/10 text-brand-warning rounded-md text-xs font-bold">سلوك مسيء</span>
                </td>
                <td className="py-3 px-4 text-brand-text-muted">منذ ساعتين</td>
                <td className="py-3 px-4 text-center">
                  <button className="border border-brand-primary text-brand-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-primary/10 transition-colors inline-flex items-center">
                    معالجة
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
