import { Eye, AlertTriangle, PauseCircle, Ban, Search } from 'lucide-react';
import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Pagination from '../../../components/ui/Pagination';
import Table from '../../../components/ui/Table';
import EmptyState from '../../../components/ui/EmptyState';
import usePagination from '../../../hooks/usePagination';

export default function UsersTable({ users, onOpenDrawer, onOpenActionModal }) {
  const itemsPerPage = 5;
  const {
    currentPage,
    totalPages,
    totalItems,
    from,
    to,
    setPage,
    paginatedData: currentData,
  } = usePagination(users, itemsPerPage);

  const columns = [
    { key: 'user', label: 'المستخدم' },
    { key: 'phone', label: 'الجوال' },
    { key: 'type', label: 'النوع' },
    { key: 'gov', label: 'المحافظة' },
    { key: 'rating', label: 'التقييم', className: 'px-6 py-4 text-center' },
    { key: 'ops', label: 'العمليات', className: 'px-6 py-4 text-center' },
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
        renderRow={(user) => (
          <tr key={user.id} className="hover:bg-brand-content/50 transition-colors cursor-pointer" onClick={() => onOpenDrawer(user)}>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-brand-border" />
                    <span className="font-bold text-brand-text-primary">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium" dir="ltr">{user.phone}</td>
                <td className="px-6 py-4">
                  <Badge unstyled className={`px-2.5 py-1 text-xs font-bold rounded-md ${badgeClass(user.typeColor)}`}>
                    {user.type}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-brand-text-muted">{user.gov}</td>
                <td className="px-6 py-4 text-center font-bold text-brand-text-primary">
                  ⭐ {user.rating}
                </td>
                <td className="px-6 py-4 text-center text-brand-text-muted">{user.ops}</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-3 py-1 rounded-full text-xs font-bold ${badgeClass(user.statusColor)}`}>
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2 space-x-reverse" onClick={(e) => e.stopPropagation()}>
                    <Button unstyled onClick={() => onOpenDrawer(user)} className="p-1.5 text-brand-text-muted hover:text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض">
                      <Eye size={18} />
                    </Button>
                    <Button unstyled onClick={() => onOpenActionModal(user, 'warn')} className="p-1.5 text-brand-text-muted hover:text-brand-warning hover:bg-brand-warning/10 rounded-lg transition-colors" title="تحذير">
                      <AlertTriangle size={18} />
                    </Button>
                    <Button unstyled onClick={() => onOpenActionModal(user, 'suspend')} className="p-1.5 text-brand-text-muted hover:text-brand-warning hover:bg-brand-warning/10 rounded-lg transition-colors" title="تعليق">
                      <PauseCircle size={18} />
                    </Button>
                    <Button unstyled onClick={() => onOpenActionModal(user, 'ban')} className="p-1.5 text-brand-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors" title="حظر">
                      <Ban size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
        )}
      />
      )}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-brand-border bg-brand-content text-sm text-brand-text-muted flex justify-between items-center">
          <span>عرض {from} إلى {to} من {totalItems} مستخدم</span>
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
