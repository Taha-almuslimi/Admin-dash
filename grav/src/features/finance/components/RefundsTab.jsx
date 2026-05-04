import { useState } from 'react';
import { Search } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import FilterBar from '../../../components/ui/FilterBar';
import EmptyState from '../../../components/ui/EmptyState';
import usePagination from '../../../hooks/usePagination';

export default function RefundsTab() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const itemsPerPage = 5;

  const rows = [1, 2, 3, 4, 5, 6, 7];
  const tenants = ['أحمد محمد', 'ياسر علي', 'خالد عبدالله', 'سالم سعيد', 'مؤسسة السلام', 'شركة البناء', 'علي صالح'];
  const insurances = ['100,000', '50,000', '30,000', '150,000', '80,000', '120,000', '45,000'];
  const refunds = ['100,000', '50,000', '25,000', '150,000', '80,000', '110,000', '45,000'];
  const statuses = [
    { key: 'refunded', label: 'تم الاسترداد', color: 'success' },
    { key: 'processing', label: 'قيد المعالجة', color: 'warning' },
    { key: 'partial', label: 'خصم جزئي', color: 'info' },
  ];

  const filteredRows = rows.filter((i) => {
    const tenantName = tenants[i - 1];
    const status = statuses[i % 3];
    if (search && !tenantName.includes(search)) return false;
    if (statusFilter && status.key !== statusFilter) return false;
    return true;
  });

  const {
    currentPage,
    totalPages,
    setPage,
    paginatedData: currentRows,
  } = usePagination(filteredRows, itemsPerPage);

  const columns = [
    { key: 'tenant', label: 'المستأجر' },
    { key: 'insurance', label: 'مبلغ التأمين الأصلي' },
    { key: 'refund', label: 'المبلغ المُسترَد' },
    { key: 'date', label: 'تاريخ الاسترداد' },
    { key: 'status', label: 'الحالة', className: 'px-6 py-4 text-center' },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="p-4 border-b border-brand-border bg-white">
        <FilterBar
          searchPlaceholder="بحث باسم المستأجر..."
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          filters={[
            { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), options: [{ value: 'refunded', label: 'تم الاسترداد' }, { value: 'processing', label: 'قيد المعالجة' }, { value: 'partial', label: 'خصم جزئي' }] },
          ]}
        />
      </div>
      {currentRows.length === 0 ? (
        <EmptyState icon={Search} title="لا توجد نتائج" description="حاول تغيير معايير البحث" />
      ) : (
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
      )}
      {totalPages > 1 && (
        <div className="p-4 border-t border-brand-border flex justify-center bg-brand-content/30">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
