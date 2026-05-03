import React, { useState } from 'react';
import { usersData } from '../../data/users';
import UsersFilterBar from './components/UsersFilterBar';
import UsersTable from './components/UsersTable';
import UserDrawer from './components/UserDrawer';
import UserActionModal from './components/UserActionModal';

export default function UsersPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState('warn');

  const openDrawer = (user) => {
    setSelectedUser(user);
    setShowDrawer(true);
  };

  const openActionModal = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setShowModal(true);
    setShowDrawer(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <UsersFilterBar />
      <UsersTable data={usersData} onViewUser={openDrawer} onActionUser={openActionModal} />
      <UserDrawer isOpen={showDrawer} user={selectedUser} onClose={() => setShowDrawer(false)} onAction={openActionModal} />
      <UserActionModal isOpen={showModal} user={selectedUser} actionType={actionType} setActionType={setActionType} onClose={() => setShowModal(false)} />
    </div>
  );
}
