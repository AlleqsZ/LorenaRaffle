import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDraw from './pages/AdminDraw';
import Prizes from './pages/Prizes';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;

  return children;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin/draw"
              element={
                <PrivateRoute adminOnly>
                  <AdminDraw />
                </PrivateRoute>
              }
            />
            <Route
              path="/prizes"
              element={
                <PrivateRoute>
                  <Prizes />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
