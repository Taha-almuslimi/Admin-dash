import { useState } from 'react';

export default function usePagination(pageSize = 10, totalItems = 0) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginate = (data) => {
    const safePage = Math.min(page, Math.max(1, Math.ceil(data.length / pageSize)));
    return data.slice((safePage - 1) * pageSize, safePage * pageSize);
  };

  return { page, totalPages, setPage, paginate };
}
