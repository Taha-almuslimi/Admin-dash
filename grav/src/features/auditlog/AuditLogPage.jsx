import { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import WarningBanner from './components/WarningBanner';
import FilterBar from '../../components/ui/FilterBar';
import AuditTable from './components/AuditTable';
import { exportCsv } from '../../utils/exportCsv';
import { router } from '../../inertia/router';
import { isPaginatedSource, rowsFromSource, sourceWithRows } from '../../utils/dataSource';

export default function AuditLogPage({
  audit: auditSource = [],
  filters = {},
}) {
  const isServerPaginated = isPaginatedSource(auditSource);
  const auditRows = rowsFromSource(auditSource);

  // Filter state
  const [search, setSearch] = useState(filters.search || '');
  const [adminFilter, setAdminFilter] = useState(filters.admin || '');
  const [eventFilter, setEventFilter] = useState(filters.event || '');
  const [startDate, setStartDate] = useState(filters.start_date || '');
  const [endDate, setEndDate] = useState(filters.end_date || '');

  const filteredAudit = useMemo(() => {
    if (isServerPaginated) return auditRows;

    return auditRows.filter((log) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || log?.event?.includes(q) || log?.details?.includes(q) || log?.admin?.includes(q);
      const matchesAdmin = !adminFilter || log.adminKey === adminFilter;
      const matchesEvent = !eventFilter || log.eventKey === eventFilter;
      return matchesSearch && matchesAdmin && matchesEvent;
    });
  }, [search, adminFilter, eventFilter, auditRows, isServerPaginated]);

  const tableAudit = sourceWithRows(auditSource, filteredAudit);

  const updateQuery = (nextFilters) => {
    router.get('/audit', {
      search,
      admin: adminFilter,
      event: eventFilter,
      start_date: startDate,
      end_date: endDate,
      ...nextFilters,
    }, { replace: true, preserveState: true });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <WarningBanner />
      <FilterBar
        searchPlaceholder="بحث بالحدث أو التفاصيل..."
        searchValue={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          updateQuery({ search: e.target.value });
        }}
        filters={[
          { key: 'admin', placeholder: 'المسؤول: الكل', value: adminFilter, onChange: (e) => { setAdminFilter(e.target.value); updateQuery({ admin: e.target.value }); }, options: [{ value: 'ahmed', label: 'أحمد علي' }, { value: 'sara', label: 'سارة محمد' }, { value: 'khaled', label: 'خالد عمر' }] },
          { key: 'event', placeholder: 'نوع الحدث: الكل', value: eventFilter, onChange: (e) => { setEventFilter(e.target.value); updateQuery({ event: e.target.value }); }, options: [{ value: 'ban', label: 'حظر/تعليق مستخدم' }, { value: 'delete', label: 'حذف محتوى' }, { value: 'dispute', label: 'قرار نزاع' }, { value: 'edit', label: 'تعديل بيانات' }, { value: 'finance', label: 'إجراء مالي' }] },
        ]}
        extraActions={
          <div className="flex items-center space-x-2 space-x-reverse border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm text-brand-text-muted hover:border-brand-primary transition-colors">
            <Calendar size={16} />
            <input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); updateQuery({ start_date: e.target.value }); }} className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer" title="من" />
            <span className="text-brand-text-muted">—</span>
            <input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); updateQuery({ end_date: e.target.value }); }} className="bg-transparent focus:outline-none text-brand-text-primary cursor-pointer" title="إلى" />
          </div>
        }
        onExport={() => exportCsv('audit-log.csv', filteredAudit, [
          { label: 'الوقت', value: 'time' },
          { label: 'المسؤول', value: 'admin' },
          { label: 'الدور', value: 'role' },
          { label: 'الحدث', value: 'event' },
          { label: 'التفاصيل', value: 'details' },
          { label: 'IP', value: 'ip' },
        ])}
        exportLabel="تصدير السجل"
      />
      <AuditTable auditData={tableAudit} />
    </div>
  );
}
