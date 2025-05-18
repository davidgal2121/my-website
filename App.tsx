import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import FinanceIndex from './pages/Finance/FinanceIndex';
import IncomeManagement from './pages/Finance/IncomeManagement';
import JobSearchPage from './pages/Jobs/JobSearchPage';
import GuidesPage from './pages/Guides/GuidesPage';
import GuideContent from './pages/Guides/GuideContent';

// Create Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">טוען...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/register" element={<div>Register Page</div>} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Finance Routes */}
      <Route
        path="/finance"
        element={
          <ProtectedRoute>
            <Layout>
              <FinanceIndex />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route index element={<div>Finance Overview</div>} />
        <Route path="income" element={<IncomeManagement />} />
        <Route path="expenses" element={<div>Expenses Management</div>} />
        <Route path="goals" element={<div>Financial Goals</div>} />
        <Route path="reports" element={<div>Financial Reports</div>} />
      </Route>

      {/* Jobs Routes */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Layout>
              <JobSearchPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/saved"
        element={
          <ProtectedRoute>
            <Layout>
              <div>Saved Jobs</div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/applications"
        element={
          <ProtectedRoute>
            <Layout>
              <div>Job Applications</div>
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Guides */}
      <Route
        path="/guides"
        element={
          <ProtectedRoute>
            <Layout>
              <GuidesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/guides/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <GuideContent />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <div>User Profile</div>
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <div>Settings</div>
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;