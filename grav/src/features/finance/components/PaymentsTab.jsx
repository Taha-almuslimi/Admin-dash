import { useState } from 'react';
import { Calendar, StopCircle } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/ui/SearchInput';
import Select from '../../../components/ui/Select';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';
import Pagination from '../../../components/ui/Pagination';

export default function PaymentsTab() {
  const [selectedTx, setSelectedTx] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const rows = [1, 2, 3, 4, 5, 6, 7];
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const currentRows = rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <div className="p-4 border-b border-brand-border bg-white flex flex-wrap gap-4 items-center">
        <SearchInput placeholder="بحث..." className="flex-1 min-w-[200px]" inputClassName="w-full pl-4 pr-10 py-2 rounded-lg border border-brand-border bg-brand-content focus:outline-none focus:border-brand-primary text-sm" />
        <div className="relative flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted hover:border-brand-primary transition-colors">
          <Calendar size={16} />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
            className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer"
          />
        </div>
        <Select placeholder="حالة الدفع: الكل" options={[{ value: 'paid', label: 'مكتمل' }, { value: 'pending', label: 'معلق' }]} />
      </div>
      
      <Table
        columns={columns}
        data={currentRows}
        renderRow={(i) => (
          <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold" dir="ltr">TRX-00{i}</td>
                <td className="px-6 py-4 font-medium">أحمد محمد</td>
                <td className="px-6 py-4 text-brand-text-muted">حفار JCB</td>
                <td className="px-6 py-4 font-bold text-brand-primary">15,000 ر.ي</td>
                <td className="px-6 py-4 font-medium">50,000 ر.ي</td>
                <td className="px-6 py-4 text-brand-text-muted" dir="ltr">2024-05-1{i}</td>
                <td className="px-6 py-4 text-center">
                  <Badge unstyled className="px-2.5 py-1 bg-brand-success/10 text-brand-success rounded-md text-xs font-bold">مكتمل</Badge>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button 
                    unstyled 
                    className="text-brand-danger hover:bg-brand-danger/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center"
                    onClick={() => setSelectedTx(`TRX-00${i}`)}
                  >
                    <StopCircle size={14} className="ml-1" /> إيقاف/مراجعة
                  </Button>
                </td>
              </tr>
        )}
      />

      {totalPages > 1 && (
        <div className="p-4 border-t border-brand-border flex justify-center bg-brand-content/30">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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
            اختر الإجراء المناسب للعملية <strong>{selectedTx}</strong>:
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
