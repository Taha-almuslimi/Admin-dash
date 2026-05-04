import { useState } from 'react';
import Badge from '../../../components/ui/Badge';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';

export default function ProfitsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const currentRows = rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: 'owner', label: 'المؤجر' },
    { key: 'count', label: 'عدد العمليات', className: 'px-6 py-4 text-center' },
    { key: 'profits', label: 'إجمالي الأرباح' },
    { key: 'status', label: 'حالة التحويل', className: 'px-6 py-4 text-center' },
  ];

  const owners = ['مؤسسة التقنية', 'شركة البناء الحديثة', 'أحمد محمد', 'شركة الإعمار', 'مؤسسة النقل', 'علي صالح', 'شركة السلام', 'مؤسسة الأمل'];
  const amounts = ['450,000', '320,000', '180,000', '750,000', '95,000', '210,000', '560,000', '140,000'];
  const statuses = [
    { label: 'Processing', color: 'info' },
    { label: 'تم التحويل', color: 'success' },
    { label: 'معلق', color: 'warning' },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <Table
        columns={columns}
        data={currentRows}
        renderRow={(i) => (
          <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-primary">{owners[i - 1]}</td>
                <td className="px-6 py-4 text-center font-medium">{8 + i * 3}</td>
                <td className="px-6 py-4 font-bold text-brand-success">{amounts[i - 1]} ر.ي</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-2.5 py-1 bg-brand-${statuses[i % 3].color}/10 text-brand-${statuses[i % 3].color} rounded-md text-xs font-bold`}>{statuses[i % 3].label}</Badge>
                </td>
              </tr>
        )}
      />
      {totalPages > 1 && (
        <div className="p-4 border-t border-brand-border flex justify-center bg-brand-content/30">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}
