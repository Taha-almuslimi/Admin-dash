import { useState, useEffect } from 'react';
import Badge from '../../../components/ui/Badge';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';
import { Search } from 'lucide-react';

export default function AuditTable({ auditData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil((auditData?.length || 0) / itemsPerPage);
  const currentData = auditData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

  useEffect(() => { setCurrentPage(1); }, [auditData]);

  const columns = [
    { key: 'time', label: 'الوقت' },
    { key: 'admin', label: 'المسؤول' },
    { key: 'role', label: 'الدور' },
    { key: 'event', label: 'الحدث' },
    { key: 'details', label: 'التفاصيل', className: 'px-6 py-4 w-2/5' },
    { key: 'ip', label: 'الـ IP', className: 'px-6 py-4 text-center' },
  ];

  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      {currentData.length === 0 ? (
        <EmptyState icon={Search} title="لا توجد نتائج" description="حاول تغيير معايير البحث" />
      ) : (
      <Table
        columns={columns}
        data={currentData}
        renderRow={(log) => (
          <tr key={log.id} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-muted" dir="ltr">{log.time}</td>
                <td className="px-6 py-4 font-bold text-brand-text-primary">{log.admin}</td>
                <td className="px-6 py-4">
                  <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold bg-brand-${log.roleColor}/10 text-brand-${log.roleColor}`}>
                    {log.role}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center font-bold">
                    {log.event === 'حظر/تعليق مستخدم' && <span className="w-2 h-2 rounded-full bg-brand-danger ml-2"></span>}
                    {log.event === 'حذف محتوى' && <span className="w-2 h-2 rounded-full bg-brand-warning ml-2" style={{ backgroundColor: '#F39C12' }}></span>}
                    {log.event === 'قرار نزاع' && <span className="w-2 h-2 rounded-full bg-brand-warning ml-2" style={{ backgroundColor: '#F1C40F' }}></span>}
                    {log.event === 'تعديل بيانات' && <span className="w-2 h-2 rounded-full bg-brand-info ml-2"></span>}
                    {log.event === 'إجراء مالي' && <span className="w-2 h-2 rounded-full bg-brand-success ml-2"></span>}
                    <span className={`text-${log.eventColor === 'danger' ? 'brand-danger' : log.eventColor === 'warning' ? 'brand-warning' : log.eventColor === 'info' ? 'brand-info' : 'brand-success'}`}>
                      {log.event}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 text-brand-text-primary">{log.details}</td>
                <td className="px-6 py-4 text-center font-medium text-brand-text-muted" dir="ltr">{log.ip}</td>
              </tr>
        )}
      />
      )}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-brand-border bg-brand-content text-sm text-brand-text-muted flex justify-between items-center">
          <span>عرض {((currentPage - 1) * itemsPerPage) + 1} إلى {Math.min(currentPage * itemsPerPage, auditData?.length || 0)} من {auditData?.length || 0} سجل</span>
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
