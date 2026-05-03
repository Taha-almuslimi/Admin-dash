import React from 'react';
import { Lock } from 'lucide-react';

export default function AuditLogWarning() {
  return (
    <div className="bg-brand-sidebar text-white rounded-xl p-4 shadow-md flex items-center space-x-4 space-x-reverse border border-brand-sidebar">
      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
        <Lock size={20} className="text-white" />
      </div>
      <div>
        <h4 className="font-bold">🔒 هذا السجل للقراءة فقط — لا يمكن حذفه أو تعديله</h4>
        <p className="text-xs text-white/70 mt-1">وفقاً لمتطلب الأمان (FRA-11.3)، يتم تسجيل جميع الإجراءات الإدارية بشكل دائم وغير قابل للتعديل.</p>
      </div>
    </div>
  );
}
