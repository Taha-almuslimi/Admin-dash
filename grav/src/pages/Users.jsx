import React, { useState } from 'react';
import { Search, Download, Eye, AlertTriangle, PauseCircle, Ban, X, Phone, Mail, Calendar, CheckCircle } from 'lucide-react';

const usersData = [
  { id: 1, name: 'أحمد محمد', phone: '+967 771 234 567', email: 'ahmed@email.com', type: 'مستأجر', typeColor: 'info', rating: 4.5, ops: 12, status: 'نشط', statusColor: 'success', gov: 'صنعاء', kyc: true, joined: '2023-05-12', avatar: 'https://ui-avatars.com/api/?name=Ahmed+M&background=3498DB&color=fff' },
  { id: 2, name: 'شركة البناء الحديث', phone: '+967 731 234 567', email: 'info@modernbuild.com', type: 'مؤجر', typeColor: 'success', rating: 4.8, ops: 145, status: 'نشط', statusColor: 'success', gov: 'عدن', kyc: true, joined: '2022-11-04', avatar: 'https://ui-avatars.com/api/?name=MB&background=27AE60&color=fff' },
  { id: 3, name: 'علي صالح', phone: '+967 711 234 567', email: 'ali@email.com', type: 'مستأجر', typeColor: 'info', rating: 3.2, ops: 4, status: 'محظور', statusColor: 'danger', gov: 'تعز', kyc: false, joined: '2024-01-20', avatar: 'https://ui-avatars.com/api/?name=Ali+S&background=E74C3C&color=fff' },
  { id: 4, name: 'مؤسسة التقنية', phone: '+967 770 000 000', email: 'tech@email.com', type: 'مؤجر', typeColor: 'success', rating: 4.9, ops: 89, status: 'موقوف', statusColor: 'warning', gov: 'حضرموت', kyc: true, joined: '2023-08-15', avatar: 'https://ui-avatars.com/api/?name=Tech&background=F39C12&color=fff' },
];

