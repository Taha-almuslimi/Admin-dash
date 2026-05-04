import { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';

export default function EquipmentList({ equipment, onOpenDrawer }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil((equipment?.length || 0) / itemsPerPage);
  const currentData = equipment?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

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
              <td className="px-6 py-4 text-center font-bold text-brand-primary">{item.price.toLocaleString()} ر.ي</td>
              <td className="px-6 py-4 text-center">
                <Badge unstyled className={`px-2.5 py-1 text-xs font-bold rounded-md bg-brand-${item.statusColor}/10 text-brand-${item.statusColor}`}>
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
                  <Button unstyled className="p-1.5 text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </td>
            </tr>
        )}
        wrapperClassName=""
      />
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-brand-border bg-brand-content text-sm text-brand-text-muted flex justify-between items-center">
          <span>عرض {((currentPage - 1) * itemsPerPage) + 1} إلى {Math.min(currentPage * itemsPerPage, equipment?.length || 0)} من {equipment?.length || 0} معدة</span>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      )}
    </div>
  );
}
