import Link from '../../inertia/Link';

function formatLinkLabel(label = '') {
  const cleanLabel = label
    .replace('&laquo;', '')
    .replace('&raquo;', '')
    .trim();

  if (/previous/i.test(cleanLabel)) return 'السابق';
  if (/next/i.test(cleanLabel)) return 'التالي';
  return cleanLabel;
}

export default function Pagination({ currentPage, totalPages, onPageChange, links = [] }) {
  if (links.length > 0) {
    return (
      <div className="flex space-x-1 space-x-reverse">
        {links.map((link, index) => {
          const disabled = !link.url;
          const label = formatLinkLabel(link.label);

          return (
            <Link
              key={`${label}-${index}`}
              href={link.url || '#'}
              disabled={disabled}
              className={`px-3 py-1 border border-brand-border rounded transition-colors ${
                link.active
                  ? 'bg-brand-primary text-white'
                  : 'hover:bg-white'
              } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex space-x-1 space-x-reverse">
      <button
        className="px-3 py-1 border border-brand-border rounded hover:bg-white disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        السابق
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border border-brand-border rounded ${page === currentPage ? 'bg-brand-primary text-white' : 'hover:bg-white'}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-1 border border-brand-border rounded hover:bg-white disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        التالي
      </button>
    </div>
  );
}
