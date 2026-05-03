import React, { useState } from 'react';
import KpiRow1 from './components/KpiRow1';
import KpiRow2 from './components/KpiRow2';
import OverviewLineChart from './components/LineChart';
import DonutChart from './components/DonutChart';
import DisputesTable from './components/DisputesTable';
import ComplaintsTable from './components/ComplaintsTable';

export default function OverviewPage() {
  const [chartFilter, setChartFilter] = useState('شهر');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* KPI Row 1: 4 Cards */}
      <KpiRow1 />

      {/* KPI Row 2: 3 Cards */}
      <KpiRow2 />

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <OverviewLineChart chartFilter={chartFilter} setChartFilter={setChartFilter} />
        <DonutChart />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DisputesTable />
        <ComplaintsTable />
      </div>

    </div>
  );
}
