import React from 'react';
import { X, AlertTriangle, PauseCircle, Ban, AlertOctagon } from 'lucide-react';

export default function ComplaintModal({ showModal, setShowModal, actionType, setActionType }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-brand-card rounded-xl w-full max-w-md shadow-2xl border border-brand-border animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-brand-border flex justify-between items-center">
          <h3 className="text-lg font-bold text-brand-text-primary">
            معالجة البلاغ <span className="text-brand-text-muted text-sm font-normal ml-2" dir="ltr">#RPT-001</span>
          </h3>
          <button onClick={() => setShowModal(false)} className="text-brand-text-muted hover:text-brand-danger">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-5 bg-brand-content/50">
          
          <div className="bg-white p-4 rounded-xl border border-brand-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted">المُبلِّغ:</span>
              <span className="font-bold">ياسر علي</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted">نوع البلاغ:</span>
              <span className="font-bold">مستخدم (سلوك مسيء)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted">الهدف المشكو منه:</span>
              <span className="font-bold text-brand-danger">أحمد محمد</span>
            </div>
            <div className="pt-3 border-t border-brand-border text-sm">
              <span className="text-brand-text-muted block mb-1">التفاصيل:</span>
              <p className="text-brand-text-primary">"قام المذكور بإرسال شتائم عبر رسائل النظام ورفض التعاون لتسليم المعدة."</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">الإجراء المتخذ</label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${actionType === 'warn' ? 'bg-brand-warning/10 border-brand-warning text-brand-warning' : 'bg-white border-brand-border hover:bg-brand-content'}`}>
                <input type="radio" name="actionType" checked={actionType === 'warn'} onChange={() => setActionType('warn')} className="hidden" />
                <AlertTriangle size={16} className="ml-2" />
                <span className="font-bold text-sm">تحذير</span>
              </label>
              <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${actionType === 'suspend' ? 'bg-brand-warning/10 border-brand-warning text-brand-warning' : 'bg-white border-brand-border hover:bg-brand-content'}`}>
                <input type="radio" name="actionType" checked={actionType === 'suspend'} onChange={() => setActionType('suspend')} className="hidden" />
                <PauseCircle size={16} className="ml-2" />
                <span className="font-bold text-sm">تعليق مؤقت</span>
              </label>
              <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${actionType === 'ban' ? 'bg-brand-danger/10 border-brand-danger text-brand-danger' : 'bg-white border-brand-border hover:bg-brand-content'}`}>
                <input type="radio" name="actionType" checked={actionType === 'ban'} onChange={() => setActionType('ban')} className="hidden" />
                <Ban size={16} className="ml-2" />
                <span className="font-bold text-sm">حظر نهائي</span>
              </label>
              <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${actionType === 'reject' ? 'bg-brand-text-muted/10 border-brand-text-muted text-brand-text-muted' : 'bg-white border-brand-border hover:bg-brand-content'}`}>
                <input type="radio" name="actionType" checked={actionType === 'reject'} onChange={() => setActionType('reject')} className="hidden" />
                <X size={16} className="ml-2" />
                <span className="font-bold text-sm">رفض البلاغ</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">ملاحظة إدارية</label>
            <textarea 
              className="w-full border border-brand-border bg-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-primary h-24 resize-none"
              placeholder="اكتب ملاحظاتك..."
            ></textarea>
          </div>

        </div>

        <div className="p-4 border-t border-brand-border bg-white rounded-b-xl space-y-3 flex flex-col">
          <button className="w-full py-2.5 text-brand-danger font-bold text-sm bg-brand-danger/5 hover:bg-brand-danger/10 border border-brand-danger/20 rounded-lg transition-colors flex items-center justify-center">
            <AlertOctagon size={16} className="ml-2" /> الإبلاغ للجهات المختصة
          </button>
          
          <div className="flex space-x-3 space-x-reverse w-full">
            <button 
              onClick={() => setShowModal(false)}
              className="flex-1 py-2.5 text-brand-text-primary font-bold text-sm border border-brand-border hover:bg-brand-content rounded-lg transition-colors"
            >
              إلغاء
            </button>
            <button className="flex-1 py-2.5 text-white font-bold text-sm bg-brand-primary hover:bg-brand-primary/90 rounded-lg transition-colors shadow-sm">
              حفظ الإجراء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
