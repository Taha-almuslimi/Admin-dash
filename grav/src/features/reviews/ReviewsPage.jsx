import React, { useState } from 'react';
import ReviewsFilterBar from './components/ReviewsFilterBar';
import ReviewsTable from './components/ReviewsTable';
import ReviewDrawer from './components/ReviewDrawer';

export default function ReviewsPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const openDrawer = (review) => {
    setSelectedReview(review);
    setShowDrawer(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <ReviewsFilterBar />
      <ReviewsTable openDrawer={openDrawer} />
      <ReviewDrawer 
        showDrawer={showDrawer} 
        setShowDrawer={setShowDrawer} 
        selectedReview={selectedReview} 
      />
    </div>
  );
}

