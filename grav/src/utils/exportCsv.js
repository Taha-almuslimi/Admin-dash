const csvCell = (value) => {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
};

export function exportCsv(filename, rows, columns) {
  const header = columns.map((column) => csvCell(column.label)).join(',');
  const body = rows.map((row) => (
    columns.map((column) => csvCell(
      typeof column.value === 'function' ? column.value(row) : row[column.value]
    )).join(',')
  ));
  const csv = [header, ...body].join('\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
