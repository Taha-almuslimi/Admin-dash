import { FileText, Search, AlertTriangle, ShieldAlert } from 'lucide-react';
import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';
import usePagination from '../../../hooks/usePagination';

export default function RentalsTable({ 
  rentals = [], 
  loading = false,
  error = false,
  isSearchActive = false,
  onOpenDrawer 
}) {
  const itemsPerPage = 5;
  const {
    currentPage,
    totalPages,
    setPage,
    paginatedData: currentData,
    links,
  } = usePagination(rentals, itemsPerPage);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'tenant', label: 'المستأجر' },
    { key: 'owner', label: 'المؤجر' },
    { key: 'eq', label: 'المعدة' },
    { key: 'duration', label: 'المدة', className: 'px-6 py-4 text-center' },
    { key: 'total', label: 'الإجمالي (ر.ي)', className: 'px-6 py-4 text-center' },
    { key: 'status', label: 'الحالة', className: 'px-6 py-4 text-center' },
    { key: 'contract', label: 'العقد', className: 'px-6 py-4 text-center' },
  ];

  const renderEmptyState = () => {
    if (error) return <EmptyState icon={AlertTriangle} title="حدث خطأ" description="تعذر تحميل التأجيرات من السيرفر." />;
    if (isSearchActive) return <EmptyState icon={Search} title="لا توجد نتائج" description="لا توجد عمليات تأجير مطابقة لبحثك الحالي." />;
    return <EmptyState icon={ShieldAlert} title="لا توجد تأجيرات" description="لم تتم أي عمليات تأجير بعد." />;
  };

  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <Table
        loading={loading}
        columns={columns}
        data={currentData}
        emptyState={renderEmptyState()}
        renderRow={(rental) => (
          <tr key={rental?.id} className="hover:bg-brand-content/50 transition-colors cursor-pointer" onClick={() => onOpenDrawer?.(rental)}>
                <td className="px-6 py-4 font-bold text-brand-text-primary" dir="ltr">{rental?.id}</td>
                <td className="px-6 py-4 font-medium text-brand-text-muted">{rental?.tenant}</td>
                <td className="px-6 py-4 font-medium text-brand-text-muted">{rental?.owner}</td>
                <td className="px-6 py-4 text-brand-text-muted">{rental?.eq}</td>
                <td className="px-6 py-4 text-center font-bold text-brand-text-primary">{rental?.duration}</td>
                <td className="px-6 py-4 text-center font-bold text-brand-primary">{rental?.total?.toLocaleString?.() || '0'}</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeClass(rental?.statusColor)}`}>
                    {rental?.status === 'In Use' ? 'In Use 🔧' : rental?.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button unstyled onClick={(e) => { e.stopPropagation(); onOpenDrawer?.(rental); }} className="p-1.5 text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض العقد">
                    <FileText size={18} />
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
