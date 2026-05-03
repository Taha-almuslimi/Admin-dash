import { Search, Calendar } from 'lucide-react';

export default function RentalsFilterBar() {
  return (
    <div className="bg-brand-card p-4 rounded-xl shadow-sm border border-brand-border flex flex-wrap gap-4 items-center">
      <div className="relative w-full md:w-64">
        <input 
          type="text" 
          placeholder="بحث باسم المستخدم أو ID..." 
          className="w-full pl-4 pr-10 py-2 rounded-lg border border-brand-border bg-brand-content focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm"
        />
        <Search className="absolute right-3 top-2.5 text-brand-text-muted" size={18} />
      </div>
      
      <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
        <option value="">المحافظة: الكل</option>
        <option value="sanaa">صنعاء</option>
        <option value="aden">عدن</option>
      </select>

      <div className="flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted cursor-pointer hover:border-brand-primary transition-colors">
        <Calendar size={16} />
        <span>تاريخ البدء - الانتهاء</span>
      </div>
    </div>
  );
}
