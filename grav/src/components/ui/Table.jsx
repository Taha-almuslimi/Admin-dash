import EmptyState from './EmptyState';

export default function Table({ columns, data, renderRow, emptyState }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm">
        <thead className="bg-brand-content text-brand-text-muted font-medium border-b border-brand-border">
          <tr>
            {columns.map((column) => (
              <th key={column.key || column.label} className={column.className || 'px-6 py-4'}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border">
          {data.length > 0 ? data.map(renderRow) : (
            <tr>
              <td colSpan={columns.length}>
                <EmptyState {...emptyState} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
