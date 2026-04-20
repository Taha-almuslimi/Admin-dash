import React, { useState } from 'react';
import { Flag, ShieldAlert, CheckCircle, Search, AlertTriangle, MessageSquare, Bell, FileText, CheckCircle2, PauseCircle, Ban, AlertOctagon, X } from 'lucide-react';

const tabs = [
  { id: 'complaints', label: 'قائمة البلاغات' },
  { id: 'notifications', label: 'مركز الإشعارات' }
];

export default function Complaints() {
  const [activeTab, setActiveTab] = useState('complaints');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('warn');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex items-center space-x-4 space-x-reverse relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-danger"></div>
          <div className="w-12 h-12 bg-brand-danger/10 text-brand-danger rounded-xl flex items-center justify-center">
            <Flag size={24} />
          </div>
          <div>
            <p className="text-brand-text-muted text-sm font-bold mb-1">بلاغات جديدة</p>
            <p className="text-[32px] font-bold text-brand-text-primary leading-none">12</p>
          </div>
        </div>
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex items-center space-x-4 space-x-reverse relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-warning"></div>
          <div className="w-12 h-12 bg-brand-warning/10 text-brand-warning rounded-xl flex items-center justify-center">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-brand-text-muted text-sm font-bold mb-1">نشاط مشبوه</p>
            <p className="text-[32px] font-bold text-brand-text-primary leading-none">3</p>
          </div>
        </div>
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex items-center space-x-4 space-x-reverse relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-success"></div>
          <div className="w-12 h-12 bg-brand-success/10 text-brand-success rounded-xl flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-brand-text-muted text-sm font-bold mb-1">تمت المعالجة</p>
            <p className="text-[32px] font-bold text-brand-text-primary leading-none">89</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden flex flex-col min-h-[500px]">
        {/* Tabs Header */}
        <div className="border-b border-brand-border bg-brand-content/30 flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors relative ${
                activeTab === tab.id 
                  ? 'text-brand-primary' 
                  : 'text-brand-text-muted hover:text-brand-text-primary hover:bg-brand-content'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'complaints' ? (
          <div className="animate-in fade-in duration-300">
            <div className="p-4 border-b border-brand-border bg-white flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <input 
                  type="text" 
                  placeholder="بحث..." 
                  className="w-full pl-4 pr-10 py-2 rounded-lg border border-brand-border bg-brand-content focus:outline-none focus:border-brand-primary text-sm"
                />
                <Search className="absolute right-3 top-2.5 text-brand-text-muted" size={18} />
              </div>
              <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
                <option value="">أولوية: الكل</option>
                <option value="high">🔴 عالية</option>
                <option value="normal">⚪ عادية</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">المُبلِّغ</th>
                    <th className="px-6 py-4">نوع البلاغ</th>
                    <th className="px-6 py-4">الهدف</th>
                    <th className="px-6 py-4">التاريخ</th>
                    <th className="px-6 py-4 text-center">أولوية</th>
                    <th className="px-6 py-4 text-center">الحالة</th>
                    <th className="px-6 py-4 text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {[1, 2, 3, 4].map(i => (
                    <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-brand-text-muted" dir="ltr">RPT-00{i}</td>
                      <td className="px-6 py-4 font-bold text-brand-text-primary">ياسر علي</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-brand-info/10 text-brand-info rounded-md text-xs font-bold">مستخدم</span>
                      </td>
                      <td className="px-6 py-4 font-medium">أحمد محمد</td>
                      <td className="px-6 py-4 text-brand-text-muted">منذ ساعتين</td>
                      <td className="px-6 py-4 text-center">
                        {i === 1 ? <span className="text-brand-danger font-bold text-xs">🔴 عالية</span> : <span className="text-brand-text-muted text-xs">عادية</span>}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 bg-brand-warning/10 text-brand-warning rounded-md text-xs font-bold">جديد</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => setShowModal(true)} className="border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center">
                          <MessageSquare size={14} className="ml-1" /> معالجة
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-4 bg-brand-content/50 flex-1 animate-in fade-in duration-300">
            <div className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-xl border border-brand-border shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-danger/10 text-brand-danger flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-brand-danger text-sm">🔴 نزاع جديد مفتوح</h4>
                  <span className="text-xs text-brand-text-muted">منذ 10 دقائق</span>
                </div>
                <p className="text-sm text-brand-text-muted">تم فتح نزاع جديد بواسطة المستأجر "أحمد محمد" حول العملية #OP-2024-0847 بمبلغ 45,000 ر.ي.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-xl border border-brand-border shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-warning/10 text-brand-warning flex items-center justify-center shrink-0">
                <ShieldAlert size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-brand-warning text-sm">🟠 نشاط مشبوه</h4>
                  <span className="text-xs text-brand-text-muted">منذ ساعة</span>
                </div>
                <p className="text-sm text-brand-text-muted">تم رصد تسجيل دخول من جهاز جديد للمستخدم "شركة البناء" وتغيير معلومات الدفع.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-xl border border-brand-border shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-info/10 text-brand-info flex items-center justify-center shrink-0">
                <Flag size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-brand-info text-sm">🟡 بلاغ جديد</h4>
                  <span className="text-xs text-brand-text-muted">منذ ساعتين</span>
                </div>
                <p className="text-sm text-brand-text-muted">قام المستخدم "ياسر علي" بالإبلاغ عن رسائل غير لائقة من المؤجر "علي صالح".</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-xl border border-brand-border shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-success/10 text-brand-success flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-brand-success text-sm">🟢 عملية تأجير مكتملة</h4>
                  <span className="text-xs text-brand-text-muted">منذ 3 ساعات</span>
                </div>
                <p className="text-sm text-brand-text-muted">تم استلام المعدة وإغلاق العملية #OP-2024-0846 بنجاح، وجاري تحويل الأرباح.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Modal */}
      {showModal && (
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
      )}

    </div>
  );
}
