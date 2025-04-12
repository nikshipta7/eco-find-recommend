
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };
  
  // Navigate to admin page
  const goToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          
          <p className="mb-6">
            Welcome to your dashboard! You are logged in as <span className="font-medium">{localStorage.getItem('userEmail')}</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h2 className="text-lg font-semibold mb-2">Product Management</h2>
              <p className="text-gray-600 mb-4">
                Add and manage sustainable products in the database.
              </p>
              <Button onClick={goToAdmin}>
                Go to Admin Panel
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h2 className="text-lg font-semibold mb-2">Browse Products</h2>
              <p className="text-gray-600 mb-4">
                View all sustainable products in our catalog.
              </p>
              <Button onClick={() => navigate('/sustainable-products')}>
                View Products
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
