import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Users, Truck, ShoppingCart, AlertTriangle, 
  DollarSign, Flag, BarChart2, Star, Clock, Settings, LogOut, Search, Bell, Menu, X, ChevronDown 
} from 'lucide-react';

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
    <div className="flex h-screen overflow-hidden bg-brand-content font-cairo text-brand-text-primary dir-rtl">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-50
        w-64 bg-brand-sidebar text-white flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white tracking-wide">Admin Panel</h1>
            <span className="text-xs text-brand-success mt-1 px-2 py-0.5 bg-brand-success/10 rounded w-fit">Super Admin</span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="px-3">
                  <NavLink
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors relative ${
                        isActive 
                          ? 'bg-brand-primary text-white' 
                          : 'text-gray-300 hover:bg-brand-sidebar-hover hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white rounded-r-full" />}
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center space-x-3 space-x-reverse px-4 py-3 w-full text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-brand-border flex items-center justify-between px-4 lg:px-6 z-10 w-full">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button 
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl lg:text-2xl font-bold text-brand-text-primary hidden sm:block">{currentTitle}</h2>
          </div>
          
          <div className="flex items-center space-x-4 lg:space-x-6 space-x-reverse">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="بحث..." 
                className="pl-4 pr-10 py-2 rounded-lg border border-brand-border focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary w-48 lg:w-64 bg-brand-content"
              />
              <Search className="absolute right-3 top-2.5 text-brand-text-muted" size={20} />
            </div>
            
            <button className="relative p-2 text-brand-text-primary hover:bg-brand-content rounded-full transition-colors">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-danger text-white text-[10px] flex items-center justify-center font-bold rounded-full border-2 border-white">3</span>
            </button>
            
            <div className="flex items-center space-x-3 space-x-reverse cursor-pointer border-r border-brand-border pr-4 lg:pr-6">
              <img 
                src="https://ui-avatars.com/api/?name=Admin+User&background=2D5A27&color=fff" 
                alt="Admin" 
                className="w-10 h-10 rounded-full border-2 border-brand-primary/20"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-brand-text-primary flex items-center gap-1">أحمد علي <ChevronDown size={14} className="text-brand-text-muted"/></p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
