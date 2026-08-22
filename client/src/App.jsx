import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Recommendations from './pages/Recommendations.jsx'
import Results from './pages/Results.jsx'
import NotFound from './pages/NotFound.jsx'
import { hasCompletedProfile, isAuthenticated } from './utils/auth.js'

function ProtectedRoute({ children, requiresCompletedProfile = false }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  if (requiresCompletedProfile && !hasCompletedProfile()) {
    return <Navigate to="/profile" replace />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiresCompletedProfile>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
} 