import { useState } from 'react';

export default function usePagination(itemsPerPage = 10) {
  const [page, setPage] = useState(1);

  const paginate = (data) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      paginatedData: data.slice(start, end),
      totalPages,
    };
  };

  return { page, setPage, paginate };
}
