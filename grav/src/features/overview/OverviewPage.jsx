import { useState } from 'react';
import KpiRow1 from './components/KpiRow1';
import KpiRow2 from './components/KpiRow2';
import LineChart from './components/LineChart';
import DonutChart from './components/DonutChart';
import DisputesTable from './components/DisputesTable';
import ComplaintsTable from './components/ComplaintsTable';

export default function OverviewPage({
  stats = {},
  rates = {},
  lineData = [],
  pieData = [],
  disputes = [],
  complaints = [],
  loading = false,
}) {
  const [chartFilter, setChartFilter] = useState('شهر');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <KpiRow1 stats={stats} loading={loading} />
      <KpiRow2 lineData={lineData} rates={rates} loading={loading} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <LineChart chartFilter={chartFilter} setChartFilter={setChartFilter} lineData={lineData} />
        <DonutChart pieData={pieData} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DisputesTable disputes={disputes} loading={loading} />
        <ComplaintsTable complaints={complaints} loading={loading} />
      </div>
    </div>
  );
}
