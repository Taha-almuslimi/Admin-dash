import { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { badgeClass, borderClass } from '../../../utils/statusClasses';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Table from '../../../components/ui/Table';
import Modal from '../../../components/ui/Modal';

export default function AdminsTable({ admins }) {
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);

  const columns = [
    { key: 'name', label: 'الاسم' },
    { key: 'email', label: 'البريد الإلكتروني' },
    { key: 'role', label: 'الدور' },
    { key: 'action', label: 'إجراء', className: 'px-6 py-4 text-center' },
  ];

  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <div className="p-4 border-b border-brand-border bg-brand-content/50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-brand-text-primary">المسؤولون</h3>
        <Button 
          unstyled 
          className="flex items-center space-x-1 space-x-reverse bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-primary/90 transition-colors shadow-sm"
          onClick={() => setIsAddAdminOpen(true)}
        >
          <Plus size={16} /> <span>إضافة مسؤول جديد</span>
        </Button>
      </div>
      <Table
        columns={columns}
        data={admins}
        renderRow={(admin) => (
          <tr key={admin.id} className="hover:bg-brand-content/50 transition-colors">
                <td className="px-6 py-4 font-bold text-brand-text-primary">{admin.name}</td>
                <td className="px-6 py-4 text-brand-text-muted">{admin.email}</td>
                <td className="px-6 py-4">
                  <Select
                    className={`${badgeClass(admin.roleColor)} border ${borderClass(admin.roleColor)} rounded-md px-3 py-1.5 font-bold text-xs focus:outline-none`}
                    defaultValue={admin.role}
                    options={[{ value: 'Super Admin', label: 'Super Admin' }, { value: 'Support', label: 'Support' }, { value: 'Finance', label: 'Finance' }]}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <Button unstyled className="p-1.5 text-brand-text-muted hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                      <Edit size={18} />
                    </Button>
                    <Button unstyled className="p-1.5 text-brand-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
        )}
      />

      <Modal
        isOpen={isAddAdminOpen}
        onClose={() => setIsAddAdminOpen(false)}
        title="إضافة مسؤول جديد"
        footer={
          <div className="p-6 border-t border-brand-border bg-brand-content flex justify-end gap-3 rounded-b-xl">
            <Button variant="outline" onClick={() => setIsAddAdminOpen(false)}>إلغاء</Button>
            <Button className="bg-brand-primary hover:bg-brand-primary/90" onClick={() => setIsAddAdminOpen(false)}>حفظ وإضافة</Button>
          </div>
        }
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">اسم المسؤول</label>
            <input 
              type="text" 
              className="w-full p-3 border border-brand-border rounded-lg bg-brand-content focus:outline-none focus:border-brand-primary"
              placeholder="الاسم الكامل"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">البريد الإلكتروني</label>
            <input 
              type="email" 
              className="w-full p-3 border border-brand-border rounded-lg bg-brand-content focus:outline-none focus:border-brand-primary"
              placeholder="example@admin.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">الدور</label>
            <Select 
              options={[
                { value: 'Super Admin', label: 'Super Admin' }, 
                { value: 'Support', label: 'Support' }, 
                { value: 'Finance', label: 'Finance' }
              ]} 
              className="w-full border border-brand-border rounded-lg px-4 py-3 bg-brand-content focus:outline-none focus:border-brand-primary"
              placeholder="اختر الدور"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text-primary mb-2">كلمة المرور المؤقتة</label>
            <input 
              type="password" 
              className="w-full p-3 border border-brand-border rounded-lg bg-brand-content focus:outline-none focus:border-brand-primary"
              placeholder="********"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
