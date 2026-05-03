export default function Select({ options, value, onChange, placeholder, className = '' }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-brand-border bg-brand-content rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}
