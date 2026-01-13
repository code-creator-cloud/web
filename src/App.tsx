import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, type JSX } from 'react';
import { AuthContext } from './lib/contexts/AuthContext';
import { AdminAuthProvider, AdminAuthContext } from './lib/contexts/AdminAuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Platforms from './pages/Platforms';
import Research from './pages/Research';
import Products from './pages/Products';
import Education from './pages/Education';
import Support from './pages/Support';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUser';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminLogin from './pages/AdminLogin';
import AdminSettings from './pages/admin/AdminSettings';
import { Toaster } from 'sonner';
import './App.css';
import Loader from './components/common/Loader'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  // COMMENTED OUT: Authentication checks disabled for development
  // const authContext = useContext(AuthContext);

  // if (!authContext) {
  //   console.error('ProtectedRoute: AuthContext not available');
  //   return <Navigate to="/login" replace />;
  // }

  // const { user, loading } = authContext;

  // if (loading) {
  //   console.log('ProtectedRoute: Loading, rendering loading state');
  //   return <Loader />;
  // }

  // if (!user) {
  //   console.log('ProtectedRoute: No user, redirecting to /login');
  //   return <Navigate to="/login" replace />;
  // }

  // console.log('ProtectedRoute: User authenticated, rendering children:', user.email);
  return children;
}

function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  // COMMENTED OUT: Authentication checks disabled for development
  // const adminAuthContext = useContext(AdminAuthContext);

  // if (!adminAuthContext) {
  //   console.error('ProtectedAdminRoute: AdminAuthContext not available');
  //   return <Navigate to="/admin/login" replace />;
  // }

  // const { admin, loading } = adminAuthContext;

  // if (loading) {
  //   console.log('ProtectedAdminRoute: Loading, rendering loading state');
  //   return <Loader />;
  // }

  // if (!admin) {
  //   console.log('ProtectedAdminRoute: No admin, redirecting to /admin/login');
  //   return <Navigate to="/admin/login" replace />;
  // }

  // console.log('ProtectedAdminRoute: Admin authenticated, rendering children:', admin.email);
  return children;
}

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/research" element={<Research />} />
        <Route path="/products" element={<Products />} />
        <Route path="/education" element={<Education />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={
          <AdminAuthProvider>
            <AdminLogin />
          </AdminAuthProvider>
        } />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <ProtectedAdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedAdminRoute>
            </AdminAuthProvider>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminAuthProvider>
              <ProtectedAdminRoute>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </ProtectedAdminRoute>
            </AdminAuthProvider>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <AdminAuthProvider>
              <ProtectedAdminRoute>
                <AdminLayout>
                  <AdminTransactions />
                </AdminLayout>
              </ProtectedAdminRoute>
            </AdminAuthProvider>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminAuthProvider>
              <ProtectedAdminRoute>
                <AdminLayout>
                  <AdminAnalytics />
                </AdminLayout>
              </ProtectedAdminRoute>
            </AdminAuthProvider>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminAuthProvider>
              <ProtectedAdminRoute>
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </ProtectedAdminRoute>
            </AdminAuthProvider>
          }
        />
        {/* End Admin Routes */}

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Transactions />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Accounts />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;