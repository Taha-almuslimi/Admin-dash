import { useState } from 'react';
import { Search } from 'lucide-react';
import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import FilterBar from '../../../components/ui/FilterBar';
import EmptyState from '../../../components/ui/EmptyState';
import usePagination from '../../../hooks/usePagination';
import { isPaginatedSource, rowsFromSource, sourceWithRows } from '../../../utils/dataSource';

export default function ProfitsTab({ rows = [], loading = false }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const itemsPerPage = 5;
  const isServerPaginated = isPaginatedSource(rows);
  const sourceRows = rowsFromSource(rows);

  const filteredRows = isServerPaginated ? sourceRows : sourceRows.filter((row) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || row?.owner?.toLowerCase?.().includes(q);
    const matchesStatus = !statusFilter || row?.statusKey === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const {
    currentPage,
    totalPages,
    setPage,
    paginatedData: currentRows,
    links,
  } = usePagination(sourceWithRows(rows, filteredRows), itemsPerPage);

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
        loading={loading}
        columns={columns}
        data={currentRows}
        renderRow={(row, i) => (
          <tr key={row?.id || i} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-primary">{row?.owner}</td>
                <td className="px-6 py-4 text-center font-medium">{row?.count}</td>
                <td className="px-6 py-4 font-bold text-brand-success">{row?.profits} ر.ي</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeClass(row?.statusColor)}`}>{row?.status}</Badge>
                </td>
              </tr>
        )}
      />
      )}
      {totalPages > 1 && (
        <div className="p-4 border-t border-brand-border flex justify-center bg-brand-content/30">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} links={links} />
        </div>
      )}
    </div>
  );
}
