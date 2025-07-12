
import axios from 'axios';
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

const Personal = ({profileData}) => {
  // State to hold form data
  const [personalData, setPersonalData] = useState({
    fullname: profileData?.fullname || "",
  });

  // State to track which field is being edited
  const [editField, setEditField] = useState(null);

  // Handle input changes
  const handleInputChange = (e, field) => {
    setPersonalData({
      ...personalData,
      [field]: e.target.value,
    });
  };

  // Handle Save to update data in the database
  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/users/${profileData?.id}`,
        {
          id: profileData?.id, // Ensure ID is passed
          ...personalData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send JWT token
            "Content-Type": "application/json",
          },
        }
      );

      // Exit edit mode after saving
      setEditField(null);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };
  return (
    <div>
      <table className="w-[34em]">
        <tbody>
          <tr className="border-2 border-b">
            <td className="border-[2px] border-slate-500">
              <div className="flex items-center justify-between px-8 py-2">
                <div>
                  <h4 className="font-medium">Name</h4>
                  {editField === "fullname" ? (
                    <input
                      value={personalData.fullname}
                      onChange={(e) => handleInputChange(e, "fullname")}
                      className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-[15px] text-slate-500 -mt-1">
                      {profileData?.fullname}
                    </p>
                  )}
                </div>
                <FaEdit
                  color="#F24822"
                  size={20}
                  onClick={() => setEditField("fullname")}
                  className="cursor-pointer"
                />
              </div>
            </td>
          </tr>
          <tr className="border-2 border-b">
            <td className="border-[2px] border-slate-500">
              <div className="flex items-center justify-between px-8 py-2">
                <div>
                  <h4 className="font-medium">Email</h4>
                    <p className="text-[15px] text-slate-500 -mt-1">
                      {profileData?.email}
                    </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 mt-4 text-white bg-[#F24822] rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Personal
