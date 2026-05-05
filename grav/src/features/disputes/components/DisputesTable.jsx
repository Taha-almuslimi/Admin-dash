import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';
import { Search, ShieldAlert, AlertTriangle } from 'lucide-react';
import usePagination from '../../../hooks/usePagination';

export default function DisputesTable({
  disputes = [],
  loading = false,
  error = false,
  isSearchActive = false,
  onOpenReview
}) {
  const itemsPerPage = 5;
  const {
    currentPage,
    totalPages,
    setPage,
    paginatedData: currentData,
    links,
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

  const renderEmptyState = () => {
    if (error) return <EmptyState icon={AlertTriangle} title="حدث خطأ" description="تعذر تحميل النزاعات من السيرفر." />;
    if (isSearchActive) return <EmptyState icon={Search} title="لا توجد نتائج" description="لا توجد نزاعات مطابقة لبحثك الحالي." />;
    return <EmptyState icon={ShieldAlert} title="لا يوجد نزاعات" description="لا توجد أي نزاعات مفتوحة في النظام." />;
  };

  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <Table
        loading={loading}
        columns={columns}
        data={currentData}
        emptyState={renderEmptyState()}
        renderRow={(dispute) => (
          <tr key={dispute?.id} className="hover:bg-brand-content/50 transition-colors">
            <td className="px-6 py-4 font-bold text-brand-text-primary" dir="ltr">{dispute?.id}</td>
            <td className="px-6 py-4 font-medium text-brand-text-muted">{dispute?.tenant}</td>
            <td className="px-6 py-4 font-medium text-brand-text-muted">{dispute?.owner}</td>
            <td className="px-6 py-4 text-brand-text-muted">{dispute?.eq}</td>
            <td className="px-6 py-4 text-center font-bold text-brand-danger">
              {dispute?.amount?.toLocaleString?.() || '0'}
            </td>
            <td className="px-6 py-4 text-center text-brand-text-muted" dir="ltr">{dispute?.date}</td>
            <td className="px-6 py-4 text-center">
              <Badge unstyled className={`px-2.5 py-1 text-xs font-bold rounded-md ${badgeClass(dispute?.statusColor)}`}>
                {dispute?.status}
              </Badge>
            </td>
            <td className="px-6 py-4 text-center">
              <Button
                unstyled
                onClick={() => onOpenReview?.(dispute)}
                className="text-brand-primary border border-brand-primary hover:bg-brand-primary/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-block"
              >
                مراجعة
              </Button>
            </td>
          </tr>
        )}
      />
      
      {totalPages > 1 && (
        <div className="p-4 border-t border-brand-border flex justify-center bg-brand-content/30">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            links={links}
          />
        </div>
      )}
    </div>
  );
}
