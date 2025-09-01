// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout'; // Import AdminLayout
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import Settings from './pages/Settings'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUser';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        } />
        <Route path="/admin/users" element={
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        } />
        <Route path="/admin/transactions" element={
          <AdminLayout>
            <AdminTransactions />
          </AdminLayout>
        } />
        <Route path="/admin/analytics" element={
          <AdminLayout>
            <AdminAnalytics />
          </AdminLayout>
        } />
        <Route path="/admin/settings" element={
          <AdminLayout>
            <AdminSettings />
          </AdminLayout>
        } />
        {/* End Admin Routes */}
        <Route path="/transactions" element={
          <DashboardLayout>
            <Transactions />
          </DashboardLayout>
        } />
        <Route path="/accounts" element={
          <DashboardLayout>
            <Accounts />
          </DashboardLayout>
        } />
        <Route path="/settings" element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        } />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;