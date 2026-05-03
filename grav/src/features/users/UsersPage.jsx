import { useState } from 'react';
import UsersFilterBar from './components/UsersFilterBar';
import UsersTable from './components/UsersTable';
import UserDrawer from './components/UserDrawer';
import UserActionModal from './components/UserActionModal';
import useDrawer from '../../hooks/useDrawer';
import useModal from '../../hooks/useModal';
import { usersData } from '../../data/users';

export default function UsersPage() {
  const drawer = useDrawer();
  const modal = useModal();
  const [actionType, setActionType] = useState('warn');

  const openActionModal = (user, type) => {
    modal.open(user);
    setActionType(type);
    drawer.close();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <UsersFilterBar />
      <UsersTable users={usersData} onOpenDrawer={drawer.open} onOpenActionModal={openActionModal} />
      <UserDrawer isOpen={drawer.isOpen} user={drawer.selectedItem} onClose={drawer.close} onOpenActionModal={openActionModal} />
      <UserActionModal isOpen={modal.isOpen} user={modal.selectedItem} actionType={actionType} setActionType={setActionType} onClose={modal.close} />
    </div>
  );
}
