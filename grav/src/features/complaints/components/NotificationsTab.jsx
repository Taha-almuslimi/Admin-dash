import { AlertTriangle, Bell, CheckCircle2, Flag, ShieldAlert } from 'lucide-react';
import EmptyState from '../../../components/ui/EmptyState';

const notificationTypes = {
  danger: {
    icon: AlertTriangle,
    className: 'bg-brand-danger/10 text-brand-danger',
    titleClassName: 'text-brand-danger',
  },
  warning: {
    icon: ShieldAlert,
    className: 'bg-brand-warning/10 text-brand-warning',
    titleClassName: 'text-brand-warning',
  },
  info: {
    icon: Flag,
    className: 'bg-brand-info/10 text-brand-info',
    titleClassName: 'text-brand-info',
  },
  success: {
    icon: CheckCircle2,
    className: 'bg-brand-success/10 text-brand-success',
    titleClassName: 'text-brand-success',
  },
};

function NotificationItem({ notification }) {
  const type = notificationTypes[notification.type] || notificationTypes.info;
  const Icon = type.icon;

  return (
    <div className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-xl border border-brand-border shadow-sm">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${type.className}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1 gap-3">
          <h4 className={`font-bold text-sm ${type.titleClassName}`}>{notification.title}</h4>
          <span className="text-xs text-brand-text-muted whitespace-nowrap">{notification.time}</span>
        </div>
        <p className="text-sm text-brand-text-muted">{notification.message}</p>
      </div>
    </div>
  );
}

export default function NotificationsTab({ notifications = [], loading = false }) {
  if (!loading && notifications.length === 0) {
    return (
      <div className="p-6 bg-brand-content/50 flex-1 animate-in fade-in duration-300">
        <EmptyState icon={Bell} title="لا توجد إشعارات" description="لا توجد إشعارات إدارية حالياً." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 bg-brand-content/50 flex-1 animate-in fade-in duration-300">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
