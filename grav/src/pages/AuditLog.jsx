import React from 'react';
import { Search, Download, Lock, Calendar } from 'lucide-react';

const auditData = [
  { id: 1, time: '18 مايو 2024, 14:30', admin: 'أحمد علي', role: 'Super Admin', roleColor: 'success', event: 'إجراء مالي', eventColor: 'success', details: 'تحويل أرباح للمؤجر مؤسسة التقنية بقيمة 450,000 ر.ي', ip: '192.168.1.45' },
  { id: 2, time: '18 مايو 2024, 11:15', admin: 'سارة محمد', role: 'Support', roleColor: 'info', event: 'قرار نزاع', eventColor: 'warning', details: 'إغلاق النزاع #D-2024-001 وقبول الخصم بقيمة 50,000 ر.ي', ip: '10.0.0.12' },
  { id: 3, time: '17 مايو 2024, 09:45', admin: 'أحمد علي', role: 'Super Admin', roleColor: 'success', event: 'تعديل بيانات', eventColor: 'info', details: 'تحديث سياسة الاستخدام (البند 3.1)', ip: '192.168.1.45' },
  { id: 4, time: '16 مايو 2024, 16:20', admin: 'سارة محمد', role: 'Support', roleColor: 'info', event: 'حذف محتوى', eventColor: 'warning', details: 'حذف التقييم #REV-003 لمخالفته الآداب العامة', ip: '10.0.0.12' },
  { id: 5, time: '15 مايو 2024, 10:05', admin: 'خالد عمر', role: 'Finance', roleColor: 'warning', event: 'حظر/تعليق مستخدم', eventColor: 'danger', details: 'حظر دائم للمستخدم "علي صالح" لاحتيال مالي', ip: '172.16.0.5' },
];

export default function AuditLog() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Persistent Warning */}
      <div className="bg-brand-sidebar text-white rounded-xl p-4 shadow-md flex items-center space-x-4 space-x-reverse border border-brand-sidebar">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
          <Lock size={20} className="text-white" />
        </div>
        <div>
          <h4 className="font-bold">🔒 هذا السجل للقراءة فقط — لا يمكن حذفه أو تعديله</h4>
          <p className="text-xs text-white/70 mt-1">وفقاً لمتطلب الأمان (FRA-11.3)، يتم تسجيل جميع الإجراءات الإدارية بشكل دائم وغير قابل للتعديل.</p>
        </div>
      </div>

      {/* Filter Bar */}
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

      {/* Data Table */}
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-4">الوقت</th>
                <th className="px-6 py-4">المسؤول</th>
                <th className="px-6 py-4">الدور</th>
                <th className="px-6 py-4">الحدث</th>
                <th className="px-6 py-4 w-2/5">التفاصيل</th>
                <th className="px-6 py-4 text-center">الـ IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {auditData.map((log) => (
                <tr key={log.id} className="hover:bg-brand-content/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-text-muted" dir="ltr">{log.time}</td>
                  <td className="px-6 py-4 font-bold text-brand-text-primary">{log.admin}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold bg-brand-${log.roleColor}/10 text-brand-${log.roleColor}`}>
                      {log.role}
                    </span>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
