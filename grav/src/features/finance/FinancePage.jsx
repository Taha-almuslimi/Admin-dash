import { useState } from 'react';
import SummaryCards from './components/SummaryCards';
import PaymentsTab from './components/PaymentsTab';
import EscrowTab from './components/EscrowTab';
import ProfitsTab from './components/ProfitsTab';
import RefundsTab from './components/RefundsTab';
import Tabs from '../../components/ui/Tabs';
import { financeTabs, paymentsData, escrowData, profitsData, refundsData } from '../../data/finance';

export default function FinancePage({ loading = false }) {
  const [activeTab, setActiveTab] = useState('payments');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />

      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <Tabs tabs={financeTabs} activeTab={activeTab} onChange={setActiveTab} />
        
        {activeTab === 'payments' && <PaymentsTab rows={paymentsData} loading={loading} />}
        {activeTab === 'escrow' && <EscrowTab rows={escrowData} loading={loading} />}
        {activeTab === 'profits' && <ProfitsTab rows={profitsData} loading={loading} />}
        {activeTab === 'refunds' && <RefundsTab rows={refundsData} loading={loading} />}
      </div>
    </div>
  );
}
