import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bell,
  User,
  Users,
  ShieldAlert,
  Ban,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

function AdminDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the total number  of users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTotalUsers(data.users.length); // Count the number of users
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:3000/reports");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log the response to see its structure
        setTotalReports(data.length); // Count the number of reports
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReports();
  }, []);

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-xl flex flex-col p-5">
        <div className="flex items-center space-x-3 mb-6">
          <LayoutDashboard size={28} />
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="space-y-4">
          <NavLink
            to="/admindashboard/users"
            className="flex items-center space-x-3 py-2 px-4 bg-blue-800 rounded-lg hover:bg-blue-600 transition"
          >
            <Users size={20} /> <span>Users</span>
          </NavLink>
          <NavLink
            to="/admindashboard/reports"
            className="flex items-center space-x-3 py-2 px-4 bg-blue-800 rounded-lg hover:bg-blue-600 transition"
          >
            <ShieldAlert size={20} /> <span>Reports</span>
          </NavLink>
          <NavLink
            to="/admindashboard/blocks"
            className="flex items-center space-x-3 py-2 px-4 bg-blue-800 rounded-lg hover:bg-blue-600 transition"
          >
            <Ban size={20} /> <span>Blocked Users</span>
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 w-full z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-6">
            <button className="relative">
              <Bell className="text-gray-600 w-6 h-6" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2"
              >
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-gray-800">Admin</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 flex justify-center items-center p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {/* Total Users Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>

            {/* Total Matches Card */}
            <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
              <h3 className="text-lg font-semibold">Total Matches</h3>
              <p className="text-3xl font-bold">000</p>
            </div>

            {/* Reported Profiles Card */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
              <h3 className="text-lg font-semibold">Reported Profiles</h3>
              <p className="text-3xl font-bold">{totalReports}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
