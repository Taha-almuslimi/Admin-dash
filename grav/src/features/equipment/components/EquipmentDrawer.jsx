import { X, ChevronRight, ChevronLeft, EyeOff, Edit, Trash2 } from 'lucide-react';

export default function EquipmentDrawer({ isOpen, equipment, currentImageIndex, onClose, nextImage, prevImage }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />
      )}

      <div className={`fixed top-0 bottom-0 right-0 w-full md:w-[480px] bg-brand-card shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {equipment && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-content/50">
              <h2 className="text-xl font-bold text-brand-text-primary">تفاصيل المعدة</h2>
              <button onClick={onClose} className="p-2 text-brand-text-muted hover:text-brand-danger rounded-full hover:bg-brand-danger/10 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="relative h-64 bg-black group">
                <img src={equipment.images[currentImageIndex]} alt={equipment.name} className="w-full h-full object-contain" />
                {equipment.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80">
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
                      {equipment.images.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-md shadow-sm bg-brand-${equipment.statusColor}/90 text-white backdrop-blur-sm`}>
                    {equipment.status}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand-text-primary mb-2">{equipment.name}</h3>
                  <p className="text-brand-text-muted text-sm leading-relaxed">{equipment.desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-content p-4 rounded-xl border border-brand-border">
                    <p className="text-xs text-brand-text-muted mb-1">سعر الإيجار</p>
                    <p className="font-bold text-brand-primary">{equipment.price.toLocaleString()} <span className="text-sm font-normal text-brand-text-primary">ر.ي / يوم</span></p>
                  </div>
                  <div className="bg-brand-content p-4 rounded-xl border border-brand-border">
                    <p className="text-xs text-brand-text-muted mb-1">مبلغ التأمين</p>
                    <p className="font-bold text-brand-text-primary">{equipment.insurance.toLocaleString()} <span className="text-sm font-normal text-brand-text-muted">ر.ي</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-brand-border">
                    <span className="text-brand-text-muted text-sm">الفئة</span>
                    <span className="font-bold text-brand-text-primary">{equipment.category}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-brand-border">
                    <span className="text-brand-text-muted text-sm">المحافظة</span>
                    <span className="font-bold text-brand-text-primary">📍 {equipment.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-brand-border">
                    <span className="text-brand-text-muted text-sm">المؤجر</span>
                    <span className="font-bold text-brand-primary hover:underline cursor-pointer">{equipment.owner}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-brand-border">
                    <span className="text-brand-text-muted text-sm">مرات الإيجار السابقة</span>
                    <span className="font-bold text-brand-text-primary">{equipment.rentCount} مرة</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-brand-border bg-white flex space-x-3 space-x-reverse">
              <button className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-warning/10 text-brand-warning hover:bg-brand-warning hover:text-white transition-colors border border-brand-warning/20 flex items-center justify-center">
                <EyeOff size={18} className="ml-2" /> إخفاء المعدة
              </button>
              <button className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-colors border border-brand-primary/20 flex items-center justify-center">
                <Edit size={18} className="ml-2" /> تعديل
              </button>
              <button className="flex-1 py-2.5 rounded-lg font-bold text-sm bg-brand-danger/10 text-brand-danger hover:bg-brand-danger hover:text-white transition-colors border border-brand-danger/20 flex items-center justify-center">
                <Trash2 size={18} className="ml-2" /> حذف
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
