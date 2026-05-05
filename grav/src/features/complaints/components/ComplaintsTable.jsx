import { MessageSquare, Search, AlertTriangle, ShieldAlert } from 'lucide-react';
import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';
import usePagination from '../../../hooks/usePagination';

export default function ComplaintsTable({
  complaints = [],
  loading = false,
  error = false,
  isSearchActive = false,
  onOpenModal
}) {
  const itemsPerPage = 5;
  const {
    currentPage,
    totalPages,
    setPage,
    paginatedData: currentData,
    links,
  } = usePagination(complaints, itemsPerPage);

  const columns = [
    { key: 'id', label: '#' },
    { key: 'reporter', label: 'المُبلِّغ' },
    { key: 'type', label: 'نوع البلاغ' },
    { key: 'target', label: 'الهدف' },
    { key: 'date', label: 'التاريخ' },
    { key: 'priority', label: 'أولوية', className: 'px-6 py-4 text-center' },
    { key: 'status', label: 'الحالة', className: 'px-6 py-4 text-center' },
    { key: 'action', label: 'إجراء', className: 'px-6 py-4 text-center' },
  ];

  const renderEmptyState = () => {
    if (error) return <EmptyState icon={AlertTriangle} title="حدث خطأ" description="تعذر تحميل البلاغات من السيرفر." />;
    if (isSearchActive) return <EmptyState icon={Search} title="لا توجد نتائج" description="لا توجد بلاغات مطابقة لبحثك الحالي." />;
    return <EmptyState icon={ShieldAlert} title="لا توجد بلاغات" description="لا توجد بلاغات في النظام." />;
  };

  return (
    <div className="animate-in fade-in duration-300">
      <Table
        loading={loading}
        columns={columns}
        data={currentData}
        emptyState={renderEmptyState()}
        renderRow={(complaint) => (
          <tr key={complaint?.id} className="hover:bg-brand-content/50 transition-colors">
            <td className="px-6 py-4 font-bold text-brand-text-muted" dir="ltr">{complaint?.id}</td>
            <td className="px-6 py-4 font-bold text-brand-text-primary">{complaint?.reporter}</td>
            <td className="px-6 py-4">
              <Badge unstyled className="px-2.5 py-1 bg-brand-info/10 text-brand-info rounded-md text-xs font-bold">{complaint?.type}</Badge>
            </td>
            <td className="px-6 py-4 font-medium">{complaint?.target}</td>
            <td className="px-6 py-4 text-brand-text-muted">{complaint?.date}</td>
            <td className="px-6 py-4 text-center">
              {complaint?.priorityKey === 'high' ? <span className="text-brand-danger font-bold text-xs">🔴 عالية</span> : <span className="text-brand-text-muted text-xs">عادية</span>}
            </td>
            <td className="px-6 py-4 text-center">
              <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeClass(complaint?.statusColor)}`}>{complaint?.status}</Badge>
            </td>
            <td className="px-6 py-4 text-center">
              <Button unstyled onClick={() => onOpenModal?.(complaint)} className="border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center">
                <MessageSquare size={14} className="ml-1" /> معالجة
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
