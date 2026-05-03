export default function ProfitsTab() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
            <tr>
              <th className="px-6 py-4">المؤجر</th>
              <th className="px-6 py-4 text-center">عدد العمليات</th>
              <th className="px-6 py-4">إجمالي الأرباح</th>
              <th className="px-6 py-4 text-center">حالة التحويل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {[1, 2, 3].map(i => (
              <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-primary">مؤسسة التقنية</td>
                <td className="px-6 py-4 text-center font-medium">12</td>
                <td className="px-6 py-4 font-bold text-brand-success">450,000 ر.ي</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2.5 py-1 bg-brand-info/10 text-brand-info rounded-md text-xs font-bold">Processing</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
