import { useState } from 'react';
import { Download } from 'lucide-react';
import SearchInput from './SearchInput';
import Select from './Select';
import Button from './Button';

export default function FilterBar({
  searchPlaceholder = 'بحث...',
  searchValue = '',
  onSearchChange,
  filters = [],
  onExport,
  exportLabel = 'تصدير',
  extraActions,
}) {
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    if (onExport) onExport();
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="bg-brand-card p-4 rounded-xl shadow-sm border border-brand-border flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center flex-1">
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          className="w-full md:w-64"
        />

        {filters.map((filter) => (
          <Select
            key={filter.key}
            placeholder={filter.placeholder}
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
          />
        ))}

        {extraActions}
      </div>

      {onExport && (
        <Button
          unstyled
          className={`flex items-center space-x-2 space-x-reverse px-4 py-2 border rounded-lg text-sm font-bold shadow-sm transition-colors ${
            exported
              ? 'bg-brand-success text-white border-brand-success'
              : 'bg-brand-content border-brand-border hover:bg-gray-100'
          }`}
          onClick={handleExport}
        >
          <Download size={16} />
          <span>{exported ? 'تم التصدير ✓' : exportLabel}</span>
        </Button>
      )}
    </div>
  );
}
