import { Search, Calendar, StopCircle } from 'lucide-react';

export default function PaymentsTab() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="p-4 border-b border-brand-border bg-white flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <input 
            type="text" 
            placeholder="بحث..." 
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-brand-border bg-brand-content focus:outline-none focus:border-brand-primary text-sm"
          />
          <Search className="absolute right-3 top-2.5 text-brand-text-muted" size={18} />
        </div>
        <div className="flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted cursor-pointer hover:border-brand-primary transition-colors">
          <Calendar size={16} />
          <span>تاريخ الدفع</span>
        </div>
        <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
          <option value="">حالة الدفع: الكل</option>
          <option value="paid">مكتمل</option>
          <option value="pending">معلق</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">المستأجر</th>
              <th className="px-6 py-4">المعدة</th>
              <th className="px-6 py-4">مبلغ الإيجار</th>
              <th className="px-6 py-4">مبلغ التأمين</th>
              <th className="px-6 py-4">تاريخ الدفع</th>
              <th className="px-6 py-4 text-center">الحالة</th>
              <th className="px-6 py-4 text-center">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {[1, 2, 3, 4].map(i => (
              <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold" dir="ltr">TRX-00{i}</td>
                <td className="px-6 py-4 font-medium">أحمد محمد</td>
                <td className="px-6 py-4 text-brand-text-muted">حفار JCB</td>
                <td className="px-6 py-4 font-bold text-brand-primary">15,000 ر.ي</td>
                <td className="px-6 py-4 font-medium">50,000 ر.ي</td>
                <td className="px-6 py-4 text-brand-text-muted" dir="ltr">2024-05-1{i}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-brand-success/10 text-brand-success rounded-md text-xs font-bold">مكتمل</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-brand-danger hover:bg-brand-danger/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center">
                    <StopCircle size={14} className="ml-1" /> إيقاف/مراجعة
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
