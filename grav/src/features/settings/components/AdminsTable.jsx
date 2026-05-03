import { Edit, Trash2, Plus } from 'lucide-react';

export default function AdminsTable({ admins }) {
  return (
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
            {admins.map((admin) => (
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
  );
}
