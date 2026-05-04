import { Calendar, StopCircle } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/ui/SearchInput';
import Select from '../../../components/ui/Select';
import Table from '../../../components/ui/Table';

export default function PaymentsTab() {
  const rows = [1, 2, 3, 4];
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
        <div className="flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted cursor-pointer hover:border-brand-primary transition-colors">
          <Calendar size={16} />
          <span>تاريخ الدفع</span>
        </div>
        <Select placeholder="حالة الدفع: الكل" options={[{ value: 'paid', label: 'مكتمل' }, { value: 'pending', label: 'معلق' }]} />
      </div>
      
      <Table
        columns={columns}
        data={rows}
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
                  <Button unstyled className="text-brand-danger hover:bg-brand-danger/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center">
                    <StopCircle size={14} className="ml-1" /> إيقاف/مراجعة
                  </Button>
                </td>
              </tr>
        )}
      />
    </div>
  );
}
