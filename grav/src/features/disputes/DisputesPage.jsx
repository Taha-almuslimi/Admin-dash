import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryCards from './components/SummaryCards';
import FilterBar from '../../components/ui/FilterBar';
import DisputesTable from './components/DisputesTable';
import DisputeReviewPage from './components/DisputeReviewPage';
import { disputesData } from '../../data/disputes';

export default function DisputesPage() {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [decision, setDecision] = useState('accept');
  const [adjustedAmount, setAdjustedAmount] = useState('50000');
  const location = useLocation();

  // Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredDisputes = useMemo(() => {
    return disputesData.filter((d) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || d.id.toLowerCase().includes(q) || d.tenant.includes(q) || d.owner.includes(q);
      const matchesStatus = !statusFilter || d.statusKey === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  useEffect(() => {
    if (location.state?.openReviewIndex !== undefined && disputesData[location.state.openReviewIndex]) {
      setSelectedDispute(disputesData[location.state.openReviewIndex]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const openReview = (dispute) => {
    setSelectedDispute(dispute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeReview = () => {
    setSelectedDispute(null);
  };

  if (selectedDispute) {
    return (
      <DisputeReviewPage
        dispute={selectedDispute}
        decision={decision}
        setDecision={setDecision}
        adjustedAmount={adjustedAmount}
        setAdjustedAmount={setAdjustedAmount}
        onCloseReview={closeReview}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />
      <FilterBar
        searchPlaceholder="بحث في النزاعات..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        filters={[
          { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), options: [{ value: 'open', label: 'مفتوحة' }, { value: 'review', label: 'قيد المراجعة' }, { value: 'resolved', label: 'محلولة' }] },
        ]}
      />
      <DisputesTable disputes={filteredDisputes} onOpenReview={openReview} />
    </div>
  );
}
