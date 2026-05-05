import { useState } from 'react';
import SummaryCards from './components/SummaryCards';
import PaymentsTab from './components/PaymentsTab';
import EscrowTab from './components/EscrowTab';
import ProfitsTab from './components/ProfitsTab';
import RefundsTab from './components/RefundsTab';
import Tabs from '../../components/ui/Tabs';
import { router } from '../../inertia/router';

export default function FinancePage({
  tabs = [],
  payments = [],
  escrow = [],
  profits = [],
  refunds = [],
  filters = {},
  loading = false,
}) {
  const [activeTab, setActiveTab] = useState(filters.tab || 'payments');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.get('/finance', { tab }, { replace: true, preserveState: true });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />

      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
        
        {activeTab === 'payments' && <PaymentsTab rows={payments} loading={loading} />}
        {activeTab === 'escrow' && <EscrowTab rows={escrow} loading={loading} />}
        {activeTab === 'profits' && <ProfitsTab rows={profits} loading={loading} />}
        {activeTab === 'refunds' && <RefundsTab rows={refunds} loading={loading} />}
      </div>
    </div>
  );
}
