import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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
  const [complaints, setComplaints] = useState(complaintsData);
  const modal = useModal();
  const location = useLocation();
  const navigate = useNavigate();

  // Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || c.id.toLowerCase().includes(q) || c.reporter.includes(q) || c.target.includes(q);
      const matchesStatus = !statusFilter || c.statusKey === statusFilter;
      const matchesType = !typeFilter || c.typeKey === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter, complaints]);

  const routeComplaint = location.state?.openActionModal
    ? complaints.find((item) => item.id === location.state.complaintId) || complaints[0]
    : null;
  const currentActiveTab = location.state?.activeTab || activeTab;
  const selectedComplaint = modal.selectedItem || routeComplaint;
  const isComplaintModalOpen = modal.isOpen || !!routeComplaint;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (location.state) {
      navigate('/complaints', { replace: true });
    }
  };

  const closeComplaintModal = () => {
    modal.close();
    if (routeComplaint) {
      navigate('/complaints', { replace: true });
    }
  };

  const confirmComplaintAction = ({ complaint, type }) => {
    if (!complaint) return;
    setComplaints((prevComplaints) => prevComplaints.map((item) => {
      if (item.id !== complaint.id) return item;
      if (type === 'reject') {
        return { ...item, status: 'مرفوض', statusKey: 'rejected', statusColor: 'danger' };
      }
      return { ...item, status: 'معالج', statusKey: 'resolved', statusColor: 'success' };
    }));
    toast.success(type === 'authorities' ? 'تم تسجيل الإبلاغ للجهات المختصة' : 'تم حفظ إجراء البلاغ');
    closeComplaintModal();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />

      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden flex flex-col min-h-[500px]">
          <Tabs tabs={complaintsTabs} activeTab={currentActiveTab} onChange={handleTabChange} />

        {currentActiveTab === 'complaints' ? (
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
            <ComplaintsTable complaints={filteredComplaints} onOpenModal={modal.open} />
          </>
        ) : (
          <NotificationsTab />
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
