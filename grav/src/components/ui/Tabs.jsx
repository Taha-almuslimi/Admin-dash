export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="border-b border-brand-border bg-brand-content/30 flex overflow-x-auto scrollbar-hide">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors relative ${
            activeTab === tab.id 
              ? 'text-brand-primary' 
              : 'text-brand-text-muted hover:text-brand-text-primary hover:bg-brand-content'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full"></div>
          )}
        </button>
      ))}
    </div>
  );
}
