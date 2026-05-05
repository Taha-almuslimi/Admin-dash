import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import SummaryCards from './components/SummaryCards';
import ComplaintsTable from './components/ComplaintsTable';
import NotificationsTab from './components/NotificationsTab';
import ComplaintModal from './components/ComplaintModal';
import FilterBar from '../../components/ui/FilterBar';
import useModal from '../../hooks/useModal';
import Tabs from '../../components/ui/Tabs';
import { router } from '../../inertia/router';
import { isPaginatedSource, rowsFromSource, sourceWithRows } from '../../utils/dataSource';

export default function ComplaintsPage({
  complaints: complaintsSource = [],
  tabs = [],
  notifications = [],
  filters = {},
  routeState = {},
  loading = false,
}) {
  const [activeTab, setActiveTab] = useState(filters.tab || 'complaints');
  const [actionType, setActionType] = useState('warn');
  const [complaints, setComplaints] = useState(() => rowsFromSource(complaintsSource));
  const modal = useModal();
  const isServerPaginated = isPaginatedSource(complaintsSource);
  const complaintRows = isServerPaginated ? rowsFromSource(complaintsSource) : complaints;

  // Filter state
  const [search, setSearch] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [typeFilter, setTypeFilter] = useState(filters.type || '');

  const filteredComplaints = useMemo(() => {
    if (isServerPaginated) return complaintRows;

    return complaintRows.filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || c?.id?.toLowerCase?.().includes(q) || c?.reporter?.includes(q) || c?.target?.includes(q);
      const matchesStatus = !statusFilter || c.statusKey === statusFilter;
      const matchesType = !typeFilter || c.typeKey === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter, complaintRows, isServerPaginated]);

  const tableComplaints = sourceWithRows(complaintsSource, filteredComplaints);
  const hasSearchFilters = Boolean(search || statusFilter || typeFilter);

  const routeComplaint = routeState?.openActionModal
    ? complaintRows.find((item) => item.id === routeState.complaintId) || complaintRows[0]
    : null;
  const currentActiveTab = routeState?.activeTab || activeTab;
  const selectedComplaint = modal.selectedItem || routeComplaint;
  const isComplaintModalOpen = modal.isOpen || !!routeComplaint;

  const updateQuery = (nextFilters) => {
    router.get('/complaints', {
      tab: activeTab,
      search,
      type: typeFilter,
      status: statusFilter,
      ...nextFilters,
    }, { replace: true, preserveState: true });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    updateQuery({ tab });
  };

  const closeComplaintModal = () => {
    modal.close();
    if (routeComplaint) {
      router.visit('/complaints', { replace: true });
    }
  };

  const confirmComplaintAction = ({ complaint, type }) => {
    if (!complaint) return;

    router.patch(`/complaints/${complaint.id}`, { action: type }, { preserveState: true });

    if (!isServerPaginated) {
      setComplaints((prevComplaints) => prevComplaints.map((item) => {
        if (item.id !== complaint.id) return item;
        if (type === 'reject') {
          return { ...item, status: 'مرفوض', statusKey: 'rejected', statusColor: 'danger' };
        }
        return { ...item, status: 'معالج', statusKey: 'resolved', statusColor: 'success' };
      }));
    }

    toast.success(type === 'authorities' ? 'تم تسجيل الإبلاغ للجهات المختصة' : 'تم حفظ إجراء البلاغ');
    closeComplaintModal();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />

      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden flex flex-col min-h-[500px]">
          <Tabs tabs={tabs} activeTab={currentActiveTab} onChange={handleTabChange} />

        {currentActiveTab === 'complaints' ? (
          <>
            <div className="p-4 border-b border-brand-border bg-white">
              <FilterBar
                searchPlaceholder="بحث في البلاغات..."
                searchValue={search}
                onSearchChange={(e) => {
                  setSearch(e.target.value);
                  updateQuery({ search: e.target.value });
                }}
                filters={[
                  { key: 'type', placeholder: 'نوع البلاغ: الكل', value: typeFilter, onChange: (e) => { setTypeFilter(e.target.value); updateQuery({ type: e.target.value }); }, options: [{ value: 'behavior', label: 'سلوك مسيء' }, { value: 'content', label: 'محتوى مخالف' }, { value: 'fraud', label: 'احتيال' }] },
                  { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => { setStatusFilter(e.target.value); updateQuery({ status: e.target.value }); }, options: [{ value: 'new', label: 'جديد' }, { value: 'review', label: 'قيد المراجعة' }, { value: 'resolved', label: 'معالج' }, { value: 'rejected', label: 'مرفوض' }] },
                ]}
              />
            </div>
            <ComplaintsTable
              complaints={tableComplaints}
              loading={loading}
              isSearchActive={hasSearchFilters}
              onOpenModal={modal.open}
            />
          </>
        ) : (
          <NotificationsTab notifications={notifications} loading={loading} />
        )}
      </div>

      <ComplaintModal
        isOpen={isComplaintModalOpen}
        complaint={selectedComplaint}
        actionType={actionType}
        setActionType={setActionType}
        onClose={closeComplaintModal}
        onConfirm={confirmComplaintAction}
      />
    </div>
  );
}