export default function Users() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState('warn'); // warn, suspend, ban

  const openDrawer = (user) => {
    setSelectedUser(user);
    setShowDrawer(true);
  };

  const openActionModal = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setShowModal(true);
    setShowDrawer(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filter Bar */}
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

      {/* Data Table */}
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-4">المستخدم</th>
                <th className="px-6 py-4">الجوال</th>
                <th className="px-6 py-4">النوع</th>
                <th className="px-6 py-4">المحافظة</th>
                <th className="px-6 py-4 text-center">التقييم</th>
                <th className="px-6 py-4 text-center">العمليات</th>
                <th className="px-6 py-4 text-center">الحالة</th>
                <th className="px-6 py-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {usersData.map((user) => (
                <tr key={user.id} className="hover:bg-brand-content/50 transition-colors cursor-pointer" onClick={() => openDrawer(user)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-brand-border" />
                      <span className="font-bold text-brand-text-primary">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium" dir="ltr">{user.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md bg-brand-${user.typeColor}/10 text-brand-${user.typeColor}`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-text-muted">{user.gov}</td>
                  <td className="px-6 py-4 text-center font-bold text-brand-text-primary">
                    ⭐ {user.rating}
                  </td>
                  <td className="px-6 py-4 text-center text-brand-text-muted">{user.ops}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-brand-${user.statusColor}/10 text-brand-${user.statusColor}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => openDrawer(user)} className="p-1.5 text-brand-text-muted hover:text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => openActionModal(user, 'warn')} className="p-1.5 text-brand-text-muted hover:text-brand-warning hover:bg-brand-warning/10 rounded-lg transition-colors" title="تحذير">
                        <AlertTriangle size={18} />
                      </button>
                      <button onClick={() => openActionModal(user, 'suspend')} className="p-1.5 text-brand-text-muted hover:text-brand-warning hover:bg-brand-warning/10 rounded-lg transition-colors" title="تعليق">
                        <PauseCircle size={18} />
                      </button>
                      <button onClick={() => openActionModal(user, 'ban')} className="p-1.5 text-brand-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors" title="حظر">
                        <Ban size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-brand-border bg-brand-content text-sm text-brand-text-muted flex justify-between items-center">
          <span>عرض 1 إلى 4 من 3,580 مستخدم</span>
          <div className="flex space-x-1 space-x-reverse">
            <button className="px-3 py-1 border border-brand-border rounded hover:bg-white disabled:opacity-50" disabled>السابق</button>
            <button className="px-3 py-1 border border-brand-border rounded bg-brand-primary text-white">1</button>
            <button className="px-3 py-1 border border-brand-border rounded hover:bg-white">2</button>
            <button className="px-3 py-1 border border-brand-border rounded hover:bg-white">التالي</button>
          </div>
        </div>
      </div>

      {/* Drawer Overlay */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => setShowDrawer(false)} />
      )}

      {/* User Details Drawer */}
      <div className={`fixed top-0 bottom-0 right-0 w-full md:w-[480px] bg-brand-card shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${showDrawer ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedUser && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-content/50">
              <h2 className="text-xl font-bold text-brand-text-primary">تفاصيل المستخدم</h2>
              <button onClick={() => setShowDrawer(false)} className="p-2 text-brand-text-muted hover:text-brand-danger rounded-full hover:bg-brand-danger/10 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Profile Header */}
              <div className="flex items-start space-x-4 space-x-reverse">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-20 h-20 rounded-xl border-2 border-brand-border" />
                <div>
                  <h3 className="text-2xl font-bold text-brand-text-primary">{selectedUser.name}</h3>
                  <div className="flex items-center space-x-2 space-x-reverse mt-2">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded bg-brand-${selectedUser.typeColor}/10 text-brand-${selectedUser.typeColor}`}>
                      {selectedUser.type}
                    </span>
                    <span className="text-brand-text-muted text-sm flex items-center">📍 {selectedUser.gov}</span>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse mt-3">
                    <div className="flex items-center text-brand-text-primary font-bold">⭐ {selectedUser.rating} <span className="text-brand-text-muted text-sm font-normal mr-1">/ 5</span></div>
                    <div className="text-sm text-brand-text-muted border-r border-brand-border pr-4"><span className="font-bold text-brand-text-primary">{selectedUser.ops}</span> عملية</div>
                  </div>
                </div>
              </div>

              {/* Contact & KYC Info */}
              <div className="grid grid-cols-2 gap-4 bg-brand-content rounded-xl p-4 border border-brand-border">
                <div className="flex items-center text-sm">
                  <Phone size={16} className="text-brand-text-muted ml-2" />
                  <span dir="ltr" className="font-medium">{selectedUser.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail size={16} className="text-brand-text-muted ml-2" />
                  <span className="font-medium truncate">{selectedUser.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="text-brand-text-muted ml-2" />
                  <span className="font-medium">التسجيل: {selectedUser.joined}</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle size={16} className={selectedUser.kyc ? "text-brand-success ml-2" : "text-brand-text-muted ml-2"} />
                  <span className={selectedUser.kyc ? "text-brand-success font-bold" : "text-brand-text-muted font-medium"}>
                    حالة KYC: {selectedUser.kyc ? 'موثق' : 'غير موثق'}
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
              <button onClick={() => openActionModal(selectedUser, 'warn')} className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-warning/10 text-brand-warning hover:bg-brand-warning hover:text-white transition-colors border border-brand-warning/20">
                تحذير
              </button>
              <button onClick={() => openActionModal(selectedUser, 'suspend')} className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-warning/10 text-brand-warning hover:bg-brand-warning hover:text-white transition-colors border border-brand-warning/20">
                تعليق
              </button>
              <button onClick={() => openActionModal(selectedUser, 'ban')} className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-danger/10 text-brand-danger hover:bg-brand-danger hover:text-white transition-colors border border-brand-danger/20">
                حظر
              </button>
            </div>
          </>
        )}
      </div>

      {/* Action Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-brand-card rounded-xl w-full max-w-md shadow-2xl border border-brand-border animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-brand-border flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center text-brand-text-primary">
                {actionType === 'warn' && <AlertTriangle className="text-brand-warning ml-2" />}
                {actionType === 'suspend' && <PauseCircle className="text-brand-warning ml-2" />}
                {actionType === 'ban' && <Ban className="text-brand-danger ml-2" />}
                {actionType === 'warn' ? 'تحذير' : actionType === 'suspend' ? 'تعليق مؤقت' : 'حظر دائم'} للمستخدم
              </h3>
              <button onClick={() => setShowModal(false)} className="text-brand-text-muted hover:text-brand-danger">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="flex items-center space-x-3 space-x-reverse bg-brand-content p-3 rounded-lg border border-brand-border">
                <img src={selectedUser.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-bold text-sm">{selectedUser.name}</p>
                  <p className="text-xs text-brand-text-muted" dir="ltr">{selectedUser.phone}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-text-primary mb-2">نوع الإجراء</label>
                <div className="flex space-x-4 space-x-reverse">
                  <label className="flex items-center">
                    <input type="radio" name="actionType" checked={actionType === 'warn'} onChange={() => setActionType('warn')} className="text-brand-primary focus:ring-brand-primary" />
                    <span className="mr-2 text-sm">تحذير</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="actionType" checked={actionType === 'suspend'} onChange={() => setActionType('suspend')} className="text-brand-warning focus:ring-brand-warning" />
                    <span className="mr-2 text-sm">تعليق مؤقت</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="actionType" checked={actionType === 'ban'} onChange={() => setActionType('ban')} className="text-brand-danger focus:ring-brand-danger" />
                    <span className="mr-2 text-sm">حظر دائم</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brand-text-primary mb-2">السبب <span className="text-brand-danger">*</span></label>
                <textarea 
                  className="w-full border border-brand-border bg-brand-content rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary h-24 resize-none"
                  placeholder="اكتب سبب الإجراء بالتفصيل..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-text-primary mb-2">ربط بسياسة</label>
                <select className="w-full border border-brand-border bg-brand-content rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary">
                  <option value="">اختر السياسة المخالفة...</option>
                  <option value="policy_1">مخالفة شروط الاستخدام (البند 3.1)</option>
                  <option value="policy_2">احتيال مالي</option>
                  <option value="policy_3">إساءة للمستخدمين الآخرين</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-t border-brand-border bg-brand-content/50 rounded-b-xl flex justify-end space-x-3 space-x-reverse">
              <button 
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-brand-text-primary font-bold text-sm bg-white border border-brand-border hover:bg-gray-50 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button className={`px-5 py-2.5 text-white font-bold text-sm rounded-lg transition-colors shadow-sm
                ${actionType === 'warn' ? 'bg-brand-warning hover:bg-brand-warning/90' : 
                  actionType === 'suspend' ? 'bg-brand-warning hover:bg-brand-warning/90' : 
                  'bg-brand-danger hover:bg-brand-danger/90'}`}
              >
                تأكيد الإجراء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
