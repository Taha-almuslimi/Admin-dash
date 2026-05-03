import React, { useState } from 'react';
import { equipmentData } from '../../data/equipment';
import EquipmentFilterBar from './components/EquipmentFilterBar';
import EquipmentGrid from './components/EquipmentGrid';
import EquipmentList from './components/EquipmentList';
import EquipmentDrawer from './components/EquipmentDrawer';

export default function EquipmentPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedEq, setSelectedEq] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const openDrawer = (eq) => {
    setSelectedEq(eq);
    setShowDrawer(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative min-w-0">
      <EquipmentFilterBar viewMode={viewMode} setViewMode={setViewMode} />

      {viewMode === 'grid' ? (
        <EquipmentGrid data={equipmentData} onOpenDrawer={openDrawer} />
      ) : (
        <EquipmentList data={equipmentData} onOpenDrawer={openDrawer} />
      )}

      <EquipmentDrawer isOpen={showDrawer} equipment={selectedEq} onClose={() => setShowDrawer(false)} />
    </div>
  );
}
