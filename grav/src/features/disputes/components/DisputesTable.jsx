import React from 'react';

export default function DisputesTable({ disputesData, openReview }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm">
        <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">المستأجر</th>
            <th className="px-6 py-4">المؤجر</th>
            <th className="px-6 py-4">المعدة</th>
            <th className="px-6 py-4 text-center">مبلغ النزاع (ر.ي)</th>
            <th className="px-6 py-4 text-center">تاريخ الفتح</th>
            <th className="px-6 py-4 text-center">الحالة</th>
            <th className="px-6 py-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border">
          {disputesData.map((dispute) => (
            <tr key={dispute.id} className="hover:bg-brand-content/50 transition-colors">
              <td className="px-6 py-4 font-bold text-brand-text-primary" dir="ltr">{dispute.id}</td>
              <td className="px-6 py-4">{dispute.tenant}</td>
              <td className="px-6 py-4">{dispute.owner}</td>
              <td className="px-6 py-4 text-brand-text-muted">{dispute.eq}</td>
              <td className="px-6 py-4 text-center font-bold text-brand-danger">{dispute.amount.toLocaleString()}</td>
              <td className="px-6 py-4 text-center text-brand-text-muted">{dispute.date}</td>
              <td className="px-6 py-4 text-center">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold bg-brand-${dispute.statusColor}/10 text-brand-${dispute.statusColor}`}>
                  {dispute.status === 'مفتوحة' ? '🔴 مفتوحة' : dispute.status === 'قيد المراجعة' ? '⏳ قيد المراجعة' : '✅ محلولة'}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <button 
                  onClick={() => openReview(dispute)}
                  className="bg-brand-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-primary/90 transition-colors shadow-sm inline-flex items-center"
                >
                  مراجعة
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
