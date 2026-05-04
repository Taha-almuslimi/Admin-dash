import { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import StatusTabs from './components/StatusTabs';
import FilterBar from '../../components/ui/FilterBar';
import RentalsTable from './components/RentalsTable';
import RentalDrawer from './components/RentalDrawer';
import useDrawer from '../../hooks/useDrawer';
import { rentalsTabs, rentalsData } from '../../data/rentals';

export default function RentalsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const drawer = useDrawer();

  // Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredRentals = useMemo(() => {
    return rentalsData.filter((rental) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || rental.id.toLowerCase().includes(q) || rental.tenant.includes(q) || rental.eq.includes(q);
      const matchesStatus = !statusFilter || rental.statusKey === statusFilter;
      const matchesTab = activeTab === 'all' || rental.statusKey === activeTab;
      const matchesStart = !startDate || rental.startDate >= startDate;
      const matchesEnd = !endDate || rental.endDate <= endDate;
      return matchesSearch && matchesStatus && matchesTab && matchesStart && matchesEnd;
    });
  }, [search, statusFilter, activeTab, startDate, endDate]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <StatusTabs tabs={rentalsTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <FilterBar
        searchPlaceholder="بحث باسم المستخدم أو ID..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        filters={[
          { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), options: [{ value: 'pending', label: 'Pending' }, { value: 'confirmed', label: 'Confirmed' }, { value: 'inUse', label: 'In Use' }, { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' }, { value: 'disputed', label: 'Disputed' }] },
        ]}
        extraActions={
          <div className="flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted hover:border-brand-primary transition-colors">
            <Calendar size={16} />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer" title="تاريخ البدء" />
            <span className="text-brand-text-muted">—</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer" title="تاريخ الانتهاء" />
          </div>
        }
      />
      <RentalsTable rentals={filteredRentals} onOpenDrawer={drawer.open} />
      <RentalDrawer isOpen={drawer.isOpen} rental={drawer.selectedItem} onClose={drawer.close} />
    </div>
  );
}
