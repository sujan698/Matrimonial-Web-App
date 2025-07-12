import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportedUser = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blocking, setBlocking] = useState(false);

  // Fetch reports from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:3000/reports");
        setReports(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Handle block action
  const handleBlock = async (reportId, reportedUserId) => {
    setBlocking(true);
    try {
      await axios.post("http://localhost:3000/blocks", {
        blockedId: reportedUserId,
      });

      // Remove the report from the list after blocking
      const updatedReports = reports.filter((report) => report.id !== reportId);
      setReports(updatedReports);
      alert(`User blocked successfully!`);
    } catch (err) {
      console.error("Failed to block user:", err);
      alert("Failed to block user. Please try again.");
    } finally {
      setBlocking(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Reported Users Dashboard
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">S.N</th>
              <th className="px-4 py-3 text-left">Reported By</th>
              <th className="px-4 py-3 text-left">Reported To</th>
              <th className="px-4 py-3 text-left">Report Content</th>
              <th className="px-4 py-3 text-left">Report Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr
                key={report.id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="px-4 py-3 text-gray-700 text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {report.user?.username || `User ${report.userId}`}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {report.reportedUser?.username || `User ${report.reportedUserId}`}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {report.reportContent}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {new Date(report.reportDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-gray-700 text-center">
                  <button
                    onClick={() => handleBlock(report.id, report.reportedUserId)}
                    disabled={blocking}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200 disabled:bg-blue-300"
                  >
                    {blocking ? "Blocking..." : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedUser;