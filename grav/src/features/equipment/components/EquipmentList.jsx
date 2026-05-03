import { Eye, Edit, Trash2 } from 'lucide-react';

export default function EquipmentList({ equipment, onOpenDrawer }) {
  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <table className="w-full text-right text-sm">
        <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
          <tr>
            <th className="px-6 py-4">المعدة</th>
            <th className="px-6 py-4">الموقع والتصنيف</th>
            <th className="px-6 py-4">المؤجر</th>
            <th className="px-6 py-4 text-center">السعر (يومياً)</th>
            <th className="px-6 py-4 text-center">الحالة</th>
            <th className="px-6 py-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border">
          {equipment.map(item => (
            <tr key={item.id} className="hover:bg-brand-content/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={() => onOpenDrawer(item)}>
                  <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-brand-border" />
                  <span className="font-bold text-brand-text-primary">{item.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-brand-text-primary text-xs flex items-center">📍 {item.location}</span>
                  <span className="text-brand-text-muted text-xs flex items-center">🏷️ {item.category}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-bold text-brand-text-primary">{item.owner}</td>
              <td className="px-6 py-4 text-center font-bold text-brand-primary">{item.price.toLocaleString()} ر.ي</td>
              <td className="px-6 py-4 text-center">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md bg-brand-${item.statusColor}/10 text-brand-${item.statusColor}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <button onClick={() => onOpenDrawer(item)} className="p-1.5 text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors">
                    <Eye size={18} />
                  </button>
                  <button className="p-1.5 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                    <Edit size={18} />
                  </button>
                  <button className="p-1.5 text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
