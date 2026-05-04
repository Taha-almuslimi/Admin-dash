import { useState, useMemo } from 'react';
import { Grid, List as ListIcon } from 'lucide-react';
import FilterBar from '../../components/ui/FilterBar';
import EquipmentGrid from './components/EquipmentGrid';
import EquipmentList from './components/EquipmentList';
import EquipmentDrawer from './components/EquipmentDrawer';
import useDrawer from '../../hooks/useDrawer';
import { equipmentData } from '../../data/equipment';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { EyeOff } from 'lucide-react';

export default function EquipmentPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [equipment, setEquipment] = useState(equipmentData);
  const [itemToHide, setItemToHide] = useState(null);
  const drawer = useDrawer();

  // Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredEquipment = useMemo(() => {
    return equipment.filter((eq) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || eq.name.includes(q) || eq.owner.includes(q);
      const matchesStatus = !statusFilter || eq.statusKey === statusFilter;
      const matchesCategory = !categoryFilter || eq.categoryKey === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, statusFilter, categoryFilter, equipment]);

  const openDrawer = (eq) => {
    setCurrentImageIndex(0);
    drawer.open(eq);
  };

  const nextImage = () => {
    if (drawer.selectedItem) {
      setCurrentImageIndex((prev) => (prev + 1) % drawer.selectedItem.images.length);
    }
  };

  const prevImage = () => {
    if (drawer.selectedItem) {
      setCurrentImageIndex((prev) => (prev - 1 + drawer.selectedItem.images.length) % drawer.selectedItem.images.length);
    }
  };

  const handleHideEquipment = () => {
    if (itemToHide) {
      setEquipment(prev => prev.filter(e => e.id !== itemToHide.id));
      setItemToHide(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative min-w-0">
      <FilterBar
        searchPlaceholder="بحث عن معدة..."
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        filters={[
          { key: 'category', placeholder: 'الفئة: الكل', value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), options: [{ value: 'build', label: 'بناء' }, { value: 'heavy', label: 'معدات ثقيلة' }, { value: 'power', label: 'طاقة' }] },
          { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), options: [{ value: 'active', label: 'نشط' }, { value: 'hidden', label: 'مخفي' }] },
        ]}
        extraActions={
          <div className="flex items-center space-x-2 space-x-reverse bg-brand-content rounded-lg p-1 border border-brand-border">
            <Button 
              unstyled
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-primary' : 'text-brand-text-muted hover:text-brand-text-primary'}`}
            >
              <Grid size={18} />
            </Button>
            <Button 
              unstyled
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-primary' : 'text-brand-text-muted hover:text-brand-text-primary'}`}
            >
              <ListIcon size={18} />
            </Button>
          </div>
        }
      />
      {viewMode === 'grid' ? (
        <EquipmentGrid equipment={filteredEquipment} onOpenDrawer={openDrawer} onHideItem={setItemToHide} />
      ) : (
        <EquipmentList equipment={filteredEquipment} onOpenDrawer={openDrawer} onHideItem={setItemToHide} />
      )}
      <EquipmentDrawer
        isOpen={drawer.isOpen}
        equipment={drawer.selectedItem}
        currentImageIndex={currentImageIndex}
        onClose={drawer.close}
        nextImage={nextImage}
        prevImage={prevImage}
      />

      <Modal
        isOpen={!!itemToHide}
        onClose={() => setItemToHide(null)}
        title="تأكيد إخفاء المعدة"
        footer={
          <div className="p-6 border-t border-brand-border bg-brand-content flex justify-end gap-3 rounded-b-xl">
            <Button variant="outline" onClick={() => setItemToHide(null)}>إلغاء</Button>
            <Button className="bg-brand-danger hover:bg-brand-danger/90" onClick={handleHideEquipment}>تأكيد الإخفاء</Button>
          </div>
        }
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-brand-warning">
            <div className="w-12 h-12 bg-brand-warning/10 rounded-full flex items-center justify-center">
              <EyeOff size={24} />
            </div>
            <div>
              <p className="font-bold text-brand-text-primary">إخفاء هذه المعدة؟</p>
              <p className="text-sm text-brand-text-muted">سيتم إخفاء المعدة من القوائم العامة (يمكن إعادة إظهارها لاحقاً)</p>
            </div>
          </div>
          {itemToHide && (
            <div className="bg-brand-content p-4 rounded-lg border border-brand-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-text-muted">المعدة:</span>
                <span className="font-bold">{itemToHide.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-text-muted">المؤجر:</span>
                <span className="font-bold">{itemToHide.owner}</span>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
