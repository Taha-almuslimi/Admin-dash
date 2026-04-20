import React, { useState } from 'react';
import { Search, Grid, List as ListIcon, MapPin, Tag, User, Eye, Edit, Trash2, X, ChevronRight, ChevronLeft, EyeOff } from 'lucide-react';

const equipmentData = [
  { id: 1, name: 'حفار صغير JCB', location: 'صنعاء', category: 'بناء', owner: 'شركة البناء الحديثة', price: 15000, status: 'نشط', statusColor: 'success', images: ['https://images.unsplash.com/photo-1579800454378-d466e88102fc?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=600'], desc: 'حفار بحالة ممتازة للايجار اليومي', insurance: 50000, rentCount: 24 },
  { id: 2, name: 'رافعة شوكية 3 طن', location: 'عدن', category: 'معدات ثقيلة', owner: 'مؤسسة النقل والتجارة', price: 20000, status: 'نشط', statusColor: 'success', images: ['https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=600'], desc: 'رافعة شوكية 3 طن مع سائق', insurance: 100000, rentCount: 15 },
  { id: 3, name: 'مولد كهربائي 50KVA', location: 'تعز', category: 'طاقة', owner: 'أحمد محمد', price: 10000, status: 'مخفي', statusColor: 'pending', images: ['https://images.unsplash.com/photo-1542485122-870020d880be?auto=format&fit=crop&q=80&w=600'], desc: 'مولد كهربائي ديزل', insurance: 30000, rentCount: 8 },
  { id: 4, name: 'خلاطة إسمنت مركزية', location: 'حضرموت', category: 'بناء', owner: 'شركة الإعمار', price: 35000, status: 'نشط', statusColor: 'success', images: ['https://images.unsplash.com/photo-1582650050186-b41334c98f98?auto=format&fit=crop&q=80&w=600'], desc: 'خلاطة حديثة سعة كبيرة', insurance: 150000, rentCount: 42 },
];

