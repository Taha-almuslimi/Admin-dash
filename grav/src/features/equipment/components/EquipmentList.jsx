import { Eye, Edit, EyeOff, Search } from 'lucide-react';
import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';
import usePagination from '../../../hooks/usePagination';

export default function EquipmentList({ equipment, onOpenDrawer, onHideItem }) {
  const itemsPerPage = 5;
  const {
    currentPage,
    totalPages,
    totalItems,
    from,
    to,
    setPage,
    paginatedData: currentData,
  } = usePagination(equipment, itemsPerPage);

  const columns = [
    { key: 'equipment', label: 'المعدة' },
    { key: 'meta', label: 'الموقع والتصنيف' },
    { key: 'owner', label: 'المؤجر' },
    { key: 'price', label: 'السعر (يومياً)', className: 'px-6 py-4 text-center' },
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
        renderRow={(item) => (
          <tr key={item.id} className="hover:bg-brand-content/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={() => onOpenDrawer(item)}>
                  <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-brand-border" />
                  <span className="font-bold text-brand-text-primary">{item.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-brand-text-primary text-xs flex items-center">📍 {item.location}</span>
                  <span className="text-brand-text-muted text-xs flex items-center">🏷️ {item.category}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-bold text-brand-text-primary">{item.owner}</td>
              <td className="px-6 py-4 text-center font-bold text-brand-primary">{item?.price?.toLocaleString?.() || '0'} ر.ي</td>
              <td className="px-6 py-4 text-center">
                <Badge unstyled className={`px-2.5 py-1 text-xs font-bold rounded-md ${badgeClass(item.statusColor)}`}>
                  {item.status}
                </Badge>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <Button unstyled onClick={() => onOpenDrawer(item)} className="p-1.5 text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors">
                    <Eye size={18} />
                  </Button>
                  <Button unstyled className="p-1.5 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                    <Edit size={18} />
                  </Button>
                  <Button unstyled onClick={() => onHideItem?.(item)} className="p-1.5 text-brand-warning hover:bg-brand-warning/10 rounded-lg transition-colors" title="إخفاء">
                    <EyeOff size={18} />
                  </Button>
                </div>
              </td>
            </tr>
        )}
        wrapperClassName=""
      />
      )}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-brand-border bg-brand-content text-sm text-brand-text-muted flex justify-between items-center">
          <span>عرض {from} إلى {to} من {totalItems} معدة</span>
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
