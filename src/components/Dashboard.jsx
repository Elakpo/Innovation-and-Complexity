import React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../auth";

const Dashboard = () => {
  const history = useHistory(); // Import useHistory hook

  const handleLogout = () => {
    // Call logout function from auth.js
    logout();
    // Redirect to login page after logout
    history.push("/login");
  };

  return (
    <div>
      {/* <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button> */}
      <div className="h-screen bg-cover" style={{backgroundImage: `url('../../src/assets/images/heart-day.jpg')`}}>
      <div className="bg-gray-100 bg-opacity-75 min-h-screen">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-red mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:mx-4">
            {/* Sample Dashboard Cards */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Analytics</h2>
              <p className="text-gray-600">View your website analytics.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Orders</h2>
              <p className="text-gray-600">Manage your orders.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Products</h2>
              <p className="text-gray-600">Manage your products.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <p className="text-gray-600">Manage your account settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
