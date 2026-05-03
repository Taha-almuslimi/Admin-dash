import { Eye, AlertTriangle, PauseCircle, Ban } from 'lucide-react';

export default function UsersTable({ users, onOpenDrawer, onOpenActionModal }) {
  return (
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
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-brand-content/50 transition-colors cursor-pointer" onClick={() => onOpenDrawer(user)}>
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
                    <button onClick={() => onOpenDrawer(user)} className="p-1.5 text-brand-text-muted hover:text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => onOpenActionModal(user, 'warn')} className="p-1.5 text-brand-text-muted hover:text-brand-warning hover:bg-brand-warning/10 rounded-lg transition-colors" title="تحذير">
                      <AlertTriangle size={18} />
                    </button>
                    <button onClick={() => onOpenActionModal(user, 'suspend')} className="p-1.5 text-brand-text-muted hover:text-brand-warning hover:bg-brand-warning/10 rounded-lg transition-colors" title="تعليق">
                      <PauseCircle size={18} />
                    </button>
                    <button onClick={() => onOpenActionModal(user, 'ban')} className="p-1.5 text-brand-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors" title="حظر">
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
  );
}
