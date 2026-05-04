import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Home, Users, Truck, ShoppingCart, AlertTriangle,
  DollarSign, Flag, BarChart2, Star, Clock, Settings
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Header from './Header';
import { adminPageContracts } from '../../contracts/adminContracts';

const navItems = [
  { ...adminPageContracts.overview, label: 'الرئيسية', icon: Home },
  { ...adminPageContracts.users, label: 'المستخدمون', icon: Users },
  { ...adminPageContracts.equipment, label: 'المعدات', icon: Truck },
  { ...adminPageContracts.rentals, label: 'عمليات التأجير', icon: ShoppingCart },
  { ...adminPageContracts.disputes, label: 'النزاعات', icon: AlertTriangle },
  { ...adminPageContracts.finance, label: 'الإشراف المالي', icon: DollarSign },
  { ...adminPageContracts.complaints, label: 'البلاغات', icon: Flag },
  { ...adminPageContracts.analytics, label: 'التقارير', icon: BarChart2 },
  { ...adminPageContracts.reviews, label: 'التقييمات', icon: Star },
  { ...adminPageContracts.audit, label: 'سجل العمليات', icon: Clock },
  { ...adminPageContracts.settings, label: 'الإعدادات', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentTitle = navItems.find(item => item.path === location.pathname)?.label || 'الرئيسية';

  return (
    <div className="flex h-screen overflow-hidden bg-brand-content font-cairo text-brand-text-primary" dir="rtl">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'Cairo, sans-serif',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          },
          success: {
            style: { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' },
            iconTheme: { primary: '#16a34a', secondary: '#f0fdf4' },
          },
          error: {
            style: { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' },
            iconTheme: { primary: '#dc2626', secondary: '#fef2f2' },
          },
        }}
      />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={navItems}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header
          currentTitle={currentTitle}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
