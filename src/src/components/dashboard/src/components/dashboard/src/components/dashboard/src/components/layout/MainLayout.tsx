import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        {user && <Sidebar />}
        <main className="flex-1 p-4 md:p-6 container mx-auto max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
