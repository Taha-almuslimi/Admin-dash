import React, { useState } from 'react';
import AnalyticsHeader from './components/AnalyticsHeader';
import ChartsRow1 from './components/ChartsRow1';
import ChartsRow2 from './components/ChartsRow2';
import KpisTable from './components/KpisTable';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('هذا الأسبوع');
  const [showExportOptions, setShowExportOptions] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <AnalyticsHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        showExportOptions={showExportOptions}
        setShowExportOptions={setShowExportOptions}
      />
      <ChartsRow1 />
      <ChartsRow2 />
      <KpisTable />
    </div>
  );
}
