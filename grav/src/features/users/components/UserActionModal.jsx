import { useState } from 'react';
import { X, AlertTriangle, PauseCircle, Ban } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Select from '../../../components/ui/Select';

export default function UserActionModal({ isOpen, user, actionType, setActionType, onClose, onConfirm }) {
  const [reason, setReason] = useState('');
  const [policy, setPolicy] = useState('');

  if (!isOpen || !user) return null;

  const handleConfirm = () => {
    onConfirm?.({ user, type: actionType, reason, policy });
    setReason('');
    setPolicy('');
  };

  const handleClose = () => {
    setReason('');
    setPolicy('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      header={
        <div className="p-6 border-b border-brand-border flex justify-between items-center">
          <h3 className="text-lg font-bold flex items-center text-brand-text-primary">
            {actionType === 'warn' && <AlertTriangle className="text-brand-warning ml-2" />}
            {actionType === 'suspend' && <PauseCircle className="text-brand-warning ml-2" />}
            {actionType === 'ban' && <Ban className="text-brand-danger ml-2" />}
            {actionType === 'warn' ? 'تحذير' : actionType === 'suspend' ? 'تعليق مؤقت' : 'حظر دائم'} للمستخدم
          </h3>
          <Button unstyled onClick={handleClose} className="text-brand-text-muted hover:text-brand-danger">
            <X size={20} />
          </Button>
        </div>
      }
      footer={
        <div className="p-4 border-t border-brand-border bg-brand-content/50 rounded-b-xl flex justify-end space-x-3 space-x-reverse">
          <Button 
            unstyled
            onClick={handleClose}
            className="px-5 py-2.5 text-brand-text-primary font-bold text-sm bg-white border border-brand-border hover:bg-gray-50 rounded-lg transition-colors"
          >
            إلغاء
          </Button>
          <Button unstyled onClick={handleConfirm} className={`px-5 py-2.5 text-white font-bold text-sm rounded-lg transition-colors shadow-sm
            ${actionType === 'warn' ? 'bg-brand-warning hover:bg-brand-warning/90' : 
              actionType === 'suspend' ? 'bg-brand-warning hover:bg-brand-warning/90' : 
              'bg-brand-danger hover:bg-brand-danger/90'}`}
          >
            تأكيد الإجراء
          </Button>
        </div>
      }
    >
      <div className="p-6 space-y-5">
        <div className="flex items-center space-x-3 space-x-reverse bg-brand-content p-3 rounded-lg border border-brand-border">
          <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-bold text-sm">{user.name}</p>
            <p className="text-xs text-brand-text-muted" dir="ltr">{user.phone}</p>
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
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-brand-text-primary mb-2">ربط بسياسة</label>
          <Select
            className="w-full border border-brand-border bg-brand-content rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
            placeholder="اختر السياسة المخالفة..."
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            options={[
              { value: 'policy_1', label: 'مخالفة شروط الاستخدام (البند 3.1)' },
              { value: 'policy_2', label: 'احتيال مالي' },
              { value: 'policy_3', label: 'إساءة للمستخدمين الآخرين' },
            ]}
          />
        </div>
      </div>
    </Modal>
  );
}
