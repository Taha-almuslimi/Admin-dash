import React, { useState } from 'react';
import { Search, MapPin, Calendar, FileText, X, ChevronLeft, Eye, Clock, Shield, CheckCircle, Image as ImageIcon } from 'lucide-react';

const tabs = [
  { id: 'all', label: 'الكل', count: 1240 },
  { id: 'pending', label: 'Pending', count: 45 },
  { id: 'confirmed', label: 'Confirmed', count: 89 },
  { id: 'inUse', label: 'In Use', count: 230 },
  { id: 'completed', label: 'Completed', count: 850 },
  { id: 'cancelled', label: 'Cancelled', count: 18 },
  { id: 'disputed', label: 'Disputed', count: 8 },
];

const rentalsData = [
  { id: 'OP-2024-0847', tenant: 'أحمد محمد', owner: 'مؤسسة التقنية', eq: 'حفار صغير JCB', duration: '3 أيام', total: 45000, status: 'In Use', statusColor: 'warning', startDate: '2024-05-15', endDate: '2024-05-18', insurance: 50000, escrow: 95000 },
  { id: 'OP-2024-0846', tenant: 'ياسر علي', owner: 'شركة البناء', eq: 'رافعة شوكية 3 طن', duration: '1 يوم', total: 20000, status: 'Completed', statusColor: 'success', startDate: '2024-05-10', endDate: '2024-05-11', insurance: 100000, escrow: 0 },
  { id: 'OP-2024-0845', tenant: 'خالد عبدلله', owner: 'أحمد محمد', eq: 'مولد كهربائي 50KVA', duration: '5 أيام', total: 50000, status: 'Pending', statusColor: 'pending', startDate: '2024-05-20', endDate: '2024-05-25', insurance: 30000, escrow: 80000 },
  { id: 'OP-2024-0844', tenant: 'سالم سعيد', owner: 'شركة الإعمار', eq: 'خلاطة إسمنت مركزية', duration: '10 أيام', total: 350000, status: 'Disputed', statusColor: 'danger', startDate: '2024-05-01', endDate: '2024-05-10', insurance: 150000, escrow: 500000 },
  { id: 'OP-2024-0843', tenant: 'مؤسسة السلام', owner: 'علي صالح', eq: 'حفار صغير JCB', duration: '2 أيام', total: 30000, status: 'Confirmed', statusColor: 'info', startDate: '2024-05-16', endDate: '2024-05-18', insurance: 50000, escrow: 80000 },
];

