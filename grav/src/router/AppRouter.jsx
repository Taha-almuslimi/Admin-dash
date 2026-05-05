import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { adminPageContracts } from '../contracts/adminContracts';
import PageProvider from '../inertia/PageProvider';
import { navigationEvent } from '../inertia/router';
import { localPageProps } from '../inertia/localPageProps';
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

const pageComponents = {
  overview: OverviewPage,
  users: UsersPage,
  equipment: EquipmentPage,
  rentals: RentalsPage,
  disputes: DisputesPage,
  finance: FinancePage,
  complaints: ComplaintsPage,
  analytics: AnalyticsPage,
  reviews: ReviewsPage,
  audit: AuditLogPage,
  settings: SettingsPage,
};

function routeKeyFromPath(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/overview';
  const match = Object.entries(adminPageContracts).find(([, contract]) => (
    contract.path === normalizedPath
  ));

  return match?.[0] || 'overview';
}

function readSnapshot() {
  if (window.location.pathname === '/') {
    window.history.replaceState(window.history.state || {}, '', '/overview');
  }

  const path = window.location.pathname;
  const searchParams = Object.fromEntries(new URLSearchParams(window.location.search));

  return {
    path,
    url: `${path}${window.location.search}`,
    routeState: window.history.state?.gravState || {},
    query: searchParams,
  };
}

export default function AppRouter() {
  const [snapshot, setSnapshot] = useState(readSnapshot);
  const routeKey = routeKeyFromPath(snapshot.path);
  const PageComponent = pageComponents[routeKey] || OverviewPage;

  useEffect(() => {
    const handleNavigation = () => setSnapshot(readSnapshot());

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener(navigationEvent, handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener(navigationEvent, handleNavigation);
    };
  }, []);

  const page = useMemo(() => {
    const contract = adminPageContracts[routeKey];
    const localProps = localPageProps[routeKey] || {};
    const props = {
      ...localProps,
      filters: {
        ...(localProps.filters || {}),
        ...snapshot.query,
      },
      routeState: snapshot.routeState,
      query: snapshot.query,
      currentPath: snapshot.path,
    };

    return {
      component: contract?.inertiaPage || routeKey,
      props,
      url: snapshot.url,
    };
  }, [routeKey, snapshot]);

  return (
    <PageProvider page={page}>
      <AdminLayout currentPath={snapshot.path}>
        <PageComponent {...page.props} />
      </AdminLayout>
    </PageProvider>
  );
}
