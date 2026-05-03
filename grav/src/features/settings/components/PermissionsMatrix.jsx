import { CheckCircle2, XCircle } from 'lucide-react';

export default function PermissionsMatrix({ permissions }) {
  return (
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
            {permissions.map((perm, idx) => (
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
  );
}
