import { useState, useMemo } from 'react';
import SummaryCards from './components/SummaryCards';
import FilterBar from '../../components/ui/FilterBar';
import DisputesTable from './components/DisputesTable';
import DisputeReviewPage from './components/DisputeReviewPage';
import { router } from '../../inertia/router';
import { isPaginatedSource, rowsFromSource, sourceWithRows } from '../../utils/dataSource';

export default function DisputesPage({
  disputes: disputesSource = [],
  filters = {},
  routeState = {},
  loading = false,
}) {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [decision, setDecision] = useState('accept');
  const [adjustedAmount, setAdjustedAmount] = useState('50000');
  const isServerPaginated = isPaginatedSource(disputesSource);
  const disputeRows = rowsFromSource(disputesSource);

  // Filter state
  const [search, setSearch] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');

  const filteredDisputes = useMemo(() => {
    if (isServerPaginated) return disputeRows;

    return disputeRows.filter((d) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || d?.id?.toLowerCase?.().includes(q) || d?.tenant?.includes(q) || d?.owner?.includes(q);
      const matchesStatus = !statusFilter || d?.statusKey === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, disputeRows, isServerPaginated]);

  const tableDisputes = sourceWithRows(disputesSource, filteredDisputes);
  const hasSearchFilters = Boolean(search || statusFilter);

  const routeSelectedDispute = useMemo(() => {
    if (routeState?.disputeId) {
      return disputeRows.find((dispute) => dispute.id === routeState.disputeId);
    }
    if (routeState?.openReviewIndex !== undefined) {
      return disputeRows[routeState.openReviewIndex];
    }
    return null;
  }, [routeState, disputeRows]);

  const activeDispute = selectedDispute || routeSelectedDispute;

  const updateQuery = (nextFilters) => {
    router.get('/disputes', {
      search,
      status: statusFilter,
      ...nextFilters,
    }, { replace: true, preserveState: true });
  };

  const openReview = (dispute) => {
    setSelectedDispute(dispute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeReview = () => {
    setSelectedDispute(null);
    if (routeSelectedDispute) {
      router.visit('/disputes', { replace: true });
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
        onSearchChange={(e) => {
          setSearch(e.target.value);
          updateQuery({ search: e.target.value });
        }}
        filters={[
          { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => { setStatusFilter(e.target.value); updateQuery({ status: e.target.value }); }, options: [{ value: 'open', label: 'مفتوحة' }, { value: 'review', label: 'قيد المراجعة' }, { value: 'resolved', label: 'محلولة' }] },
        ]}
      />
      <DisputesTable
        disputes={tableDisputes}
        loading={loading}
        isSearchActive={hasSearchFilters}
        onOpenReview={openReview}
      />
    </div>
  );
}
