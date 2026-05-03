import React, { useState } from 'react';
import { financeTabs as tabs } from '../../data/finance';
import SummaryCards from './components/SummaryCards';
import PaymentsTab from './components/PaymentsTab';
import EscrowTab from './components/EscrowTab';
import ProfitsTab from './components/ProfitsTab';
import RefundsTab from './components/RefundsTab';

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('payments');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />

      {/* Main Content Area */}
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        
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
        
        {activeTab === 'payments' && <PaymentsTab />}
        {activeTab === 'escrow' && <EscrowTab />}
        {activeTab === 'profits' && <ProfitsTab />}
        {activeTab === 'refunds' && <RefundsTab />}

      </div>
    </div>
  );
}

