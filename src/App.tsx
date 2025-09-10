import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Committees from './pages/Committees';
import Registration from './pages/Registration';
import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Dashboard Pages
import Dashboard from './pages/Dashboard/Dashboard';
import MyRegistration from './pages/Dashboard/MyRegistration';
import Delegates from './pages/Dashboard/Delegates';
import Documents from './pages/Dashboard/Documents';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/registration"
              element={
                <ProtectedRoute>
                  <MyRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/delegates"
              element={
                <ProtectedRoute>
                  <Delegates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/documents"
              element={
                <ProtectedRoute>
                  <Documents />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;