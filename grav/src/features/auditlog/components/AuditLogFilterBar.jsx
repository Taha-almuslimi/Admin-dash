import React from 'react';
import { Search, Download, Calendar } from 'lucide-react';

export default function AuditLogFilterBar() {
  return (
    <div className="bg-brand-card p-4 rounded-xl shadow-sm border border-brand-border flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center flex-1">
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="بحث بالحدث أو التفاصيل..." 
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-brand-border bg-brand-content focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm"
          />
          <Search className="absolute right-3 top-2.5 text-brand-text-muted" size={18} />
        </div>
        
        <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
          <option value="">المسؤول: الكل</option>
          <option value="ahmed">أحمد علي</option>
          <option value="sara">سارة محمد</option>
          <option value="khaled">خالد عمر</option>
        </select>
        <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
          <option value="">نوع الحدث: الكل</option>
          <option value="ban">حظر/تعليق مستخدم</option>
          <option value="delete">حذف محتوى</option>
          <option value="dispute">قرار نزاع</option>
          <option value="edit">تعديل بيانات</option>
          <option value="finance">إجراء مالي</option>
        </select>

        <div className="flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted cursor-pointer hover:border-brand-primary transition-colors">
          <Calendar size={16} />
          <span>من: --- إلى: ---</span>
        </div>
      </div>
      
      <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-brand-primary text-white border border-brand-primary rounded-lg text-sm font-bold shadow-sm hover:bg-brand-primary/90 transition-colors">
        <Download size={16} />
        <span>تصدير السجل</span>
      </button>
    </div>
  );
}
