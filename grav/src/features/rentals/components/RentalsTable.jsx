import React from 'react';
import { FileText } from 'lucide-react';
import { rentalsData } from '../../../data/rentals';

export default function RentalsTable({ openDrawer }) {
  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">المستأجر</th>
              <th className="px-6 py-4">المؤجر</th>
              <th className="px-6 py-4">المعدة</th>
              <th className="px-6 py-4 text-center">المدة</th>
              <th className="px-6 py-4 text-center">الإجمالي (ر.ي)</th>
              <th className="px-6 py-4 text-center">الحالة</th>
              <th className="px-6 py-4 text-center">العقد</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {rentalsData.map((rental) => (
              <tr key={rental.id} className="hover:bg-brand-content/50 transition-colors cursor-pointer" onClick={() => openDrawer(rental)}>
                <td className="px-6 py-4 font-bold text-brand-text-primary" dir="ltr">{rental.id}</td>
                <td className="px-6 py-4">{rental.tenant}</td>
                <td className="px-6 py-4">{rental.owner}</td>
                <td className="px-6 py-4 text-brand-text-muted">{rental.eq}</td>
                <td className="px-6 py-4 text-center font-bold text-brand-text-primary">{rental.duration}</td>
                <td className="px-6 py-4 text-center font-bold text-brand-primary">{rental.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    rental.statusColor === 'pending' ? 'bg-brand-text-muted/10 text-brand-text-muted' :
                    `bg-brand-${rental.statusColor}/10 text-brand-${rental.statusColor}`
                  }`}>
                    {rental.status === 'In Use' ? 'In Use 🔧' : rental.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={(e) => { e.stopPropagation(); openDrawer(rental); }} className="p-1.5 text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض العقد">
                    <FileText size={18} />
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
