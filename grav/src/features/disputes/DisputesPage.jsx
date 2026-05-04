import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  const routeSelectedDispute = useMemo(() => {
    if (location.state?.disputeId) {
      return disputesData.find((dispute) => dispute.id === location.state.disputeId);
    }
    if (location.state?.openReviewIndex !== undefined) {
      return disputesData[location.state.openReviewIndex];
    }
    return null;
  }, [location.state]);

  const activeDispute = selectedDispute || routeSelectedDispute;

  const openReview = (dispute) => {
    setSelectedDispute(dispute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeReview = () => {
    setSelectedDispute(null);
    if (routeSelectedDispute) {
      navigate('/disputes', { replace: true });
    }
  };

  if (activeDispute) {
    return (
      <DisputeReviewPage
        dispute={activeDispute}
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
