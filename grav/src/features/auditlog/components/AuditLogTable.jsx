import React from 'react';
import { auditData } from '../../../data/auditlog';

export default function AuditLogTable() {
  return (
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
  );
}
