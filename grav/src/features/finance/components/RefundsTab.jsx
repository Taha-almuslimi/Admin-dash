import { useState } from 'react';
import Badge from '../../../components/ui/Badge';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';

export default function RefundsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const rows = [1, 2, 3, 4, 5, 6, 7];
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const currentRows = rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: 'tenant', label: 'المستأجر' },
    { key: 'insurance', label: 'مبلغ التأمين الأصلي' },
    { key: 'refund', label: 'المبلغ المُسترَد' },
    { key: 'date', label: 'تاريخ الاسترداد' },
    { key: 'status', label: 'الحالة', className: 'px-6 py-4 text-center' },
  ];

  const tenants = ['أحمد محمد', 'ياسر علي', 'خالد عبدالله', 'سالم سعيد', 'مؤسسة السلام', 'شركة البناء', 'علي صالح'];
  const insurances = ['100,000', '50,000', '30,000', '150,000', '80,000', '120,000', '45,000'];
  const refunds = ['100,000', '50,000', '25,000', '150,000', '80,000', '110,000', '45,000'];
  const statuses = [
    { label: 'تم الاسترداد', color: 'success' },
    { label: 'قيد المعالجة', color: 'warning' },
    { label: 'خصم جزئي', color: 'info' },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <Table
        columns={columns}
        data={currentRows}
        renderRow={(i) => (
          <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-primary">{tenants[i - 1]}</td>
                <td className="px-6 py-4 font-medium text-brand-text-muted">{insurances[i - 1]} ر.ي</td>
                <td className="px-6 py-4 font-bold text-brand-success">{refunds[i - 1]} ر.ي</td>
                <td className="px-6 py-4 text-brand-text-muted" dir="ltr">2024-05-{String(i + 10).padStart(2, '0')}</td>
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
