import React, { useState } from 'react';
import { Shield, Users, Edit, Trash2, Plus, Lock, Smartphone, Clock, Monitor, LogOut, CheckCircle2, XCircle } from 'lucide-react';

const adminsData = [
  { id: 1, name: 'أحمد علي', email: 'ahmed@email.com', role: 'Super Admin', roleColor: 'success' },
  { id: 2, name: 'سارة محمد', email: 'sara@email.com', role: 'Support', roleColor: 'info' },
  { id: 3, name: 'خالد عمر', email: 'khaled@email.com', role: 'Finance', roleColor: 'warning' },
];

const permissionsData = [
  { action: 'إدارة المستخدمين', super: true, support: true, finance: false },
  { action: 'الإشراف المالي', super: true, support: false, finance: true },
  { action: 'إدارة النزاعات', super: true, support: true, finance: false },
  { action: 'Audit Log', super: true, support: false, finance: false },
  { action: 'إدارة المعدات', super: true, support: true, finance: false },
];

const sessionsData = [
  { id: 1, device: 'Windows PC - Chrome', ip: '192.168.1.45', time: 'نشط الآن', current: true },
  { id: 2, device: 'iPhone 13 - Safari', ip: '10.0.0.12', time: 'آخر نشاط: قبل ساعتين', current: false },
  { id: 3, device: 'MacBook Pro - Safari', ip: '172.16.0.5', time: 'آخر نشاط: أمس 14:30', current: false },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('roles');
  const [mfaEnabled, setMfaEnabled] = useState(true);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Tabs Header */}
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="flex border-b border-brand-border bg-brand-content/30 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center space-x-2 space-x-reverse px-8 py-4 font-bold text-sm transition-colors relative ${activeTab === 'roles' ? 'text-brand-primary' : 'text-brand-text-muted hover:text-brand-text-primary hover:bg-brand-content'}`}
          >
            <Users size={18} />
            <span>إدارة الأدوار والصلاحيات</span>
            {activeTab === 'roles' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full"></div>}
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-2 space-x-reverse px-8 py-4 font-bold text-sm transition-colors relative ${activeTab === 'security' ? 'text-brand-primary' : 'text-brand-text-muted hover:text-brand-text-primary hover:bg-brand-content'}`}
          >
            <Shield size={18} />
            <span>الأمان والمصادقة</span>
            {activeTab === 'security' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full"></div>}
          </button>
        </div>
      </div>

      {activeTab === 'roles' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Admins Table */}
          <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
            <div className="p-4 border-b border-brand-border bg-brand-content/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-brand-text-primary">المسؤولون</h3>
              <button className="flex items-center space-x-1 space-x-reverse bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-primary/90 transition-colors shadow-sm">
                <Plus size={16} /> <span>إضافة مسؤول جديد</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
                  <tr>
                    <th className="px-6 py-4">الاسم</th>
                    <th className="px-6 py-4">البريد الإلكتروني</th>
                    <th className="px-6 py-4">الدور</th>
                    <th className="px-6 py-4 text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {adminsData.map((admin) => (
                    <tr key={admin.id} className="hover:bg-brand-content/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-brand-text-primary">{admin.name}</td>
                      <td className="px-6 py-4 text-brand-text-muted">{admin.email}</td>
                      <td className="px-6 py-4">
                        <select 
                          className={`bg-brand-${admin.roleColor}/10 text-brand-${admin.roleColor} border border-brand-${admin.roleColor}/20 rounded-md px-3 py-1.5 font-bold text-xs focus:outline-none`}
                          defaultValue={admin.role}
                        >
                          <option value="Super Admin">Super Admin</option>
                          <option value="Support">Support</option>
                          <option value="Finance">Finance</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2 space-x-reverse">
                          <button className="p-1.5 text-brand-text-muted hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                            <Edit size={18} />
                          </button>
                          <button className="p-1.5 text-brand-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Permissions Matrix */}
          <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
            <div className="p-4 border-b border-brand-border bg-brand-content/50">
              <h3 className="text-lg font-bold text-brand-text-primary">مصفوفة الصلاحيات (Roles Matrix)</h3>
              <p className="text-xs text-brand-text-muted mt-1">يتم تطبيق هذه الصلاحيات تلقائياً على كل مسؤول حسب دوره.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead className="bg-brand-content text-brand-text-muted font-bold border-b border-brand-border">
                  <tr>
                    <th className="px-6 py-4 text-right">الصلاحية</th>
                    <th className="px-6 py-4 text-brand-success">Super Admin</th>
                    <th className="px-6 py-4 text-brand-info">Support</th>
                    <th className="px-6 py-4 text-brand-warning">Finance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {permissionsData.map((perm, idx) => (
                    <tr key={idx} className="hover:bg-brand-content/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-brand-text-primary text-right">{perm.action}</td>
                      <td className="px-6 py-4">
                        {perm.super ? <CheckCircle2 size={20} className="text-brand-success mx-auto" /> : <XCircle size={20} className="text-brand-text-muted opacity-30 mx-auto" />}
                      </td>
                      <td className="px-6 py-4">
                        {perm.support ? <CheckCircle2 size={20} className="text-brand-success mx-auto" /> : <XCircle size={20} className="text-brand-text-muted opacity-30 mx-auto" />}
                      </td>
                      <td className="px-6 py-4">
                        {perm.finance ? <CheckCircle2 size={20} className="text-brand-success mx-auto" /> : <XCircle size={20} className="text-brand-text-muted opacity-30 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Security Settings */}
          <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
            <div className="p-4 border-b border-brand-border bg-brand-content/50">
              <h3 className="text-lg font-bold text-brand-text-primary">إعدادات الأمان</h3>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b border-brand-border pb-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center shrink-0">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text-primary">المصادقة متعددة العوامل (2FA)</h4>
                    <p className="text-sm text-brand-text-muted mt-1">إضافة طبقة أمان إضافية لحسابك باستخدام تطبيق مصادقة.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${mfaEnabled ? 'bg-brand-success' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mfaEnabled ? '-translate-x-6' : '-translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-brand-warning/10 text-brand-warning rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text-primary">مدة انتهاء الجلسة التلقائي</h4>
                    <p className="text-sm text-brand-text-muted mt-1">تحديد المدة التي يتم بعدها تسجيل الخروج تلقائياً عند عدم النشاط.</p>
                  </div>
                </div>
                <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 font-bold text-sm focus:outline-none focus:border-brand-primary">
                  <option value="30m">30 دقيقة</option>
                  <option value="1h">1 ساعة</option>
                  <option value="8h">8 ساعات</option>
                </select>
              </div>

            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
            <div className="p-4 border-b border-brand-border bg-brand-content/50">
              <h3 className="text-lg font-bold text-brand-text-primary flex items-center">
                الجلسات النشطة <span className="mr-2 px-2 py-0.5 bg-brand-success/10 text-brand-success text-xs rounded-full">3 جلسات</span>
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {sessionsData.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-brand-border rounded-xl hover:border-brand-primary transition-colors">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-10 h-10 bg-brand-content rounded-xl flex items-center justify-center shrink-0 text-brand-text-muted">
                      {session.device.includes('iPhone') ? <Smartphone size={20} /> : <Monitor size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <h4 className="font-bold text-brand-text-primary text-sm">{session.device}</h4>
                        {session.current && <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-success text-white rounded-full">الجلسة الحالية</span>}
                      </div>
                      <p className="text-xs text-brand-text-muted mt-1" dir="ltr">{session.ip}</p>
                      <p className={`text-xs mt-1 font-bold ${session.current ? 'text-brand-success' : 'text-brand-text-muted'}`}>{session.time}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="flex items-center space-x-1 space-x-reverse px-3 py-1.5 text-xs font-bold text-brand-danger bg-brand-danger/10 hover:bg-brand-danger hover:text-white rounded-lg transition-colors border border-brand-danger/20">
                      <LogOut size={14} /> <span>إنهاء الجلسة</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
