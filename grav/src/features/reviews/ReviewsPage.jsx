import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import FilterBar from '../../components/ui/FilterBar';
import ReviewsTable from './components/ReviewsTable';
import ReviewDrawer from './components/ReviewDrawer';
import RentalDrawer from '../rentals/components/RentalDrawer';
import useDrawer from '../../hooks/useDrawer';
import { router } from '../../inertia/router';
import { isPaginatedSource, rowsFromSource, sourceWithRows } from '../../utils/dataSource';

export default function ReviewsPage({
  reviews: reviewsSource = [],
  rentals = [],
  filters = {},
  loading = false,
}) {
  const drawer = useDrawer();
  const rentalDrawer = useDrawer();
  const [reviews, setReviews] = useState(() => rowsFromSource(reviewsSource));
  const isServerPaginated = isPaginatedSource(reviewsSource);
  const reviewRows = isServerPaginated ? rowsFromSource(reviewsSource) : reviews;

  // Filter state
  const [search, setSearch] = useState(filters.search || '');
  const [typeFilter, setTypeFilter] = useState(filters.type || '');
  const [ratingFilter, setRatingFilter] = useState(filters.rating || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');

  const filteredReviews = useMemo(() => {
    if (isServerPaginated) return reviewRows;

    return reviewRows.filter((r) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || r?.rater?.toLowerCase?.().includes(q) || r?.target?.toLowerCase?.().includes(q);
      const matchesType = !typeFilter || r.typeKey === typeFilter;
      const matchesStatus = !statusFilter || r.statusKey === statusFilter;
      const matchesRating = !ratingFilter || r.rating.toString() === ratingFilter;
      return matchesSearch && matchesType && matchesStatus && matchesRating;
    });
  }, [search, typeFilter, statusFilter, ratingFilter, reviewRows, isServerPaginated]);

  const tableReviews = sourceWithRows(reviewsSource, filteredReviews);
  const hasSearchFilters = Boolean(search || typeFilter || ratingFilter || statusFilter);

  const updateQuery = (nextFilters) => {
    router.get('/reviews', {
      search,
      type: typeFilter,
      rating: ratingFilter,
      status: statusFilter,
      ...nextFilters,
    }, { replace: true, preserveState: true });
  };

  const handleDeleteReview = (reviewId) => {
    router.delete(`/reviews/${reviewId}`, {}, { preserveState: true });
    if (!isServerPaginated) {
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    }
    drawer.close();
    toast.success('تم إخفاء التقييم');
  };

  const handleKeepReview = () => {
    if (drawer.selectedItem) {
      router.patch(`/reviews/${drawer.selectedItem.id}`, { action: 'keep' }, { preserveState: true });
    }
    toast.success('تم إبقاء التقييم');
    drawer.close();
  };

  const handleReportReview = () => {
    if (drawer.selectedItem) {
      router.patch(`/reviews/${drawer.selectedItem.id}`, { action: 'report' }, { preserveState: true });
    }
    toast.success('تم تسجيل بلاغ على التقييم');
    drawer.close();
  };

  const handleOpenLinkedRental = (opId) => {
    const rental = rowsFromSource(rentals).find(r => r.id === opId);
    if (rental) {
      drawer.close();
      setTimeout(() => rentalDrawer.open(rental), 300);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <FilterBar
        searchPlaceholder="بحث في التقييمات..."
        searchValue={search}
        onSearchChange={(e) => {
          setSearch(e.target.value);
          updateQuery({ search: e.target.value });
        }}
        filters={[
          { key: 'type', placeholder: 'النوع: الكل', value: typeFilter, onChange: (e) => { setTypeFilter(e.target.value); updateQuery({ type: e.target.value }); }, options: [{ value: 'tenant', label: 'مستأجر' }, { value: 'owner', label: 'مؤجر' }] },
          { key: 'rating', placeholder: 'التقييم: الكل', value: ratingFilter, onChange: (e) => { setRatingFilter(e.target.value); updateQuery({ rating: e.target.value }); }, options: [{ value: '5', label: '⭐⭐⭐⭐⭐' }, { value: '4', label: '⭐⭐⭐⭐' }, { value: '3', label: '⭐⭐⭐' }, { value: '2', label: '⭐⭐' }, { value: '1', label: '⭐' }] },
          { key: 'status', placeholder: 'الحالة: الكل', value: statusFilter, onChange: (e) => { setStatusFilter(e.target.value); updateQuery({ status: e.target.value }); }, options: [{ value: 'active', label: 'نشط' }, { value: 'deleted', label: 'محذوف' }] },
        ]}
      />
      <ReviewsTable
        reviews={tableReviews}
        loading={loading}
        isSearchActive={hasSearchFilters}
        onOpenDrawer={drawer.open}
        onDeleteReview={handleDeleteReview}
        onReportReview={handleReportReview}
      />
      <ReviewDrawer 
        isOpen={drawer.isOpen} 
        review={drawer.selectedItem} 
        onClose={drawer.close} 
        onOpenLinkedRental={handleOpenLinkedRental}
        onDeleteReview={handleDeleteReview}
        onKeepReview={handleKeepReview}
        onReportReview={handleReportReview}
      />
      <RentalDrawer 
        isOpen={rentalDrawer.isOpen} 
        rental={rentalDrawer.selectedItem} 
        onClose={rentalDrawer.close} 
      />
    </div>
  );
}
