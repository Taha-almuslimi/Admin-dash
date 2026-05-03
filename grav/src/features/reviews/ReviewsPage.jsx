import ReviewsFilterBar from './components/ReviewsFilterBar';
import ReviewsTable from './components/ReviewsTable';
import ReviewDrawer from './components/ReviewDrawer';
import useDrawer from '../../hooks/useDrawer';
import { reviewsData } from '../../data/reviews';

export default function ReviewsPage() {
  const drawer = useDrawer();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <ReviewsFilterBar />
      <ReviewsTable reviews={reviewsData} onOpenDrawer={drawer.open} />
      <ReviewDrawer isOpen={drawer.isOpen} review={drawer.selectedItem} onClose={drawer.close} />
    </div>
  );
}
