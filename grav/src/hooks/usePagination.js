import { useCallback, useMemo, useState } from 'react';
import { router } from '../inertia/router';
import { isPaginatedSource } from '../utils/dataSource';

const EMPTY_ROWS = [];

export default function usePagination(sourceData = [], pageSize = 10, options = {}) {
  const { path, query = {} } = options;
  const isInertiaPaginated = isPaginatedSource(sourceData);

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
    const resolvedPage = typeof nextPage === 'function' ? nextPage(currentPage) : nextPage;
    const safePage = Math.min(Math.max(1, resolvedPage), totalPages);

    if (isInertiaPaginated) {
      router.get(path || window.location.pathname, {
        ...query,
        page: safePage,
      }, { preserveScroll: true, preserveState: true });
      return;
    }
    setClientPage((current) => {
      const nextClientPage = typeof nextPage === 'function' ? nextPage(current) : nextPage;
      return Math.min(Math.max(1, nextClientPage), totalPages);
    });
  }, [currentPage, totalPages, isInertiaPaginated, path, query]);

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
