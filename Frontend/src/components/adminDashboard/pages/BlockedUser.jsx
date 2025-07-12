import React, { useEffect, useState } from "react";

const BlockedUser = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);

  // Fetch blocked users from an API (mock data for now)
  useEffect(() => {
    const fetchBlockedUsers = async () => {
      const mockBlockedUsers = [
        {
          id: 1,
          blockedBy: "1",
          blockedTo: "2",
          name: "Sujan Bhattarai",
          email: "sujan@gmail.com",
          blockAt: "2023-10-01",
        },
        {
          id: 2,
          blockedBy: "3",
          blockedTo: "4",
          name: "Sampanna Sapkota",
          email: "sampanna@gmail.com",
          blockAt: "2023-10-02",
        },
        {
          id: 3,
          blockedBy: "5",
          blockedTo: "6",
          name: "Pujan Khanal",
          email: "pujan@gmail.com.com",
          blockAt: "2023-10-03",
        },
      ];
      setBlockedUsers(mockBlockedUsers);
    };

    fetchBlockedUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Blocked Users Dashboard
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">S.N</th>
              <th className="px-4 py-3 text-left">Blocked By</th>
              <th className="px-4 py-3 text-left">Blocked To</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Block At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blockedUsers.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="px-4 py-3 text-gray-700 text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-gray-700">{user.blockedBy}</td>
                <td className="px-4 py-3 text-gray-700">{user.blockedTo}</td>
                <td className="px-4 py-3 text-gray-700">{user.name}</td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3 text-gray-700">{user.blockAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlockedUser;
