import { X } from 'lucide-react';

export default function Drawer({ isOpen, onClose, title, footer, children }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />
      )}
      <div className={`fixed top-0 bottom-0 right-0 w-full md:w-[480px] bg-brand-card shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-content/50">
          <h2 className="text-xl font-bold text-brand-text-primary">{title}</h2>
          <button onClick={onClose} className="p-2 text-brand-text-muted hover:text-brand-danger rounded-full hover:bg-brand-danger/10 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        {footer}
      </div>
    </>
  );
}
