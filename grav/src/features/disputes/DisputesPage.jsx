import React, { useState } from 'react';
import { disputesData } from '../../data/disputes';
import SummaryCards from './components/SummaryCards';
import DisputesFilterBar from './components/DisputesFilterBar';
import DisputesTable from './components/DisputesTable';
import DisputeReviewPanel from './components/DisputeReviewPanel';

export default function DisputesPage() {
  const [selectedDispute, setSelectedDispute] = useState(null);

  const openReview = (dispute) => {
    setSelectedDispute(dispute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeReview = () => {
    setSelectedDispute(null);
  };

  if (selectedDispute) {
    return <DisputeReviewPanel selectedDispute={selectedDispute} closeReview={closeReview} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />
      <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="p-4 border-b border-brand-border bg-brand-content/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-brand-text-primary">قائمة النزاعات</h3>
          <DisputesFilterBar />
        </div>
        <DisputesTable disputesData={disputesData} openReview={openReview} />
      </div>
    </div>
  );
}

