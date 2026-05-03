import { Search, Grid, List as ListIcon } from 'lucide-react';

export default function EquipmentFilterBar({ viewMode, setViewMode }) {
  return (
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
  );
}
