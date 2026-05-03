import React from 'react';

export default function KpisTable() {
  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <div className="p-4 border-b border-brand-border bg-brand-content/30">
        <h3 className="text-lg font-bold text-brand-text-primary">جدول المؤشرات الرئيسية (KPIs)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
            <tr>
              <th className="px-6 py-4">المؤشر</th>
              <th className="px-6 py-4 text-center">القيمة الحالية</th>
              <th className="px-6 py-4 text-center">الهدف</th>
              <th className="px-6 py-4 text-center">الفارق</th>
              <th className="px-6 py-4 text-center">التقييم</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border font-bold">
            <tr className="hover:bg-brand-content/50 transition-colors">
              <td className="px-6 py-4">معدل إكمال العمليات</td>
              <td className="px-6 py-4 text-center text-brand-text-primary">87%</td>
              <td className="px-6 py-4 text-center text-brand-text-muted">90%</td>
              <td className="px-6 py-4 text-center text-brand-warning">-3%</td>
              <td className="px-6 py-4 text-center text-lg">🟡</td>
            </tr>
            <tr className="hover:bg-brand-content/50 transition-colors">
              <td className="px-6 py-4">معدل النزاعات</td>
              <td className="px-6 py-4 text-center text-brand-success">3.2%</td>
              <td className="px-6 py-4 text-center text-brand-text-muted">&lt; 5%</td>
              <td className="px-6 py-4 text-center text-brand-success">✅</td>
              <td className="px-6 py-4 text-center text-lg">🟢</td>
            </tr>
            <tr className="hover:bg-brand-content/50 transition-colors">
              <td className="px-6 py-4">معدل الإلغاء</td>
              <td className="px-6 py-4 text-center text-brand-success">8%</td>
              <td className="px-6 py-4 text-center text-brand-text-muted">&lt; 10%</td>
              <td className="px-6 py-4 text-center text-brand-success">✅</td>
              <td className="px-6 py-4 text-center text-lg">🟢</td>
            </tr>
            <tr className="hover:bg-brand-content/50 transition-colors">
              <td className="px-6 py-4">متوسط تقييم المؤجرين</td>
              <td className="px-6 py-4 text-center text-brand-success">4.5 / 5</td>
              <td className="px-6 py-4 text-center text-brand-text-muted">&gt; 4.0</td>
              <td className="px-6 py-4 text-center text-brand-success">✅</td>
              <td className="px-6 py-4 text-center text-lg">🟢</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
