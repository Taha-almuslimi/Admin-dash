import { Star, Eye, Trash2, Flag, Search } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';
import usePagination from '../../../hooks/usePagination';

const renderStars = (rating) => {
  return Array(5).fill(0).map((_, i) => (
    <Star key={i} size={14} className={i < rating ? "text-brand-warning fill-brand-warning" : "text-brand-border"} />
  ));
};

export default function ReviewsTable({ 
  reviews = [], 
  loading = false,
  error = false,
  isSearchActive = false,
  onOpenDrawer, 
  onDeleteReview, 
  onReportReview 
}) {
  const itemsPerPage = 5;
  const {
    currentPage,
    totalPages,
    setPage,
    paginatedData: currentData,
  } = usePagination(reviews, itemsPerPage);

  const columns = [
    { key: 'id', label: '#' },
    { key: 'rater', label: 'المُقيِّم' },
    { key: 'target', label: 'الهدف' },
    { key: 'rating', label: 'التقييم', className: 'px-6 py-4 text-center' },
    { key: 'text', label: 'نص المراجعة (مختصر)', className: 'px-6 py-4 w-1/3' },
    { key: 'date', label: 'التاريخ', className: 'px-6 py-4 text-center' },
    { key: 'status', label: 'الحالة', className: 'px-6 py-4 text-center' },
    { key: 'actions', label: 'إجراءات', className: 'px-6 py-4 text-center' },
  ];

  const renderEmptyState = () => {
    if (error) return <EmptyState icon={Star} title="حدث خطأ" description="تعذر تحميل المراجعات من السيرفر." />;
    if (isSearchActive) return <EmptyState icon={Search} title="لا توجد مراجعات" description="لا توجد مراجعات مطابقة لبحثك الحالي." />;
    return <EmptyState icon={Star} title="لا يوجد مراجعات" description="لم يتم تقديم أي تقييمات أو مراجعات حتى الآن." />;
  };

  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <Table
        loading={loading}
        columns={columns}
        data={currentData}
        emptyState={renderEmptyState()}
        renderRow={(review) => (
          <tr key={review?.id} className="hover:bg-brand-content/50 transition-colors cursor-pointer" onClick={() => onOpenDrawer?.(review)}>
                <td className="px-6 py-4 font-bold" dir="ltr">{review?.id}</td>
                <td className="px-6 py-4 font-bold text-brand-text-primary">{review?.rater}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{review?.target}</span>
                    <span className="text-xs text-brand-text-muted">{review?.targetType}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-1 space-x-reverse">
                    {renderStars(review?.rating || 0)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-brand-text-muted truncate max-w-[200px]">
                    {review?.text || '-'}
                  </p>
                </td>
                <td className="px-6 py-4 text-center text-brand-text-muted" dir="ltr">{review?.date}</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                    review?.status === 'Active' ? 'bg-brand-success/10 text-brand-success' : 'bg-brand-danger/10 text-brand-danger'
                  }`}>
                    {review?.status === 'Active' ? 'نشط' : 'محذوف'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <Button unstyled onClick={(e) => { e.stopPropagation(); onOpenDrawer?.(review); }} className="p-1.5 text-brand-text-muted hover:text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض التفاصيل">
                      <Eye size={18} />
                    </Button>
                    <Button unstyled onClick={(e) => { e.stopPropagation(); onDeleteReview?.(review?.id); }} className="p-1.5 text-brand-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors" title="حذف التقييم">
                      <Trash2 size={18} />
                    </Button>
                    <Button unstyled onClick={(e) => { e.stopPropagation(); onReportReview?.(review?.id); }} className="p-1.5 text-brand-text-muted hover:text-brand-warning hover:bg-brand-warning/10 rounded-lg transition-colors" title="الإبلاغ">
                      <Flag size={18} />
                    </Button>
                  </div>
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
          />
        </div>
      )}
    </div>
  );
}
