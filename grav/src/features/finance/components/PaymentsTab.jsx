import { useMemo, useState } from 'react';
import { Calendar, StopCircle } from 'lucide-react';
import { badgeClass } from '../../../utils/statusClasses';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';
import Pagination from '../../../components/ui/Pagination';
import FilterBar from '../../../components/ui/FilterBar';
import usePagination from '../../../hooks/usePagination';

export default function PaymentsTab() {
  const [selectedTx, setSelectedTx] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const itemsPerPage = 5;

  const rows = useMemo(() => [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    id: `TRX-00${i}`,
    tenant: i % 2 === 0 ? 'ياسر علي' : 'أحمد محمد',
    equipment: i % 3 === 0 ? 'رافعة شوكية' : 'حفار JCB',
    rent: 15000 + i * 1000,
    insurance: 50000,
    date: `2024-05-${String(i + 10).padStart(2, '0')}`,
    status: i % 3 === 0 ? 'معلق' : 'مكتمل',
    statusKey: i % 3 === 0 ? 'pending' : 'paid',
    statusColor: i % 3 === 0 ? 'warning' : 'success',
  })), []);

  const filteredRows = rows.filter((row) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || row.id.toLowerCase().includes(q) || row.tenant.includes(q) || row.equipment.includes(q);
    const matchesStatus = !statusFilter || row.statusKey === statusFilter;
    const matchesDate = !dateFilter || row.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const {
    currentPage,
    totalPages,
    setPage,
    paginatedData: currentRows,
  } = usePagination(filteredRows, itemsPerPage);

  const columns = [
    { key: 'id', label: '#' },
    { key: 'tenant', label: 'المستأجر' },
    { key: 'eq', label: 'المعدة' },
    { key: 'rent', label: 'مبلغ الإيجار' },
    { key: 'insurance', label: 'مبلغ التأمين' },
    { key: 'date', label: 'تاريخ الدفع' },
    { key: 'status', label: 'الحالة', className: 'px-6 py-4 text-center' },
    { key: 'action', label: 'إجراء', className: 'px-6 py-4 text-center' },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="p-4 border-b border-brand-border bg-white">
        <FilterBar
          searchPlaceholder="بحث..."
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          filters={[
            { key: 'status', placeholder: 'حالة الدفع: الكل', value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), options: [{ value: 'paid', label: 'مكتمل' }, { value: 'pending', label: 'معلق' }] },
          ]}
          extraActions={
            <div className="relative flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted hover:border-brand-primary transition-colors">
              <Calendar size={16} />
              <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer" />
            </div>
          }
        />
      </div>
      
      <Table
        columns={columns}
        data={currentRows}
        renderRow={(row) => (
          <tr key={row.id} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold" dir="ltr">{row.id}</td>
                <td className="px-6 py-4 font-medium">{row.tenant}</td>
                <td className="px-6 py-4 text-brand-text-muted">{row.equipment}</td>
                <td className="px-6 py-4 font-bold text-brand-primary">{row.rent.toLocaleString()} ر.ي</td>
                <td className="px-6 py-4 font-medium">{row.insurance.toLocaleString()} ر.ي</td>
                <td className="px-6 py-4 text-brand-text-muted" dir="ltr">{row.date}</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeClass(row.statusColor)}`}>{row.status}</Badge>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button 
                    unstyled 
                    className="text-brand-danger hover:bg-brand-danger/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center"
                    onClick={() => setSelectedTx(row)}
                  >
                    <StopCircle size={14} className="ml-1" /> إيقاف/مراجعة
                  </Button>
                </td>
              </tr>
        )}
      />

      {totalPages > 1 && (
        <div className="p-4 border-t border-brand-border flex justify-center bg-brand-content/30">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      <Modal
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
        title="إجراءات العملية المالية"
        footer={
          <div className="p-6 border-t border-brand-border bg-brand-content flex justify-end gap-3 rounded-b-xl">
            <Button variant="outline" onClick={() => setSelectedTx(null)}>إلغاء</Button>
            <Button className="bg-brand-danger hover:bg-brand-danger/90" onClick={() => setSelectedTx(null)}>تأكيد الإيقاف</Button>
          </div>
        }
      >
        <div className="p-6 space-y-4">
          <p className="text-brand-text-primary">
            اختر الإجراء المناسب للعملية <strong>{selectedTx?.id}</strong>:
          </p>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 border border-brand-border rounded-lg cursor-pointer hover:border-brand-primary">
              <input type="radio" name="actionType" className="mt-1" defaultChecked />
              <div>
                <span className="block font-bold text-brand-text-primary">إيقاف العملية</span>
                <span className="block text-sm text-brand-text-muted">تعليق العملية المالية بشكل مؤقت</span>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 border border-brand-border rounded-lg cursor-pointer hover:border-brand-primary">
              <input type="radio" name="actionType" className="mt-1" />
              <div>
                <span className="block font-bold text-brand-text-primary">تحويل للمراجعة</span>
                <span className="block text-sm text-brand-text-muted">إرسال العملية للمراجعة والتدقيق</span>
              </div>
            </label>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-bold text-brand-text-primary mb-2">سبب الإجراء</label>
            <textarea 
              className="w-full p-3 border border-brand-border rounded-lg bg-brand-content focus:outline-none focus:border-brand-primary"
              rows={3}
              placeholder="اكتب تفاصيل أو سبب هذا الإجراء..."
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}
