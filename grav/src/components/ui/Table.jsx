import EmptyState from './EmptyState';
import Skeleton from './Skeleton';

export default function Table({
  columns = [],
  data = [],
  renderRow,
  emptyState,
  loading = false,
  wrapperClassName = 'overflow-x-auto',
  tableClassName = 'w-full text-right text-sm',
  theadClassName = 'bg-brand-content text-brand-text-muted font-medium border-b border-brand-border',
  tbodyClassName = 'divide-y divide-brand-border',
}) {
  return (
    <div className={wrapperClassName}>
      <table className={tableClassName}>
        <thead className={theadClassName}>
          <tr>
            {columns?.map((column) => (
              <th key={column?.key || column?.label} className={column?.className || 'px-6 py-4'}>
                {column?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={tbodyClassName}>
          {loading ? (
            Array(5).fill(0).map((_, i) => (
              <tr key={i} className="animate-in fade-in duration-300">
                {columns?.map((c, idx) => (
                  <td key={idx} className="px-6 py-4">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : data?.length > 0 ? (
            data.map(renderRow)
          ) : (
            <tr>
              <td colSpan={columns?.length || 1}>
                <EmptyState {...(emptyState || { title: 'لا توجد بيانات' })} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
