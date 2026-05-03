import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import OverviewPage from '../features/overview/OverviewPage';
import UsersPage from '../features/users/UsersPage';
import EquipmentPage from '../features/equipment/EquipmentPage';
import RentalsPage from '../features/rentals/RentalsPage';
import DisputesPage from '../features/disputes/DisputesPage';
import FinancePage from '../features/finance/FinancePage';
import ComplaintsPage from '../features/complaints/ComplaintsPage';
import AnalyticsPage from '../features/analytics/AnalyticsPage';
import ReviewsPage from '../features/reviews/ReviewsPage';
import AuditLogPage from '../features/auditlog/AuditLogPage';
import SettingsPage from '../features/settings/SettingsPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="equipment" element={<EquipmentPage />} />
          <Route path="rentals" element={<RentalsPage />} />
          <Route path="disputes" element={<DisputesPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="audit" element={<AuditLogPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
