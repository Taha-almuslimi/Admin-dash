import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Home, Users, Truck, ShoppingCart, AlertTriangle,
  DollarSign, Flag, BarChart2, Star, Clock, Settings
} from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';

const navItems = [
  { path: '/overview', label: 'الرئيسية', icon: Home },
  { path: '/users', label: 'المستخدمون', icon: Users },
  { path: '/equipment', label: 'المعدات', icon: Truck },
  { path: '/rentals', label: 'عمليات التأجير', icon: ShoppingCart },
  { path: '/disputes', label: 'النزاعات', icon: AlertTriangle },
  { path: '/finance', label: 'الإشراف المالي', icon: DollarSign },
  { path: '/complaints', label: 'البلاغات', icon: Flag },
  { path: '/analytics', label: 'التقارير', icon: BarChart2 },
  { path: '/reviews', label: 'التقييمات', icon: Star },
  { path: '/audit', label: 'سجل العمليات', icon: Clock },
  { path: '/settings', label: 'الإعدادات', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentTitle = navItems.find(item => item.path === location.pathname)?.label || 'الرئيسية';

  return (
    <div className="flex h-screen overflow-hidden bg-brand-content font-cairo text-brand-text-primary" dir="rtl">
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
