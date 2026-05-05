import { useCallback, useMemo, useState } from 'react';

const EMPTY_ROWS = [];

export default function usePagination(sourceData = [], pageSize = 10) {
  // If sourceData is an Inertia pagination object (has data, current_page, total)
  const isInertiaPaginated = sourceData && typeof sourceData === 'object' && !Array.isArray(sourceData) && 'current_page' in sourceData;

  const dataArray = isInertiaPaginated ? (sourceData.data || EMPTY_ROWS) : (sourceData || EMPTY_ROWS);
  const [clientPage, setClientPage] = useState(1);
  
  const totalItems = isInertiaPaginated ? (sourceData.total || 0) : dataArray.length;
  const totalPages = isInertiaPaginated 
    ? (sourceData.last_page || 1) 
    : Math.max(1, Math.ceil(totalItems / pageSize));
    
  const currentPage = isInertiaPaginated 
    ? (sourceData.current_page || 1) 
    : Math.min(clientPage, totalPages);

  const paginatedData = useMemo(() => {
    if (isInertiaPaginated) return dataArray; // Laravel already sliced it
    const start = (currentPage - 1) * pageSize;
    return dataArray.slice(start, start + pageSize);
  }, [currentPage, pageSize, dataArray, isInertiaPaginated]);

  const setPage = useCallback((nextPage) => {
    if (isInertiaPaginated) {
      // With Inertia, changing page usually means doing an Inertia.get or router.get
      // For now, we just mock the function, but it will be handled by Pagination component's link clicks
      console.warn('Inertia pagination changes should be handled via router.get()');
      return;
    }
    setClientPage((current) => {
      const resolvedPage = typeof nextPage === 'function' ? nextPage(current) : nextPage;
      return Math.min(Math.max(1, resolvedPage), totalPages);
    });
  }, [totalPages, isInertiaPaginated]);

  const resetPage = useCallback(() => {
    if (!isInertiaPaginated) setClientPage(1);
  }, [isInertiaPaginated]);

  const from = isInertiaPaginated 
    ? (sourceData.from || 0) 
    : (totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1);
    
  const to = isInertiaPaginated 
    ? (sourceData.to || 0) 
    : Math.min(currentPage * pageSize, totalItems);

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
    links: isInertiaPaginated ? sourceData.links : [],
  };
}
