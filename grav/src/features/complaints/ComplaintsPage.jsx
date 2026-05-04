import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryCards from './components/SummaryCards';
import ComplaintsTable from './components/ComplaintsTable';
import NotificationsTab from './components/NotificationsTab';
import ComplaintModal from './components/ComplaintModal';
import FilterBar from '../../components/ui/FilterBar';
import useModal from '../../hooks/useModal';
import Tabs from '../../components/ui/Tabs';
import { complaintsTabs, complaintsData } from '../../data/complaints';

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState('complaints');
  const [actionType, setActionType] = useState('warn');
  const modal = useModal();
  const location = useLocation();

  // Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredComplaints = useMemo(() => {
    return complaintsData.filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || c.id.toLowerCase().includes(q) || c.reporter.includes(q) || c.target.includes(q);
      const matchesStatus = !statusFilter || c.statusKey === statusFilter;
      const matchesType = !typeFilter || c.typeKey === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter]);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
    if (location.state?.openActionModal) {
      modal.open();
    }
    if (location.state) {
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />

      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden flex flex-col min-h-[500px]">
        <Tabs tabs={complaintsTabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'complaints' ? (
          <>
            <div className="p-4 border-b border-brand-border bg-white">
              <FilterBar
                searchPlaceholder="بحث في البلاغات..."
                searchValue={search}
                onSearchChange={(e) => setSearch(e.target.value)}
                filters={[
                  { key: 'type', placeholder: 'نوع البلاغ: الكل', value: typeFilter, onChange: (e) => setTypeFilter(e.target.value), options: [{ value: 'behavior', label: 'سلوك مسيء' }, { value: 'content', label: 'محتوى مخالف' }, { value: 'fraud', label: 'احتيال' }] },
                  { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), options: [{ value: 'new', label: 'جديد' }, { value: 'review', label: 'قيد المراجعة' }, { value: 'resolved', label: 'معالج' }, { value: 'rejected', label: 'مرفوض' }] },
                ]}
              />
            </div>
            <ComplaintsTable complaints={filteredComplaints} onOpenModal={() => modal.open()} />
          </>
        ) : (
          <NotificationsTab />
        )}
      </div>

      <ComplaintModal
        isOpen={modal.isOpen}
        actionType={actionType}
        setActionType={setActionType}
        onClose={modal.close}
      />
    </div>
  );
}
