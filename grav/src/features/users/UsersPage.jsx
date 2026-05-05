import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import FilterBar from '../../components/ui/FilterBar';
import UsersTable from './components/UsersTable';
import UserDrawer from './components/UserDrawer';
import UserActionModal from './components/UserActionModal';
import useDrawer from '../../hooks/useDrawer';
import useModal from '../../hooks/useModal';
import { exportCsv } from '../../utils/exportCsv';
import { router } from '../../inertia/router';
import { isPaginatedSource, rowsFromSource, sourceWithRows } from '../../utils/dataSource';

export default function UsersPage({
  users: usersSource = [],
  filters = {},
  loading = false,
}) {
  const drawer = useDrawer();
  const modal = useModal();
  const [actionType, setActionType] = useState('warn');
  const [users, setUsers] = useState(() => rowsFromSource(usersSource));
  const isServerPaginated = isPaginatedSource(usersSource);
  const userRows = isServerPaginated ? rowsFromSource(usersSource) : users;

  // Filter state
  const [search, setSearch] = useState(filters.search || '');
  const [typeFilter, setTypeFilter] = useState(filters.type || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [govFilter, setGovFilter] = useState(filters.gov || '');

  const filteredUsers = useMemo(() => {
    if (isServerPaginated) return userRows;

    return userRows.filter((user) => {
      const q = search?.toLowerCase?.();
      const matchesSearch = !q || user?.name?.toLowerCase?.()?.includes(q) || user?.phone?.includes(q);
      const matchesType = !typeFilter || user?.typeKey === typeFilter;
      const matchesStatus = !statusFilter || user?.statusKey === statusFilter;
      const matchesGov = !govFilter || user?.govKey === govFilter;
      return matchesSearch && matchesType && matchesStatus && matchesGov;
    });
  }, [search, typeFilter, statusFilter, govFilter, userRows, isServerPaginated]);

  const tableUsers = sourceWithRows(usersSource, filteredUsers);
  const hasSearchFilters = Boolean(search || typeFilter || statusFilter || govFilter);

  const updateQuery = (nextFilters) => {
    router.get('/users', {
      search,
      type: typeFilter,
      status: statusFilter,
      gov: govFilter,
      ...nextFilters,
    }, { replace: true, preserveState: true });
  };

  const openActionModal = (user, type) => {
    modal.open(user);
    setActionType(type);
    drawer.close();
  };

  const confirmUserAction = ({ user, type }) => {
    if (!user) return;

    router.patch(`/users/${user.id}`, { action: type }, { preserveState: true });

    if (!isServerPaginated && (type === 'suspend' || type === 'ban')) {
      setUsers((prevUsers) => prevUsers.map((item) => {
        if (item.id !== user.id) return item;
        return type === 'suspend'
          ? { ...item, status: 'موقوف', statusKey: 'suspended', statusColor: 'warning' }
          : { ...item, status: 'محظور', statusKey: 'banned', statusColor: 'danger' };
      }));
    }

    toast.success(type === 'warn' ? 'تم إرسال التحذير' : 'تم حفظ الإجراء');
    modal.close();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <FilterBar
        searchPlaceholder="بحث باسم أو جوال..."
        searchValue={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          updateQuery({ search: e.target.value });
        }}
        filters={[
          { key: 'type', placeholder: 'النوع: الكل', value: typeFilter, onChange: (e) => { setTypeFilter(e.target.value); updateQuery({ type: e.target.value }); }, options: [{ value: 'tenant', label: 'مستأجر' }, { value: 'owner', label: 'مؤجر' }] },
          { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => { setStatusFilter(e.target.value); updateQuery({ status: e.target.value }); }, options: [{ value: 'active', label: 'نشط' }, { value: 'suspended', label: 'موقوف' }, { value: 'banned', label: 'محظور' }] },
          { key: 'gov', placeholder: 'المحافظة: الكل', value: govFilter, onChange: (e) => { setGovFilter(e.target.value); updateQuery({ gov: e.target.value }); }, options: [{ value: 'sanaa', label: 'صنعاء' }, { value: 'aden', label: 'عدن' }, { value: 'taiz', label: 'تعز' }, { value: 'hadramout', label: 'حضرموت' }] },
        ]}
        onExport={() => exportCsv('users.csv', filteredUsers, [
          { label: 'الاسم', value: 'name' },
          { label: 'الجوال', value: 'phone' },
          { label: 'البريد', value: 'email' },
          { label: 'النوع', value: 'type' },
          { label: 'الحالة', value: 'status' },
          { label: 'المحافظة', value: 'gov' },
        ])}
        exportLabel="تصدير CSV"
      />
      <UsersTable
        users={tableUsers}
        loading={loading}
        isSearchActive={hasSearchFilters}
        onOpenDrawer={drawer.open}
        onOpenActionModal={openActionModal}
      />
      <UserDrawer isOpen={drawer.isOpen} user={drawer.selectedItem} onClose={drawer.close} onOpenActionModal={openActionModal} />
      <UserActionModal
        isOpen={modal.isOpen}
        user={modal.selectedItem}
        actionType={actionType}
        setActionType={setActionType}
        onClose={modal.close}
        onConfirm={confirmUserAction}
      />
    </div>
  );
}
