import React from 'react';
import { X, Phone, Mail, Calendar, CheckCircle } from 'lucide-react';

export default function UserDrawer({ isOpen, user, onClose, onAction }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />
      )}

      <div className={`fixed top-0 bottom-0 right-0 w-full md:w-[480px] bg-brand-card shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {user && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-content/50">
              <h2 className="text-xl font-bold text-brand-text-primary">تفاصيل المستخدم</h2>
              <button onClick={onClose} className="p-2 text-brand-text-muted hover:text-brand-danger rounded-full hover:bg-brand-danger/10 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Profile Header */}
              <div className="flex items-start space-x-4 space-x-reverse">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-xl border-2 border-brand-border" />
                <div>
                  <h3 className="text-2xl font-bold text-brand-text-primary">{user.name}</h3>
                  <div className="flex items-center space-x-2 space-x-reverse mt-2">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded bg-brand-${user.typeColor}/10 text-brand-${user.typeColor}`}>
                      {user.type}
                    </span>
                    <span className="text-brand-text-muted text-sm flex items-center">📍 {user.gov}</span>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse mt-3">
                    <div className="flex items-center text-brand-text-primary font-bold">⭐ {user.rating} <span className="text-brand-text-muted text-sm font-normal mr-1">/ 5</span></div>
                    <div className="text-sm text-brand-text-muted border-r border-brand-border pr-4"><span className="font-bold text-brand-text-primary">{user.ops}</span> عملية</div>
                  </div>
                </div>
              </div>

              {/* Contact & KYC Info */}
              <div className="grid grid-cols-2 gap-4 bg-brand-content rounded-xl p-4 border border-brand-border">
                <div className="flex items-center text-sm">
                  <Phone size={16} className="text-brand-text-muted ml-2" />
                  <span dir="ltr" className="font-medium">{user.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail size={16} className="text-brand-text-muted ml-2" />
                  <span className="font-medium truncate">{user.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="text-brand-text-muted ml-2" />
                  <span className="font-medium">التسجيل: {user.joined}</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle size={16} className={user.kyc ? "text-brand-success ml-2" : "text-brand-text-muted ml-2"} />
                  <span className={user.kyc ? "text-brand-success font-bold" : "text-brand-text-muted font-medium"}>
                    حالة KYC: {user.kyc ? 'موثق' : 'غير موثق'}
                  </span>
                </div>
              </div>

              {/* Recent Rentals */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-brand-text-primary border-b border-brand-border pb-2">آخر 5 عمليات التأجير</h4>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-brand-border hover:bg-brand-content transition-colors">
                      <div>
                        <p className="font-medium text-sm">حفار كاتربيلر {i}</p>
                        <p className="text-xs text-brand-text-muted mt-1">12 مايو 2024 - 15 مايو 2024</p>
                      </div>
                      <span className="text-brand-success font-bold text-sm">مكتملة</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Actions Log */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-brand-text-primary border-b border-brand-border pb-2">سجل الإجراءات الإدارية</h4>
                <p className="text-brand-text-muted text-sm italic">لا توجد إجراءات سابقة لهذا المستخدم.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-brand-border bg-white flex space-x-3 space-x-reverse">
              <button onClick={() => onAction(user, 'warn')} className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-warning/10 text-brand-warning hover:bg-brand-warning hover:text-white transition-colors border border-brand-warning/20">
                تحذير
              </button>
              <button onClick={() => onAction(user, 'suspend')} className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-warning/10 text-brand-warning hover:bg-brand-warning hover:text-white transition-colors border border-brand-warning/20">
                تعليق
              </button>
              <button onClick={() => onAction(user, 'ban')} className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-danger/10 text-brand-danger hover:bg-brand-danger hover:text-white transition-colors border border-brand-danger/20">
                حظر
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
