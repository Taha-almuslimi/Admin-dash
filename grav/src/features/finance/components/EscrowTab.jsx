import { useMemo, useState } from 'react';
import { PauseCircle, Search } from 'lucide-react';
import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';
import Pagination from '../../../components/ui/Pagination';
import FilterBar from '../../../components/ui/FilterBar';
import EmptyState from '../../../components/ui/EmptyState';
import usePagination from '../../../hooks/usePagination';

export default function EscrowTab() {
  const [selectedOp, setSelectedOp] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const itemsPerPage = 5;

  const rows = useMemo(() => [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    id: `OP-2024-08${i}`,
    amount: 150000 + i * 10000,
    since: '12 مايو 2024',
    status: i % 3 === 0 ? 'Completed' : 'In Use',
    statusKey: i % 3 === 0 ? 'completed' : 'inuse',
    statusColor: i % 3 === 0 ? 'success' : 'warning',
  })), []);

  const filteredRows = rows.filter((row) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || row.id.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || row.statusKey === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const {
    currentPage,
    totalPages,
    setPage,
    paginatedData: currentRows,
  } = usePagination(filteredRows, itemsPerPage);

  const columns = [
    { key: 'op', label: 'عملية' },
    { key: 'amount', label: 'مبلغ محتجز' },
    { key: 'since', label: 'منذ' },
    { key: 'status', label: 'الحالة', className: 'px-6 py-4 text-center' },
    { key: 'action', label: 'إجراء', className: 'px-6 py-4 text-center' },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="p-6 border-b border-brand-border bg-brand-content/30 flex justify-between items-center">
        <div>
          <p className="text-brand-text-muted text-sm mb-1">إجمالي المحتجز</p>
          <p className="text-2xl font-bold text-brand-warning">2,450,000 ر.ي</p>
        </div>
        <div className="text-left">
          <p className="text-brand-text-muted text-sm mb-1">عدد العمليات المفتوحة</p>
          <p className="text-2xl font-bold text-brand-text-primary">34</p>
        </div>
      </div>
      <div className="p-4 border-b border-brand-border bg-white">
        <FilterBar
          searchPlaceholder="بحث برقم العملية..."
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          filters={[
            { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), options: [{ value: 'inuse', label: 'In Use' }, { value: 'completed', label: 'Completed' }] },
          ]}
        />
      </div>
      {currentRows.length === 0 ? (
        <EmptyState icon={Search} title="لا توجد نتائج" description="حاول تغيير معايير البحث" />
      ) : (
      <Table
        columns={columns}
        data={currentRows}
        renderRow={(row) => (
          <tr key={row.id} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold" dir="ltr">{row.id}</td>
                <td className="px-6 py-4 font-bold text-brand-warning">{row.amount.toLocaleString()} ر.ي</td>
                <td className="px-6 py-4 text-brand-text-muted">{row.since}</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeClass(row.statusColor)}`}>{row.status}</Badge>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button 
                    unstyled 
                    className="text-brand-danger border border-brand-danger hover:bg-brand-danger/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center"
                    onClick={() => setSelectedOp(row)}
                  >
                    <PauseCircle size={14} className="ml-1" /> تعليق الأموال
                  </Button>
                </td>
              </tr>
        )}
      />
      )}

      {totalPages > 1 && (
        <div className="p-4 border-t border-brand-border flex justify-center bg-brand-content/30">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      <Modal
        isOpen={!!selectedOp}
        onClose={() => setSelectedOp(null)}
        title="تعليق الأموال المحتجزة"
        footer={
          <div className="p-6 border-t border-brand-border bg-brand-content flex justify-end gap-3 rounded-b-xl">
            <Button variant="outline" onClick={() => setSelectedOp(null)}>إلغاء</Button>
            <Button className="bg-brand-danger hover:bg-brand-danger/90" onClick={() => setSelectedOp(null)}>تأكيد التعليق</Button>
          </div>
        }
      >
        <div className="p-6 space-y-4">
          <p className="text-brand-text-primary">
            هل تريد تعليق الأموال المحتجزة للعملية <strong>{selectedOp?.id}</strong>؟
          </p>
          <div className="bg-brand-content p-4 rounded-lg border border-brand-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted">المبلغ المحتجز:</span>
              <span className="font-bold text-brand-warning">{selectedOp?.amount.toLocaleString()} ر.ي</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted">تاريخ الاحتجاز:</span>
              <span className="font-bold">{selectedOp?.since}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">سبب التعليق</label>
            <textarea 
              className="w-full p-3 border border-brand-border rounded-lg bg-brand-content focus:outline-none focus:border-brand-primary"
              rows={3}
              placeholder="اكتب سبب تعليق الأموال..."
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}
