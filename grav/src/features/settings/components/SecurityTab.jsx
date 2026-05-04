import { useState } from 'react';
import { Smartphone, Clock, Monitor, LogOut } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Modal from '../../../components/ui/Modal';

export default function SecurityTab({ mfaEnabled, setMfaEnabled, sessions }) {
  const [sessionToEnd, setSessionToEnd] = useState(null);
  const [activeSessions, setActiveSessions] = useState(sessions);

  const handleEndSession = () => {
    if (sessionToEnd) {
      setActiveSessions(prev => prev.filter(s => s.id !== sessionToEnd.id));
      setSessionToEnd(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
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
            <Button 
              unstyled
              onClick={() => setMfaEnabled(!mfaEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${mfaEnabled ? 'bg-brand-success' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mfaEnabled ? '-translate-x-6' : '-translate-x-1'}`} />
            </Button>
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
            <Select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 font-bold text-sm focus:outline-none focus:border-brand-primary" options={[{ value: '30m', label: '30 دقيقة' }, { value: '1h', label: '1 ساعة' }, { value: '8h', label: '8 ساعات' }]} />
          </div>

        </div>
      </div>

      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="p-4 border-b border-brand-border bg-brand-content/50">
          <h3 className="text-lg font-bold text-brand-text-primary flex items-center">
            الجلسات النشطة <span className="mr-2 px-2 py-0.5 bg-brand-success/10 text-brand-success text-xs rounded-full">{activeSessions.length} جلسات</span>
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {activeSessions.map((session) => (
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
                <Button 
                  unstyled 
                  className="flex items-center space-x-1 space-x-reverse px-3 py-1.5 text-xs font-bold text-brand-danger bg-brand-danger/10 hover:bg-brand-danger hover:text-white rounded-lg transition-colors border border-brand-danger/20"
                  onClick={() => setSessionToEnd(session)}
                >
                  <LogOut size={14} /> <span>إنهاء الجلسة</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!sessionToEnd}
        onClose={() => setSessionToEnd(null)}
        title="تأكيد إنهاء الجلسة"
        footer={
          <div className="p-6 border-t border-brand-border bg-brand-content flex justify-end gap-3 rounded-b-xl">
            <Button variant="outline" onClick={() => setSessionToEnd(null)}>إلغاء</Button>
            <Button className="bg-brand-danger hover:bg-brand-danger/90" onClick={handleEndSession}>تأكيد الإنهاء</Button>
          </div>
        }
      >
        <div className="p-6 space-y-4">
          <p className="text-brand-text-primary">
            هل تريد إنهاء الجلسة على الجهاز <strong>{sessionToEnd?.device}</strong>؟
          </p>
          <div className="bg-brand-content p-4 rounded-lg border border-brand-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted">الجهاز:</span>
              <span className="font-bold">{sessionToEnd?.device}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted">عنوان IP:</span>
              <span className="font-bold" dir="ltr">{sessionToEnd?.ip}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted">آخر نشاط:</span>
              <span className="font-bold">{sessionToEnd?.time}</span>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
