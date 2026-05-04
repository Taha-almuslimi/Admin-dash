import { useState, useEffect } from 'react';
import { FileText, Search } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';

export default function RentalsTable({ rentals, onOpenDrawer }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil((rentals?.length || 0) / itemsPerPage);
  const currentData = rentals?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

  useEffect(() => { setCurrentPage(1); }, [rentals]);

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

  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      {currentData.length === 0 ? (
        <EmptyState icon={Search} title="لا توجد نتائج" description="حاول تغيير معايير البحث" />
      ) : (
      <Table
        columns={columns}
        data={currentData}
        renderRow={(rental) => (
          <tr key={rental.id} className="hover:bg-brand-content/50 transition-colors cursor-pointer" onClick={() => onOpenDrawer(rental)}>
                <td className="px-6 py-4 font-bold text-brand-text-primary" dir="ltr">{rental.id}</td>
                <td className="px-6 py-4">{rental.tenant}</td>
                <td className="px-6 py-4">{rental.owner}</td>
                <td className="px-6 py-4 text-brand-text-muted">{rental.eq}</td>
                <td className="px-6 py-4 text-center font-bold text-brand-text-primary">{rental.duration}</td>
                <td className="px-6 py-4 text-center font-bold text-brand-primary">{rental.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    rental.statusColor === 'pending' ? 'bg-brand-text-muted/10 text-brand-text-muted' :
                    `bg-brand-${rental.statusColor}/10 text-brand-${rental.statusColor}`
                  }`}>
                    {rental.status === 'In Use' ? 'In Use 🔧' : rental.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button unstyled onClick={(e) => { e.stopPropagation(); onOpenDrawer(rental); }} className="p-1.5 text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض العقد">
                    <FileText size={18} />
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
            onPageChange={setCurrentPage} 
          />
        </div>
      )}
    </div>
  );
}
