import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProfileListPage from './pages/ProfileListPage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md shadow-violet-300">
          <div className="max-w-7xl mx-auto px-4">
              <div className='flex justify-between h-14'>
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold">Profile Manager</span>
                </Link>
                <div className="ml-10 flex flex-row justify-end items-center space-x-4">
                  <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    Profiles
                  </Link>
                  <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    Admin
                  </Link>
                </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ProfileListPage />} />
            <Route path="/profile/:id" element={<ProfileDetailPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;