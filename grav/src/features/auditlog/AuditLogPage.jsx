import React from 'react';
import AuditLogWarning from './components/AuditLogWarning';
import AuditLogFilterBar from './components/AuditLogFilterBar';
import AuditLogTable from './components/AuditLogTable';

export default function AuditLogPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <AuditLogWarning />
      <AuditLogFilterBar />
      <AuditLogTable />
    </div>
  );
}

