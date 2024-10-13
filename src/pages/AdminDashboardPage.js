import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

const AdminDashboardPage = () => {
  return (
    <div className='m-5 flex flex-col gap-4'>
      <h1 className='text-4xl text-center font-semibold'>Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;