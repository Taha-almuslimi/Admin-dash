import { useState } from 'react';
import SummaryCards from './components/SummaryCards';
import DisputesTable from './components/DisputesTable';
import DisputeReviewPage from './components/DisputeReviewPage';
import { disputesData } from '../../data/disputes';

export default function DisputesPage() {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [decision, setDecision] = useState('accept');
  const [adjustedAmount, setAdjustedAmount] = useState('50000');

  const openReview = (dispute) => {
    setSelectedDispute(dispute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeReview = () => {
    setSelectedDispute(null);
  };

  if (selectedDispute) {
    return (
      <DisputeReviewPage
        dispute={selectedDispute}
        decision={decision}
        setDecision={setDecision}
        adjustedAmount={adjustedAmount}
        setAdjustedAmount={setAdjustedAmount}
        onCloseReview={closeReview}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SummaryCards />
      <DisputesTable disputes={disputesData} onOpenReview={openReview} />
    </div>
  );
}
