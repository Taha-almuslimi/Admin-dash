import React from 'react';
import { AlertTriangle, ShieldAlert, Flag, CheckCircle2 } from 'lucide-react';
import { notificationsData } from '../../../data/complaints';

export default function NotificationsTab() {
  const getIcon = (type) => {
    switch (type) {
      case 'danger': return <AlertTriangle size={20} />;
      case 'warning': return <ShieldAlert size={20} />;
      case 'info': return <Flag size={20} />;
      case 'success': return <CheckCircle2 size={20} />;
      default: return <Flag size={20} />;
    }
  };

  return (
    <div className="p-6 space-y-4 bg-brand-content/50 flex-1 animate-in fade-in duration-300">
      {notificationsData.map(notif => (
        <div key={notif.id} className="flex items-start space-x-4 space-x-reverse bg-white p-4 rounded-xl border border-brand-border shadow-sm">
          <div className={`w-10 h-10 rounded-full bg-brand-${notif.type}/10 text-brand-${notif.type} flex items-center justify-center shrink-0`}>
            {getIcon(notif.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className={`font-bold text-brand-${notif.type} text-sm`}>{notif.title}</h4>
              <span className="text-xs text-brand-text-muted">{notif.time}</span>
            </div>
            <p className="text-sm text-brand-text-muted">{notif.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
