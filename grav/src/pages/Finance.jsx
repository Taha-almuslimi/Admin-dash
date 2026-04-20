import React, { useState } from 'react';
import { DollarSign, Shield, ArrowUpRight, ArrowDownRight, Search, Calendar, StopCircle, PauseCircle } from 'lucide-react';

const tabs = [
  { id: 'payments', label: 'جميع المدفوعات' },
  { id: 'escrow', label: 'حسابات Escrow' },
  { id: 'profits', label: 'الأرباح المحوّلة' },
  { id: 'refunds', label: 'استردادات التأمين' }
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState('payments');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-brand-success/10 text-brand-success rounded-xl flex items-center justify-center">
            <ArrowUpRight size={24} />
          </div>
          <div>
            <p className="text-brand-text-muted text-sm mb-1">إجمالي المدفوعات</p>
            <p className="text-2xl font-bold text-brand-text-primary">12.5M <span className="text-sm font-normal text-brand-text-muted">ر.ي</span></p>
          </div>
        </div>
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-brand-warning/10 text-brand-warning rounded-xl flex items-center justify-center">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-brand-text-muted text-sm mb-1">Escrow المحتجز</p>
            <p className="text-2xl font-bold text-brand-text-primary">2.45M <span className="text-sm font-normal text-brand-text-muted">ر.ي</span></p>
          </div>
        </div>
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-brand-info/10 text-brand-info rounded-xl flex items-center justify-center">
            <ArrowDownRight size={24} />
          </div>
          <div>
            <p className="text-brand-text-muted text-sm mb-1">استردادات التأمين</p>
            <p className="text-2xl font-bold text-brand-text-primary">450K <span className="text-sm font-normal text-brand-text-muted">ر.ي</span></p>
          </div>
        </div>
        <div className="bg-brand-card rounded-xl p-6 border border-brand-border shadow-sm flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-brand-text-muted text-sm mb-1">الأرباح المحوّلة</p>
            <p className="text-2xl font-bold text-brand-text-primary">1.8M <span className="text-sm font-normal text-brand-text-muted">ر.ي</span></p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        
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
        
        {/* Tab 1: Payments */}
        {activeTab === 'payments' && (
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
              <div className="flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted cursor-pointer hover:border-brand-primary transition-colors">
                <Calendar size={16} />
                <span>تاريخ الدفع</span>
              </div>
              <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
                <option value="">حالة الدفع: الكل</option>
                <option value="paid">مكتمل</option>
                <option value="pending">معلق</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">المستأجر</th>
                    <th className="px-6 py-4">المعدة</th>
                    <th className="px-6 py-4">مبلغ الإيجار</th>
                    <th className="px-6 py-4">مبلغ التأمين</th>
                    <th className="px-6 py-4">تاريخ الدفع</th>
                    <th className="px-6 py-4 text-center">الحالة</th>
                    <th className="px-6 py-4 text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {[1, 2, 3, 4].map(i => (
                    <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                      <td className="px-6 py-4 font-bold" dir="ltr">TRX-00{i}</td>
                      <td className="px-6 py-4 font-medium">أحمد محمد</td>
                      <td className="px-6 py-4 text-brand-text-muted">حفار JCB</td>
                      <td className="px-6 py-4 font-bold text-brand-primary">15,000 ر.ي</td>
                      <td className="px-6 py-4 font-medium">50,000 ر.ي</td>
                      <td className="px-6 py-4 text-brand-text-muted" dir="ltr">2024-05-1{i}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 bg-brand-success/10 text-brand-success rounded-md text-xs font-bold">مكتمل</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-brand-danger hover:bg-brand-danger/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center">
                          <StopCircle size={14} className="ml-1" /> إيقاف/مراجعة
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Escrow */}
        {activeTab === 'escrow' && (
          <div className="animate-in fade-in duration-300">
            <div className="p-6 border-b border-brand-border bg-brand-content/30 flex justify-between items-center">
              <div>
                <p className="text-brand-text-muted text-sm mb-1">إجمالي المحتجز</p>
                <p className="text-2xl font-bold text-brand-warning">2,450,000 ر.ي</p>
              </div>
              <div className="text-left">
                <p className="text-brand-text-muted text-sm mb-1">عدد العمليات المفتوحة</p>
                <p className="text-2xl font-bold text-brand-text-primary">34</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
                  <tr>
                    <th className="px-6 py-4">عملية</th>
                    <th className="px-6 py-4">مبلغ محتجز</th>
                    <th className="px-6 py-4">منذ</th>
                    <th className="px-6 py-4 text-center">الحالة</th>
                    <th className="px-6 py-4 text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {[1, 2, 3].map(i => (
                    <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                      <td className="px-6 py-4 font-bold" dir="ltr">OP-2024-08{i}</td>
                      <td className="px-6 py-4 font-bold text-brand-warning">150,000 ر.ي</td>
                      <td className="px-6 py-4 text-brand-text-muted">12 مايو 2024</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 bg-brand-warning/10 text-brand-warning rounded-md text-xs font-bold">In Use</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-brand-danger border border-brand-danger hover:bg-brand-danger/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center">
                          <PauseCircle size={14} className="ml-1" /> تعليق الأموال
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Profits */}
        {activeTab === 'profits' && (
          <div className="animate-in fade-in duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
                  <tr>
                    <th className="px-6 py-4">المؤجر</th>
                    <th className="px-6 py-4 text-center">عدد العمليات</th>
                    <th className="px-6 py-4">إجمالي الأرباح</th>
                    <th className="px-6 py-4 text-center">حالة التحويل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {[1, 2, 3].map(i => (
                    <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-brand-text-primary">مؤسسة التقنية</td>
                      <td className="px-6 py-4 text-center font-medium">12</td>
                      <td className="px-6 py-4 font-bold text-brand-success">450,000 ر.ي</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 bg-brand-info/10 text-brand-info rounded-md text-xs font-bold">Processing</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Refunds */}
        {activeTab === 'refunds' && (
          <div className="animate-in fade-in duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
                  <tr>
                    <th className="px-6 py-4">المستأجر</th>
                    <th className="px-6 py-4">مبلغ التأمين الأصلي</th>
                    <th className="px-6 py-4">المبلغ المُسترَد</th>
                    <th className="px-6 py-4">تاريخ الاسترداد</th>
                    <th className="px-6 py-4 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {[1, 2, 3].map(i => (
                    <tr key={i} className="hover:bg-brand-content/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-brand-text-primary">أحمد محمد</td>
                      <td className="px-6 py-4 font-medium text-brand-text-muted">100,000 ر.ي</td>
                      <td className="px-6 py-4 font-bold text-brand-success">100,000 ر.ي</td>
                      <td className="px-6 py-4 text-brand-text-muted" dir="ltr">2024-05-1{i}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 bg-brand-success/10 text-brand-success rounded-md text-xs font-bold">تم الاسترداد</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
