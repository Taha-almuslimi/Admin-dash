import React, { useState } from 'react';
import { Shield, Users } from 'lucide-react';
import RolesTab from './components/RolesTab';
import SecurityTab from './components/SecurityTab';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('roles');
  const [mfaEnabled, setMfaEnabled] = useState(true);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Tabs Header */}
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="flex border-b border-brand-border bg-brand-content/30 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center space-x-2 space-x-reverse px-8 py-4 font-bold text-sm transition-colors relative ${activeTab === 'roles' ? 'text-brand-primary' : 'text-brand-text-muted hover:text-brand-text-primary hover:bg-brand-content'}`}
          >
            <Users size={18} />
            <span>إدارة الأدوار والصلاحيات</span>
            {activeTab === 'roles' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full"></div>}
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-2 space-x-reverse px-8 py-4 font-bold text-sm transition-colors relative ${activeTab === 'security' ? 'text-brand-primary' : 'text-brand-text-muted hover:text-brand-text-primary hover:bg-brand-content'}`}
          >
            <Shield size={18} />
            <span>الأمان والمصادقة</span>
            {activeTab === 'security' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full"></div>}
          </button>
        </div>
      </div>

      {activeTab === 'roles' && <RolesTab />}
      {activeTab === 'security' && <SecurityTab mfaEnabled={mfaEnabled} setMfaEnabled={setMfaEnabled} />}

    </div>
  );
}

