import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar, { navItems } from './Sidebar';
import Header from './Header';

export default function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentTitle = navItems.find(item => item.path === location.pathname)?.label || 'الرئيسية';

  return (
    <div className="flex h-screen overflow-hidden bg-brand-content font-cairo text-brand-text-primary" dir="rtl">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header currentTitle={currentTitle} onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
