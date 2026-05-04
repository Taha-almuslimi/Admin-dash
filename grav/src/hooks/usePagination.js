import { useCallback, useMemo, useState } from 'react';

const EMPTY_ROWS = [];

export default function usePagination(data = [], pageSize = 10) {
  const rows = data || EMPTY_ROWS;
  const [page, setPageState] = useState(1);
  const totalItems = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [currentPage, pageSize, rows]);

  const setPage = useCallback((nextPage) => {
    setPageState((current) => {
      const resolvedPage = typeof nextPage === 'function' ? nextPage(current) : nextPage;
      return Math.min(Math.max(1, resolvedPage), totalPages);
    });
  }, [totalPages]);

  const resetPage = useCallback(() => setPageState(1), []);
  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return {
    page: currentPage,
    currentPage,
    totalPages,
    totalItems,
    from,
    to,
    setPage,
    resetPage,
    paginatedData,
  };
}
