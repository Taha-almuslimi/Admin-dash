import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, footer, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-brand-card rounded-xl w-full max-w-md shadow-2xl border border-brand-border animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-brand-border flex justify-between items-center">
          <h3 className="text-lg font-bold text-brand-text-primary">{title}</h3>
          <button onClick={onClose} className="text-brand-text-muted hover:text-brand-danger">
            <X size={20} />
          </button>
        </div>
        {children}
        {footer}
      </div>
    </div>
  );
}
