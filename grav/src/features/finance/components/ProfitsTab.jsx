import { useState } from 'react';
import { Search } from 'lucide-react';
import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import FilterBar from '../../../components/ui/FilterBar';
import EmptyState from '../../../components/ui/EmptyState';
import usePagination from '../../../hooks/usePagination';

export default function ProfitsTab() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const itemsPerPage = 5;

  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const owners = ['مؤسسة التقنية', 'شركة البناء الحديثة', 'أحمد محمد', 'شركة الإعمار', 'مؤسسة النقل', 'علي صالح', 'شركة السلام', 'مؤسسة الأمل'];
  const amounts = ['450,000', '320,000', '180,000', '750,000', '95,000', '210,000', '560,000', '140,000'];
  const statuses = [
    { key: 'processing', label: 'Processing', color: 'info' },
    { key: 'completed', label: 'تم التحويل', color: 'success' },
    { key: 'pending', label: 'معلق', color: 'warning' },
  ];

  const filteredRows = rows.filter((i) => {
    const ownerName = owners[i - 1];
    const status = statuses[i % 3];
    if (search && !ownerName.includes(search)) return false;
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
    { key: 'owner', label: 'المؤجر' },
    { key: 'count', label: 'عدد العمليات', className: 'px-6 py-4 text-center' },
    { key: 'profits', label: 'إجمالي الأرباح' },
    { key: 'status', label: 'حالة التحويل', className: 'px-6 py-4 text-center' },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="p-4 border-b border-brand-border bg-white">
        <FilterBar
          searchPlaceholder="بحث باسم المؤجر..."
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          filters={[
            { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), options: [{ value: 'processing', label: 'Processing' }, { value: 'completed', label: 'تم التحويل' }, { value: 'pending', label: 'معلق' }] },
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
                <td className="px-6 py-4 font-bold text-brand-text-primary">{owners[i - 1]}</td>
                <td className="px-6 py-4 text-center font-medium">{8 + i * 3}</td>
                <td className="px-6 py-4 font-bold text-brand-success">{amounts[i - 1]} ر.ي</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeClass(statuses[i % 3].color)}`}>{statuses[i % 3].label}</Badge>
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