export default function Equipment() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedEq, setSelectedEq] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openDrawer = (eq) => {
    setSelectedEq(eq);
    setCurrentImageIndex(0);
    setShowDrawer(true);
  };

  const nextImage = () => {
    if (selectedEq) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEq.images.length);
    }
  };

  const prevImage = () => {
    if (selectedEq) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEq.images.length) % selectedEq.images.length);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Filter Bar */}
      <div className="bg-brand-card p-4 rounded-xl shadow-sm border border-brand-border flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="بحث عن معدة..." 
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-brand-border bg-brand-content focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm"
            />
            <Search className="absolute right-3 top-2.5 text-brand-text-muted" size={18} />
          </div>
          
          <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
            <option value="">الفئة: الكل</option>
            <option value="build">بناء</option>
            <option value="heavy">معدات ثقيلة</option>
            <option value="power">طاقة</option>
          </select>
          <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
            <option value="">الحالة: الكل</option>
            <option value="active">نشط</option>
            <option value="hidden">مخفي</option>
          </select>
          <select className="border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary">
            <option value="">المحافظة: الكل</option>
            <option value="sanaa">صنعاء</option>
            <option value="aden">عدن</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse bg-brand-content rounded-lg p-1 border border-brand-border">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-primary' : 'text-brand-text-muted hover:text-brand-text-primary'}`}
          >
            <Grid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-primary' : 'text-brand-text-muted hover:text-brand-text-primary'}`}
          >
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      {/* Equipment View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {equipmentData.map(item => (
            <div key={item.id} className="bg-brand-card rounded-xl border border-brand-border shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative h-48 cursor-pointer overflow-hidden" onClick={() => openDrawer(item)}>
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-2 right-2 bg-brand-card/90 px-2.5 py-1 rounded-md text-xs font-bold shadow-sm backdrop-blur-sm">
                  {item.price.toLocaleString()} ر.ي / اليوم
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md shadow-sm bg-brand-${item.statusColor}/90 text-white backdrop-blur-sm`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-lg text-brand-text-primary line-clamp-1 cursor-pointer hover:text-brand-primary transition-colors" onClick={() => openDrawer(item)}>
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-brand-text-muted">
                    <MapPin size={16} className="ml-1" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center text-brand-text-muted">
                    <Tag size={16} className="ml-1" />
                    <span>{item.category}</span>
                  </div>
                </div>
                
                <div className="text-sm border-t border-brand-border pt-3 flex items-center">
                  <User size={16} className="text-brand-text-muted ml-2" />
                  <span className="font-bold text-brand-text-primary">{item.owner}</span>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <div className="flex space-x-2 space-x-reverse">
                    <button onClick={() => openDrawer(item)} className="p-2 text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors" title="عرض">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors" title="تعديل">
                      <Edit size={18} />
                    </button>
                  </div>
                  <button className="p-2 text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors" title="حذف">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
          <table className="w-full text-right text-sm">
            <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-4">المعدة</th>
                <th className="px-6 py-4">الموقع والتصنيف</th>
                <th className="px-6 py-4">المؤجر</th>
                <th className="px-6 py-4 text-center">السعر (يومياً)</th>
                <th className="px-6 py-4 text-center">الحالة</th>
                <th className="px-6 py-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {equipmentData.map(item => (
                <tr key={item.id} className="hover:bg-brand-content/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={() => openDrawer(item)}>
                      <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-brand-border" />
                      <span className="font-bold text-brand-text-primary">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-brand-text-primary text-xs flex items-center">📍 {item.location}</span>
                      <span className="text-brand-text-muted text-xs flex items-center">🏷️ {item.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-brand-text-primary">{item.owner}</td>
                  <td className="px-6 py-4 text-center font-bold text-brand-primary">{item.price.toLocaleString()} ر.ي</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md bg-brand-${item.statusColor}/10 text-brand-${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <button onClick={() => openDrawer(item)} className="p-1.5 text-brand-info hover:bg-brand-info/10 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-1.5 text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer Overlay */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => setShowDrawer(false)} />
      )}

      {/* Equipment Details Drawer */}
      <div className={`fixed top-0 bottom-0 right-0 w-full md:w-[480px] bg-brand-card shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${showDrawer ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedEq && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-content/50">
              <h2 className="text-xl font-bold text-brand-text-primary">تفاصيل المعدة</h2>
              <button onClick={() => setShowDrawer(false)} className="p-2 text-brand-text-muted hover:text-brand-danger rounded-full hover:bg-brand-danger/10 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Gallery Carousel */}
              <div className="relative h-64 bg-black group">
                <img src={selectedEq.images[currentImageIndex]} alt={selectedEq.name} className="w-full h-full object-contain" />
                {selectedEq.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80">
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
                      {selectedEq.images.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-md shadow-sm bg-brand-${selectedEq.statusColor}/90 text-white backdrop-blur-sm`}>
                    {selectedEq.status}
                  </span>
                </div>
              </div>

              {/* Data Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand-text-primary mb-2">{selectedEq.name}</h3>
                  <p className="text-brand-text-muted text-sm leading-relaxed">{selectedEq.desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-content p-4 rounded-xl border border-brand-border">
                    <p className="text-xs text-brand-text-muted mb-1">سعر الإيجار</p>
                    <p className="font-bold text-brand-primary">{selectedEq.price.toLocaleString()} <span className="text-sm font-normal text-brand-text-primary">ر.ي / يوم</span></p>
                  </div>
                  <div className="bg-brand-content p-4 rounded-xl border border-brand-border">
                    <p className="text-xs text-brand-text-muted mb-1">مبلغ التأمين</p>
                    <p className="font-bold text-brand-text-primary">{selectedEq.insurance.toLocaleString()} <span className="text-sm font-normal text-brand-text-muted">ر.ي</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-brand-border">
                    <span className="text-brand-text-muted text-sm">الفئة</span>
                    <span className="font-bold text-brand-text-primary">{selectedEq.category}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-brand-border">
                    <span className="text-brand-text-muted text-sm">المحافظة</span>
                    <span className="font-bold text-brand-text-primary">📍 {selectedEq.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-brand-border">
                    <span className="text-brand-text-muted text-sm">المؤجر</span>
                    <span className="font-bold text-brand-primary hover:underline cursor-pointer">{selectedEq.owner}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-brand-border">
                    <span className="text-brand-text-muted text-sm">مرات الإيجار السابقة</span>
                    <span className="font-bold text-brand-text-primary">{selectedEq.rentCount} مرة</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
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

    </div>
  );
}
