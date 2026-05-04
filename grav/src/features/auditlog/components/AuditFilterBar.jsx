import { useState } from 'react';
import { Download, Calendar } from 'lucide-react';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/ui/SearchInput';
import Select from '../../../components/ui/Select';

export default function AuditFilterBar() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="bg-brand-card p-4 rounded-xl shadow-sm border border-brand-border flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center flex-1">
        <SearchInput placeholder="بحث بالحدث أو التفاصيل..." className="w-full md:w-64" />
        
        <Select placeholder="المسؤول: الكل" options={[{ value: 'ahmed', label: 'أحمد علي' }, { value: 'sara', label: 'سارة محمد' }, { value: 'khaled', label: 'خالد عمر' }]} />
        <Select placeholder="نوع الحدث: الكل" options={[{ value: 'ban', label: 'حظر/تعليق مستخدم' }, { value: 'delete', label: 'حذف محتوى' }, { value: 'dispute', label: 'قرار نزاع' }, { value: 'edit', label: 'تعديل بيانات' }, { value: 'finance', label: 'إجراء مالي' }]} />

        <div className="flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted hover:border-brand-primary transition-colors">
          <Calendar size={16} />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer"
            title="من"
          />
          <span className="text-brand-text-muted">—</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer"
            title="إلى"
          />
        </div>
      </div>
      
      <Button 
        unstyled 
        className={`flex items-center space-x-2 space-x-reverse px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-colors ${
          exported 
            ? 'bg-brand-success text-white border-brand-success' 
            : 'bg-brand-primary text-white border-brand-primary hover:bg-brand-primary/90'
        }`}
        onClick={handleExport}
      >
        <Download size={16} />
        <span>{exported ? 'تم التصدير ✓' : 'تصدير السجل'}</span>
      </Button>
    </div>
  );
}
