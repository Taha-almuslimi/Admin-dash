import { Search, MessageSquare } from 'lucide-react';

export default function ComplaintsTable({ onOpenModal }) {
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
        <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
          <option value="">أولوية: الكل</option>
          <option value="high">🔴 عالية</option>
          <option value="normal">⚪ عادية</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">المُبلِّغ</th>
              <th className="px-6 py-4">نوع البلاغ</th>
              <th className="px-6 py-4">الهدف</th>
              <th className="px-6 py-4">التاريخ</th>
              <th className="px-6 py-4 text-center">أولوية</th>
              <th className="px-6 py-4 text-center">الحالة</th>
              <th className="px-6 py-4 text-center">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {[1, 2, 3, 4].map(i => (
              <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-muted" dir="ltr">RPT-00{i}</td>
                <td className="px-6 py-4 font-bold text-brand-text-primary">ياسر علي</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-brand-info/10 text-brand-info rounded-md text-xs font-bold">مستخدم</span>
                </td>
                <td className="px-6 py-4 font-medium">أحمد محمد</td>
                <td className="px-6 py-4 text-brand-text-muted">منذ ساعتين</td>
                <td className="px-6 py-4 text-center">
                  {i === 1 ? <span className="text-brand-danger font-bold text-xs">🔴 عالية</span> : <span className="text-brand-text-muted text-xs">عادية</span>}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-brand-warning/10 text-brand-warning rounded-md text-xs font-bold">جديد</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={onOpenModal} className="border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center">
                    <MessageSquare size={14} className="ml-1" /> معالجة
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
