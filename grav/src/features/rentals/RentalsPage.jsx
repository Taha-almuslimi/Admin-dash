import React, { useState } from 'react';
import StatusTabs from './components/StatusTabs';
import RentalsFilterBar from './components/RentalsFilterBar';
import RentalsTable from './components/RentalsTable';
import RentalDrawer from './components/RentalDrawer';

export default function RentalsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const openDrawer = (rental) => {
    setSelectedRental(rental);
    setShowDrawer(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <RentalsFilterBar />
      <RentalsTable openDrawer={openDrawer} />
      <RentalDrawer 
        showDrawer={showDrawer} 
        setShowDrawer={setShowDrawer} 
        selectedRental={selectedRental} 
      />
    </div>
  );
}

