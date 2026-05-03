import React from 'react';
import { Search, Download } from 'lucide-react';

export default function UsersFilterBar() {
  return (
    <div className="bg-brand-card p-4 rounded-xl shadow-sm border border-brand-border flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center flex-1">
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="بحث باسم أو جوال..." 
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-brand-border bg-brand-content focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm"
          />
          <Search className="absolute right-3 top-2.5 text-brand-text-muted" size={18} />
        </div>
        
        <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
          <option value="">النوع: الكل</option>
          <option value="tenant">مستأجر</option>
          <option value="owner">مؤجر</option>
        </select>
        <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
          <option value="">الحالة: الكل</option>
          <option value="active">نشط</option>
          <option value="suspended">موقوف</option>
          <option value="banned">محظور</option>
        </select>
        <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
          <option value="">المحافظة: الكل</option>
          <option value="sanaa">صنعاء</option>
          <option value="aden">عدن</option>
          <option value="taiz">تعز</option>
          <option value="hadramout">حضرموت</option>
        </select>
      </div>
      
      <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-brand-content border border-brand-border rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
        <Download size={16} />
        <span>تصدير CSV</span>
      </button>
    </div>
  );
}
