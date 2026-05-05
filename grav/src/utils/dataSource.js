export function isPaginatedSource(source) {
  return Boolean(
    source &&
    typeof source === 'object' &&
    !Array.isArray(source) &&
    'current_page' in source &&
    'data' in source,
  );
}

export function rowsFromSource(source) {
  if (Array.isArray(source)) return source;
  if (source?.data && Array.isArray(source.data)) return source.data;
  return [];
}

export function sourceWithRows(source, rows) {
  return isPaginatedSource(source) ? { ...source, data: rows } : rows;
}
