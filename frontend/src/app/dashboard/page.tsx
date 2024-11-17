import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <p className="text-gray-700">Manage your profile information.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <p className="text-gray-700">Adjust your account settings.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <p className="text-gray-700">View your recent notifications.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
