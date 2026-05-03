import WarningBanner from './components/WarningBanner';
import AuditFilterBar from './components/AuditFilterBar';
import AuditTable from './components/AuditTable';
import { auditData } from '../../data/auditlog';

export default function AuditLogPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <WarningBanner />
      <AuditFilterBar />
      <AuditTable auditData={auditData} />
    </div>
  );
}
