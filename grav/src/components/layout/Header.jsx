import { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Menu, Search, LogOut, User, Settings } from 'lucide-react';
import { router } from '../../inertia/router';

export default function Header({ currentTitle, onOpenSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-brand-border flex items-center justify-between px-4 lg:px-6 z-10 w-full relative">
      <div className="flex items-center space-x-4 space-x-reverse">
        <button
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          onClick={onOpenSidebar}
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

        <button 
          className="relative p-2 text-brand-text-primary hover:bg-brand-content rounded-full transition-colors"
          onClick={() => router.visit('/complaints', { state: { activeTab: 'notifications' } })}
        >
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-brand-danger text-white text-[10px] flex items-center justify-center font-bold rounded-full border-2 border-white">3</span>
        </button>

        <div className="relative border-r border-brand-border pr-4 lg:pr-6" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-3 space-x-reverse cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=2D5A27&color=fff"
              alt="Admin"
              className="w-10 h-10 rounded-full border-2 border-brand-primary/20"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-brand-text-primary flex items-center gap-1">أحمد علي <ChevronDown size={14} className="text-brand-text-muted" /></p>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-brand-border rounded-lg shadow-lg z-50">
              <ul className="py-2">
                <li>
                  <button onClick={() => { setIsDropdownOpen(false); }} className="w-full text-right px-4 py-2 hover:bg-brand-content flex items-center gap-2 text-brand-text-primary">
                    <User size={16} />
                    <span>الملف الشخصي</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => { router.visit('/settings'); setIsDropdownOpen(false); }} className="w-full text-right px-4 py-2 hover:bg-brand-content flex items-center gap-2 text-brand-text-primary">
                    <Settings size={16} />
                    <span>الإعدادات</span>
                  </button>
                </li>
                <li>
                  <hr className="my-1 border-brand-border" />
                </li>
                <li>
                  <button onClick={() => { setIsDropdownOpen(false); }} className="w-full text-right px-4 py-2 hover:bg-brand-content flex items-center gap-2 text-brand-danger">
                    <LogOut size={16} />
                    <span>تسجيل الخروج</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
