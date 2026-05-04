import { Download } from 'lucide-react';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/ui/SearchInput';
import Select from '../../../components/ui/Select';

export default function UsersFilterBar() {
  return (
    <div className="bg-brand-card p-4 rounded-xl shadow-sm border border-brand-border flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center flex-1">
        <SearchInput placeholder="بحث باسم أو جوال..." className="w-full md:w-64" />
        
        <Select placeholder="النوع: الكل" options={[{ value: 'tenant', label: 'مستأجر' }, { value: 'owner', label: 'مؤجر' }]} />
        <Select placeholder="الحالة: الكل" options={[{ value: 'active', label: 'نشط' }, { value: 'suspended', label: 'موقوف' }, { value: 'banned', label: 'محظور' }]} />
        <Select placeholder="المحافظة: الكل" options={[{ value: 'sanaa', label: 'صنعاء' }, { value: 'aden', label: 'عدن' }, { value: 'taiz', label: 'تعز' }, { value: 'hadramout', label: 'حضرموت' }]} />
      </div>
      
      <Button unstyled className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-brand-content border border-brand-border rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
        <Download size={16} />
        <span>تصدير CSV</span>
      </Button>
    </div>
  );
}
