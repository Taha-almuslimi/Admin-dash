import { useState } from 'react';
import ReviewsFilterBar from './components/ReviewsFilterBar';
import ReviewsTable from './components/ReviewsTable';
import ReviewDrawer from './components/ReviewDrawer';
import RentalDrawer from '../rentals/components/RentalDrawer';
import useDrawer from '../../hooks/useDrawer';
import { reviewsData } from '../../data/reviews';
import { rentalsData } from '../../data/rentals';

export default function ReviewsPage() {
  const drawer = useDrawer();
  const rentalDrawer = useDrawer();
  const [reviews, setReviews] = useState(reviewsData);

  const handleDeleteReview = (reviewId) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    drawer.close();
  };

  const handleOpenLinkedRental = (opId) => {
    const rental = rentalsData.find(r => r.id === opId);
    if (rental) {
      drawer.close();
      setTimeout(() => rentalDrawer.open(rental), 300);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <ReviewsFilterBar />
      <ReviewsTable reviews={reviews} onOpenDrawer={drawer.open} />
      <ReviewDrawer 
        isOpen={drawer.isOpen} 
        review={drawer.selectedItem} 
        onClose={drawer.close} 
        onOpenLinkedRental={handleOpenLinkedRental}
        onDeleteReview={handleDeleteReview}
      />
      <RentalDrawer 
        isOpen={rentalDrawer.isOpen} 
        rental={rentalDrawer.selectedItem} 
        onClose={rentalDrawer.close} 
      />
    </div>
  );
}
