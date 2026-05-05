import { useState } from 'react';
import {
  Home, Users, Truck, ShoppingCart, AlertTriangle,
  DollarSign, Flag, BarChart2, Star, Clock, Settings
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Header from './Header';
import { adminPageContracts } from '../../contracts/adminContracts';

const navConfig = [
  { key: 'overview', label: 'الرئيسية', icon: Home },
  { key: 'users', label: 'المستخدمون', icon: Users },
  { key: 'equipment', label: 'المعدات', icon: Truck },
  { key: 'rentals', label: 'عمليات التأجير', icon: ShoppingCart },
  { key: 'disputes', label: 'النزاعات', icon: AlertTriangle },
  { key: 'finance', label: 'الإشراف المالي', icon: DollarSign },
  { key: 'complaints', label: 'البلاغات', icon: Flag },
  { key: 'analytics', label: 'التقارير', icon: BarChart2 },
  { key: 'reviews', label: 'التقييمات', icon: Star },
  { key: 'audit', label: 'سجل العمليات', icon: Clock },
  { key: 'settings', label: 'الإعدادات', icon: Settings },
];

const navItems = navConfig.map((item) => ({
  ...item,
  path: adminPageContracts[item.key].path,
  inertiaPage: adminPageContracts[item.key].inertiaPage,
}));

export default function AdminLayout({ children, currentPath = '/overview' }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentTitle = navItems.find(item => item.path === currentPath)?.label || 'الرئيسية';

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
        currentPath={currentPath}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header
          currentTitle={currentTitle}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}