export default function Rentals() {
  const [activeTab, setActiveTab] = useState('all');
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const openDrawer = (rental) => {
    setSelectedRental(rental);
    setShowDrawer(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Status Filter Tabs */}
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border p-2 flex overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 space-x-reverse px-5 py-2.5 rounded-lg text-sm font-bold transition-colors ${
              activeTab === tab.id 
                ? 'bg-brand-primary text-white shadow-md' 
                : 'text-brand-text-muted hover:bg-brand-content'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-brand-content text-brand-text-primary'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Additional Filters */}
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

      {/* Data Table */}
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">المستأجر</th>
                <th className="px-6 py-4">المؤجر</th>
                <th className="px-6 py-4">المعدة</th>
                <th className="px-6 py-4 text-center">المدة</th>
                <th className="px-6 py-4 text-center">الإجمالي (ر.ي)</th>
                <th className="px-6 py-4 text-center">الحالة</th>
                <th className="px-6 py-4 text-center">العقد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {rentalsData.map((rental) => (
                <tr key={rental.id} className="hover:bg-brand-content/50 transition-colors cursor-pointer" onClick={() => openDrawer(rental)}>
                  <td className="px-6 py-4 font-bold text-brand-text-primary" dir="ltr">{rental.id}</td>
                  <td className="px-6 py-4">{rental.tenant}</td>
                  <td className="px-6 py-4">{rental.owner}</td>
                  <td className="px-6 py-4 text-brand-text-muted">{rental.eq}</td>
                  <td className="px-6 py-4 text-center font-bold text-brand-text-primary">{rental.duration}</td>
                  <td className="px-6 py-4 text-center font-bold text-brand-primary">{rental.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      rental.statusColor === 'pending' ? 'bg-brand-text-muted/10 text-brand-text-muted' :
                      `bg-brand-${rental.statusColor}/10 text-brand-${rental.statusColor}`
                    }`}>
                      {rental.status === 'In Use' ? 'In Use 🔧' : rental.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={(e) => { e.stopPropagation(); openDrawer(rental); }} className="p-1.5 text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض العقد">
                      <FileText size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Overlay */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => setShowDrawer(false)} />
      )}

      {/* Rental Details Drawer */}
      <div className={`fixed top-0 bottom-0 right-0 w-full md:w-[480px] bg-brand-card shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${showDrawer ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedRental && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-content/50">
              <div>
                <h2 className="text-xl font-bold text-brand-text-primary flex items-center">
                  تفاصيل العملية 
                  <span className="text-sm font-normal text-brand-text-muted ml-2 mr-2" dir="ltr">{selectedRental.id}</span>
                </h2>
                <div className="mt-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    selectedRental.statusColor === 'pending' ? 'bg-brand-text-muted/10 text-brand-text-muted' :
                    `bg-brand-${selectedRental.statusColor}/10 text-brand-${selectedRental.statusColor}`
                  }`}>
                    {selectedRental.status === 'In Use' ? 'In Use 🔧' : selectedRental.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setShowDrawer(false)} className="p-2 text-brand-text-muted hover:text-brand-danger rounded-full hover:bg-brand-danger/10 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Linked Profiles */}
              <div className="bg-brand-content rounded-xl p-4 border border-brand-border space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-brand-border border-dashed">
                  <div>
                    <p className="text-xs text-brand-text-muted mb-1">المستأجر</p>
                    <p className="font-bold text-brand-text-primary">{selectedRental.tenant}</p>
                  </div>
                  <button className="text-brand-info text-sm font-bold flex items-center hover:underline">عرض الملف <ChevronLeft size={14} /></button>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-brand-border border-dashed">
                  <div>
                    <p className="text-xs text-brand-text-muted mb-1">المؤجر</p>
                    <p className="font-bold text-brand-text-primary">{selectedRental.owner}</p>
                  </div>
                  <button className="text-brand-info text-sm font-bold flex items-center hover:underline">عرض الملف <ChevronLeft size={14} /></button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-brand-text-muted mb-1">المعدة</p>
                    <p className="font-bold text-brand-text-primary">{selectedRental.eq}</p>
                  </div>
                  <button className="text-brand-info text-sm font-bold flex items-center hover:underline">عرض المعدة <ChevronLeft size={14} /></button>
                </div>
              </div>

              {/* Financial & Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-content p-4 rounded-xl border border-brand-border">
                  <p className="text-xs text-brand-text-muted mb-1 flex items-center"><Calendar size={12} className="ml-1"/> فترة الإيجار</p>
                  <p className="font-bold text-sm" dir="ltr">{selectedRental.startDate}</p>
                  <p className="font-bold text-sm" dir="ltr">{selectedRental.endDate}</p>
                </div>
                <div className="bg-brand-content p-4 rounded-xl border border-brand-border">
                  <p className="text-xs text-brand-text-muted mb-1 flex items-center"><Clock size={12} className="ml-1"/> المدة</p>
                  <p className="font-bold text-brand-text-primary text-lg">{selectedRental.duration}</p>
                </div>
                <div className="bg-brand-content p-4 rounded-xl border border-brand-border col-span-2 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-brand-text-muted mb-1">مبلغ الإيجار الإجمالي</p>
                    <p className="font-bold text-brand-primary text-xl">{selectedRental.total.toLocaleString()} <span className="text-sm font-normal text-brand-text-primary">ر.ي</span></p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-brand-text-muted mb-1">مبلغ التأمين</p>
                    <p className="font-bold text-brand-text-primary">{selectedRental.insurance.toLocaleString()} ر.ي</p>
                  </div>
                </div>
                <div className="bg-brand-warning/10 p-4 rounded-xl border border-brand-warning/20 col-span-2 flex justify-between items-center">
                  <p className="text-sm font-bold text-brand-warning flex items-center"><Shield size={16} className="ml-2"/> Escrow المحتجز حالياً</p>
                  <p className="font-bold text-brand-warning text-lg">{selectedRental.escrow.toLocaleString()} ر.ي</p>
                </div>
              </div>

              {/* Documents & Media */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-white border border-brand-border rounded-xl hover:border-brand-primary transition-colors group">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 rounded-lg bg-brand-info/10 text-brand-info flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <span className="font-bold text-brand-text-primary group-hover:text-brand-primary transition-colors">عرض العقد الإلكتروني</span>
                  </div>
                  <ChevronLeft size={20} className="text-brand-text-muted group-hover:text-brand-primary transition-colors" />
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center p-4 bg-white border border-brand-border rounded-xl hover:bg-brand-content transition-colors">
                    <ImageIcon size={24} className="text-brand-text-muted mb-2" />
                    <span className="font-bold text-sm text-brand-text-primary">صور التسليم</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-white border border-brand-border rounded-xl hover:bg-brand-content transition-colors">
                    <ImageIcon size={24} className="text-brand-text-muted mb-2" />
                    <span className="font-bold text-sm text-brand-text-primary">صور الإرجاع</span>
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-brand-text-primary">سجل الحالات</h4>
                <div className="relative pl-4 space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-success before:via-brand-success before:to-brand-border right-4 w-full pr-4 before:right-6 before:left-auto">
                  
                  <div className="relative flex items-center justify-between w-full pr-8">
                    <div className="absolute right-0 w-6 h-6 bg-brand-success rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-brand-text-primary text-sm">إنشاء الطلب</h5>
                      <p className="text-xs text-brand-text-muted mt-1">12 مايو, 10:00 ص</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between w-full pr-8">
                    <div className="absolute right-0 w-6 h-6 bg-brand-success rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-brand-text-primary text-sm">تأكيد المؤجر</h5>
                      <p className="text-xs text-brand-text-muted mt-1">12 مايو, 14:30 م</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between w-full pr-8">
                    <div className="absolute right-0 w-6 h-6 bg-brand-warning rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h5 className="font-bold text-brand-warning text-sm">جارٍ الاستخدام</h5>
                      <p className="text-xs text-brand-text-muted mt-1">15 مايو, 08:00 ص</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </>
        )}
      </div>

    </div>
  );
}
