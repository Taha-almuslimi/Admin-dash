import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';
import { Search } from 'lucide-react';
import usePagination from '../../../hooks/usePagination';

export default function DisputesTable({ disputes, onOpenReview }) {
  const itemsPerPage = 5;
  const {
    currentPage,
    totalPages,
    setPage,
    paginatedData: currentData,
  } = usePagination(disputes, itemsPerPage);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'tenant', label: 'المستأجر' },
    { key: 'owner', label: 'المؤجر' },
    { key: 'eq', label: 'المعدة' },
    { key: 'amount', label: 'مبلغ النزاع (ر.ي)', className: 'px-6 py-4 text-center' },
    { key: 'date', label: 'تاريخ الفتح', className: 'px-6 py-4 text-center' },
    { key: 'status', label: 'الحالة', className: 'px-6 py-4 text-center' },
    { key: 'actions', label: 'الإجراءات', className: 'px-6 py-4 text-center' },
  ];

  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      {currentData.length === 0 ? (
        <EmptyState icon={Search} title="لا توجد نتائج" description="حاول تغيير معايير البحث" />
      ) : (
      <Table
        columns={columns}
        data={currentData}
        renderRow={(dispute) => (
          <tr key={dispute.id} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-primary" dir="ltr">{dispute.id}</td>
                <td className="px-6 py-4">{dispute.tenant}</td>
                <td className="px-6 py-4">{dispute.owner}</td>
                <td className="px-6 py-4 text-brand-text-muted">{dispute.eq}</td>
                <td className="px-6 py-4 text-center font-bold text-brand-danger">{dispute.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-center text-brand-text-muted">{dispute.date}</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeClass(dispute.statusColor)}`}>
                    {dispute.status === 'مفتوحة' ? '🔴 مفتوحة' : dispute.status === 'قيد المراجعة' ? '⏳ قيد المراجعة' : '✅ محلولة'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button
                    unstyled
                    onClick={() => onOpenReview(dispute)}
                    className="bg-brand-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-primary/90 transition-colors shadow-sm inline-flex items-center"
                  >
                    مراجعة
                  </Button>
                </td>
              </tr>
        )}
      />
      )}
      {totalPages > 1 && (
        <div className="p-4 border-t border-brand-border flex justify-center bg-brand-content/30">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        </div>
      )}
    </div>
  );
}
