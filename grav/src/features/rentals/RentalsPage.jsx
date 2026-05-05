import { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import StatusTabs from './components/StatusTabs';
import FilterBar from '../../components/ui/FilterBar';
import RentalsTable from './components/RentalsTable';
import RentalDrawer from './components/RentalDrawer';
import useDrawer from '../../hooks/useDrawer';
import { router } from '../../inertia/router';
import { isPaginatedSource, rowsFromSource, sourceWithRows } from '../../utils/dataSource';

export default function RentalsPage({
  rentals: rentalsSource = [],
  tabs = [],
  filters = {},
  loading = false,
}) {
  const [activeTab, setActiveTab] = useState(filters.status || 'all');
  const drawer = useDrawer();
  const isServerPaginated = isPaginatedSource(rentalsSource);
  const rentalRows = rowsFromSource(rentalsSource);

  // Filter state
  const [search, setSearch] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [startDate, setStartDate] = useState(filters.start_date || '');
  const [endDate, setEndDate] = useState(filters.end_date || '');

  const filteredRentals = useMemo(() => {
    if (isServerPaginated) return rentalRows;

    return rentalRows.filter((rental) => {
      const q = search?.toLowerCase?.();
      const matchesSearch = !q || rental?.id?.toLowerCase?.()?.includes(q) || rental?.tenant?.includes(q) || rental?.eq?.includes(q);
      const matchesStatus = !statusFilter || rental?.statusKey === statusFilter;
      const matchesTab = activeTab === 'all' || rental?.statusKey === activeTab;
      const matchesStart = !startDate || rental?.startDate >= startDate;
      const matchesEnd = !endDate || rental?.endDate <= endDate;
      return matchesSearch && matchesStatus && matchesTab && matchesStart && matchesEnd;
    });
  }, [search, statusFilter, activeTab, startDate, endDate, rentalRows, isServerPaginated]);

  const tableRentals = sourceWithRows(rentalsSource, filteredRentals);
  const hasSearchFilters = Boolean(search || statusFilter || activeTab !== 'all' || startDate || endDate);

  const updateQuery = (nextFilters) => {
    router.get('/rentals', {
      search,
      status: statusFilter || (activeTab === 'all' ? '' : activeTab),
      start_date: startDate,
      end_date: endDate,
      ...nextFilters,
    }, { replace: true, preserveState: true });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <StatusTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setStatusFilter(tab === 'all' ? '' : tab);
          updateQuery({ status: tab === 'all' ? '' : tab });
        }}
      />
      <FilterBar
        searchPlaceholder="بحث باسم المستخدم أو ID..."
        searchValue={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          updateQuery({ search: e.target.value });
        }}
        filters={[
          { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => { setStatusFilter(e.target.value); setActiveTab(e.target.value || 'all'); updateQuery({ status: e.target.value }); }, options: [{ value: 'pending', label: 'Pending' }, { value: 'confirmed', label: 'Confirmed' }, { value: 'inUse', label: 'In Use' }, { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' }, { value: 'disputed', label: 'Disputed' }] },
        ]}
        extraActions={
          <div className="flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted hover:border-brand-primary transition-colors">
            <Calendar size={16} />
            <input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); updateQuery({ start_date: e.target.value }); }} className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer" title="تاريخ البدء" />
            <span className="text-brand-text-muted">—</span>
            <input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); updateQuery({ end_date: e.target.value }); }} className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer" title="تاريخ الانتهاء" />
          </div>
        }
      />
      <RentalsTable
        rentals={tableRentals}
        loading={loading}
        isSearchActive={hasSearchFilters}
        onOpenDrawer={drawer.open}
      />
      <RentalDrawer isOpen={drawer.isOpen} rental={drawer.selectedItem} onClose={drawer.close} />
    </div>
  );
}
