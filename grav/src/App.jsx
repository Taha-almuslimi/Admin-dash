import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Overview from './pages/Overview';
import Users from './pages/Users';
import Equipment from './pages/Equipment';
import Rentals from './pages/Rentals';
import Disputes from './pages/Disputes';
import Finance from './pages/Finance';
import Complaints from './pages/Complaints';
import Analytics from './pages/Analytics';
import Reviews from './pages/Reviews';
import AuditLog from './pages/AuditLog';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="users" element={<Users />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="finance" element={<Finance />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="audit" element={<AuditLog />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
