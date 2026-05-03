export default function RefundsTab() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
            <tr>
              <th className="px-6 py-4">المستأجر</th>
              <th className="px-6 py-4">مبلغ التأمين الأصلي</th>
              <th className="px-6 py-4">المبلغ المُسترَد</th>
              <th className="px-6 py-4">تاريخ الاسترداد</th>
              <th className="px-6 py-4 text-center">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {[1, 2, 3].map(i => (
              <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-primary">أحمد محمد</td>
                <td className="px-6 py-4 font-medium text-brand-text-muted">100,000 ر.ي</td>
                <td className="px-6 py-4 font-bold text-brand-success">100,000 ر.ي</td>
                <td className="px-6 py-4 text-brand-text-muted" dir="ltr">2024-05-1{i}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-brand-success/10 text-brand-success rounded-md text-xs font-bold">تم الاسترداد</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
