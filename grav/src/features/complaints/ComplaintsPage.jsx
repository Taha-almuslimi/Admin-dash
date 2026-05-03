import React, { useState } from 'react';
import { complaintsTabs as tabs } from '../../data/complaints';
import SummaryCards from './components/SummaryCards';
import ComplaintsTable from './components/ComplaintsTable';
import NotificationsTab from './components/NotificationsTab';
import ComplaintModal from './components/ComplaintModal';

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState('complaints');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('warn');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />

      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden flex flex-col min-h-[500px]">
        {/* Tabs Header */}
        <div className="border-b border-brand-border bg-brand-content/30 flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors relative ${
                activeTab === tab.id 
                  ? 'text-brand-primary' 
                  : 'text-brand-text-muted hover:text-brand-text-primary hover:bg-brand-content'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'complaints' ? (
          <ComplaintsTable setShowModal={setShowModal} />
        ) : (
          <NotificationsTab />
        )}
      </div>

      <ComplaintModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        actionType={actionType} 
        setActionType={setActionType} 
      />
    </div>
  );
}

