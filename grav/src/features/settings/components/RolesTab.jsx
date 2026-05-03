import React from 'react';
import { Plus, Edit, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { adminsData, permissionsData } from '../../../data/auditlog';

export default function RolesTab() {
  return (
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
  );
}
